// Node.js script to upload certificates in the same serial order as CSV export
// This matches the exact Firebase document order used in CSV generation

import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import crypto from 'crypto';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSz6IBz0YBdHr4mgKzzN8vaTnjXxd-2KE",
  authDomain: "scsdaamievent.firebaseapp.com",
  projectId: "scsdaamievent",
  storageBucket: "scsdaamievent.firebasestorage.app",
  messagingSenderId: "947375829992",
  appId: "1:947375829992:web:d4a411c92ff81bb59e6a5d",
  measurementId: "G-1V3FQ0L5HT"
};

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: 'dhvzfbhbe',
  uploadPreset: 'profilephoto',
  apiKey: '775374399753362',
  apiSecret: 'jwe-J4gocdB4VMayA5Cq9x7cGFM'
};

// Certificate folder path - EXACT same path as mentioned
const CERTIFICATE_FOLDER = '/Users/sakshamgunj/Downloads/(Bulk 1) Add a heading (1) 2';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to compute SHA-1 signature
function computeSha1Hex(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}

// Get participants in EXACT same order as CSV export (Firebase document order)
async function getParticipantsInCSVOrder() {
  try {
    console.log('📡 Fetching participants in CSV export order...');
    
    // This gets participants in the same order as CSV export
    // No orderBy - uses natural Firebase document order
    const querySnapshot = await getDocs(collection(db, 'participantdetailspersonal'));
    
    if (querySnapshot.empty) {
      throw new Error('No participants found in database');
    }
    
    const participants = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      participants.push({
        id: docSnapshot.id,
        name: data.name || 'Unknown',
        email: data.email || 'N/A',
        deviceId: data.deviceId || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date(),
        certificateUrl: data.certificateUrl || undefined
      });
    });
    
    console.log(`✅ Found ${participants.length} participants in CSV export order`);
    console.log('📋 First 5 participants:');
    participants.slice(0, 5).forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.name} (${p.email}) - Device: ${p.deviceId}`);
    });
    
    return participants;
    
  } catch (error) {
    console.error('❌ Error fetching participants:', error);
    throw error;
  }
}

// Upload image to Cloudinary
async function uploadToCloudinary(imagePath, serialNumber, participantName) {
  try {
    console.log(`📤 Uploading certificate ${serialNumber} for ${participantName}...`);
    
    // Create form data
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signParams = `timestamp=${timestamp}&upload_preset=${CLOUDINARY_CONFIG.uploadPreset}${CLOUDINARY_CONFIG.apiSecret}`;
    const signature = computeSha1Hex(signParams);
    
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));
    form.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    form.append('api_key', CLOUDINARY_CONFIG.apiKey);
    form.append('timestamp', timestamp);
    form.append('signature', signature);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: form
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Certificate ${serialNumber} uploaded: ${data.secure_url}`);
    
    return data.secure_url;
    
  } catch (error) {
    console.error(`❌ Failed to upload certificate ${serialNumber}:`, error);
    throw error;
  }
}

// Update Firebase with certificate URL
async function updateParticipantCertificate(participantId, certificateUrl) {
  try {
    const participantRef = doc(db, 'participantdetailspersonal', participantId);
    await updateDoc(participantRef, {
      certificateUrl: certificateUrl,
      certificateUpdated: new Date()
    });
    
    console.log(`✅ Updated Firebase for participant ${participantId}`);
    
  } catch (error) {
    console.error(`❌ Failed to update Firebase for ${participantId}:`, error);
    throw error;
  }
}

// Get certificate files from folder
function getCertificateFiles() {
  try {
    console.log(`📁 Reading certificate files from: ${CERTIFICATE_FOLDER}`);
    
    if (!fs.existsSync(CERTIFICATE_FOLDER)) {
      throw new Error(`Certificate folder not found: ${CERTIFICATE_FOLDER}`);
    }
    
    const files = fs.readdirSync(CERTIFICATE_FOLDER);
    
    // Filter and sort certificate files (1.jpg, 2.jpg, etc.)
    const certificateFiles = files
      .filter(file => /^\d+\.jpg$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.split('.')[0]);
        const numB = parseInt(b.split('.')[0]);
        return numA - numB;
      });
    
    console.log(`📊 Found ${certificateFiles.length} certificate files:`);
    certificateFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (certificateFiles.length > 10) {
      console.log(`   ... and ${certificateFiles.length - 10} more`);
    }
    
    return certificateFiles.map(file => ({
      filename: file,
      serialNumber: parseInt(file.split('.')[0]),
      fullPath: path.join(CERTIFICATE_FOLDER, file)
    }));
    
  } catch (error) {
    console.error('❌ Error reading certificate files:', error);
    throw error;
  }
}

