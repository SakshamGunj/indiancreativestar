import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';

const API_KEY = 'ce5a3cae4d194a7154133892cc9fc790';
const CSV_FILE = 'authorverse - Form responses 1.csv';
const IMAGE_FOLDER = '(Bulk 1) Beige and Brown Vintage Certificate of Completion';
const OUTPUT_CSV_FILE = 'authorverse - Form responses 1.csv';

const uploadImage = async (filePath, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const form = new FormData();
      form.append('image', fs.createReadStream(filePath));

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        return data.data.display_url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error(`Error uploading image (attempt ${i + 1}/${retries}):`, error);
      if (i === retries - 1) {
        return null;
      }
      await new Promise(res => setTimeout(res, 1000 * (i + 1)));
    }
  }
};

const processCsv = async () => {
  const records = [];
  const parser = fs.createReadStream(CSV_FILE).pipe(parse({ columns: true, bom: true }));

  for await (const record of parser) {
    records.push(record);
  }

  const updatedRecords = [];
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const imageName = `${i + 1}.jpg`;
    const imagePath = path.join(IMAGE_FOLDER, imageName);

    if (fs.existsSync(imagePath)) {
      console.log(`Uploading ${imageName} for ${record['Your Name']}...`);
      const imageUrl = await uploadImage(imagePath);
      if (imageUrl) {
        record['url'] = imageUrl;
        console.log(`Success: ${imageUrl}`);
      } else {
        record['url'] = 'Failed to upload';
      }
    } else {
      console.log(`Image not found for ${record['Your Name']}: ${imageName}`);
      record['url'] = 'Image not found';
    }
    updatedRecords.push(record);
  }

  const stringifier = stringify({ header: true });
  const writableStream = fs.createWriteStream(OUTPUT_CSV_FILE);
  stringifier.pipe(writableStream);

  updatedRecords.forEach(record => {
    stringifier.write(record);
  });

  stringifier.end();
  console.log(`Processing complete. Output saved to ${OUTPUT_CSV_FILE}`);
};

processCsv();