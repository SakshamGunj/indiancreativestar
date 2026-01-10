import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceaccount.json')));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://daamieventartistmanager.firebasestorage.app'
});

const bucket = admin.storage().bucket();
const certificatesDir = path.join(__dirname, 'public/all_certificates');
const csvFilePath = path.join(__dirname, 'public/Certificates daami event - Sheet1.csv');

const uploadFile = async (filePath) => {
  const fileName = path.basename(filePath);
  const destination = `ics_certificates/${fileName}`;
  await bucket.upload(filePath, {
    destination: destination,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  const file = bucket.file(destination);
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  });
  return url;
};

const main = async () => {
  try {
    const files = fs.readdirSync(certificatesDir).sort((a, b) => {
      return parseInt(a.split('.')[0]) - parseInt(b.split('.')[0]);
    });

    const urls = [];
    for (const file of files) {
      const filePath = path.join(certificatesDir, file);
      const url = await uploadFile(filePath);
      urls.push(url);
      console.log(`Uploaded ${file} to ${url}`);
    }

    const csvData = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        csvData.push(row);
      })
      .on('end', () => {
        const updatedCsvData = csvData.map((row, index) => {
          if (urls[index]) {
            row['Certificate URL'] = urls[index];
          }
          return row;
        });

        const csvWriter = createObjectCsvWriter({
          path: csvFilePath,
          header: Object.keys(updatedCsvData[0]).map(key => ({id: key, title: key}))
        });

        csvWriter.writeRecords(updatedCsvData)
          .then(() => console.log('The CSV file was written successfully'));
      });

  } catch (error) {
    console.error('Error uploading files or updating CSV:', error);
  }
};

main();