// Main function to upload certificates
async function uploadCertificatesInCSVOrder() {
  try {
    console.log('🚀 Starting certificate upload in CSV export order...');
    console.log('='.repeat(60));
    
    // Get participants in same order as CSV export
    const participants = await getParticipantsInCSVOrder();
    
    // Get certificate files from folder
    const certificateFiles = getCertificateFiles();
    
    if (certificateFiles.length === 0) {
      throw new Error('No certificate files found in the folder');
    }
    
    console.log(`\n📋 Matching Process:`);
    console.log(`   Participants: ${participants.length}`);
    console.log(`   Certificates: ${certificateFiles.length}`);
    
    const results = [];
    const maxUploads = Math.min(participants.length, certificateFiles.length);
    
    console.log(`\n🔄 Processing ${maxUploads} certificates...\n`);
    
    // Process each certificate in order
    for (let i = 0; i < maxUploads; i++) {
      const serialNumber = i + 1;
      const participant = participants[i];
      const certificateFile = certificateFiles.find(cf => cf.serialNumber === serialNumber);
      
      if (!certificateFile) {
        console.log(`⚠️  Certificate ${serialNumber}.jpg not found, skipping...`);
        continue;
      }
      
      const result = {
        serialNumber,
        participantId: participant.id,
        participantName: participant.name,
        participantEmail: participant.email,
        deviceId: participant.deviceId,
        certificateFile: certificateFile.filename,
        success: false,
        certificateUrl: '',
        error: null
      };
      
      try {
        console.log(`\n📋 Processing Serial #${serialNumber}:`);
        console.log(`   👤 Participant: ${participant.name}`);
        console.log(`   📧 Email: ${participant.email}`);
        console.log(`   🔧 Device ID: ${participant.deviceId}`);
        console.log(`   📁 Certificate: ${certificateFile.filename}`);
        
        // Check if certificate already exists
        if (participant.certificateUrl) {
          console.log(`   ⚠️  Certificate already exists, skipping...`);
          result.success = true;
          result.certificateUrl = participant.certificateUrl;
          result.error = 'Already uploaded';
        } else {
          // Upload to Cloudinary
          const certificateUrl = await uploadToCloudinary(
            certificateFile.fullPath,
            serialNumber,
            participant.name
          );
          
          // Update Firebase
          await updateParticipantCertificate(participant.id, certificateUrl);
          
          result.success = true;
          result.certificateUrl = certificateUrl;
          
          console.log(`   ✅ Serial #${serialNumber} completed successfully!`);
        }
        
      } catch (error) {
        result.error = error.message;
        console.log(`   ❌ Serial #${serialNumber} failed: ${error.message}`);
      }
      
      results.push(result);
      
      // Add delay to avoid rate limiting (only if uploading)
      if (result.success && !result.error && i < maxUploads - 1) {
        console.log('   ⏳ Waiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Summary
    const successful = results.filter(r => r.success && !r.error).length;
    const skipped = results.filter(r => r.success && r.error === 'Already uploaded').length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 CERTIFICATE UPLOAD COMPLETE!');
    console.log('='.repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   Total Processed: ${results.length}`);
    console.log(`   ✅ New Uploads: ${successful}`);
    console.log(`   ⚠️  Already Existed: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    
    console.log(`\n📋 Detailed Results:`);
    results.forEach(result => {
      const status = result.success ? (result.error ? '⚠️ ' : '✅') : '❌';
      const info = result.error || 'Success';
      console.log(`   ${status} ${result.serialNumber}. ${result.participantName} - ${info}`);
    });
    
    if (successful > 0) {
      console.log(`\n🎉 ${successful} certificates uploaded successfully!`);
      console.log('🔗 Participants can now download their certificates from their dashboards.');
    }
    
    return {
      success: failed === 0,
      totalProcessed: results.length,
      newUploads: successful,
      alreadyExisted: skipped,
      failed: failed,
      results: results
    };
    
  } catch (error) {
    console.error('❌ Certificate upload failed:', error);
    throw error;
  }
}

// Check upload status
async function checkCertificateStatus() {
  try {
    console.log('📊 Checking certificate upload status...');
    
    const participants = await getParticipantsInCSVOrder();
    
    let withCertificates = 0;
    let withoutCertificates = 0;
    
    console.log('\n📋 Certificate Status (CSV Order):');
    participants.forEach((participant, index) => {
      const serialNumber = index + 1;
      const hasCertificate = !!participant.certificateUrl;
      
      if (hasCertificate) {
        withCertificates++;
        console.log(`✅ ${serialNumber}. ${participant.name} - Certificate Ready`);
      } else {
        withoutCertificates++;
        console.log(`⏳ ${serialNumber}. ${participant.name} - Pending Certificate`);
      }
    });
    
    console.log('\n📊 Summary:');
    console.log(`   Total Participants: ${participants.length}`);
    console.log(`   With Certificates: ${withCertificates}`);
    console.log(`   Without Certificates: ${withoutCertificates}`);
    console.log(`   Completion Rate: ${Math.round((withCertificates / participants.length) * 100)}%`);
    
    return {
      total: participants.length,
      withCertificates,
      withoutCertificates,
      completionRate: Math.round((withCertificates / participants.length) * 100)
    };
    
  } catch (error) {
    console.error('❌ Error checking status:', error);
    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'upload';
  
  try {
    if (command === 'status') {
      await checkCertificateStatus();
    } else if (command === 'upload') {
      await uploadCertificatesInCSVOrder();
    } else {
      console.log('Usage:');
      console.log('  node certificate-uploader-node.js upload   # Upload certificates');
      console.log('  node certificate-uploader-node.js status   # Check status');
    }
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main();
}

export {
  uploadCertificatesInCSVOrder,
  checkCertificateStatus,
  getParticipantsInCSVOrder
};