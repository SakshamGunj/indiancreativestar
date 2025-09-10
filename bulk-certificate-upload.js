// Standalone JavaScript file for bulk uploading certificates to Cloudinary and updating Firebase
// This script can be run in the browser console or as a standalone script

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

// Certificate folder path (user needs to update this)
const CERTIFICATE_FOLDER_PATH = '/Users/sakshamgunj/Downloads/(Bulk 1) Add a heading (1) 2';

// Initialize Firebase
async function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not loaded. Please include Firebase SDK first.');
    return false;
  }
  
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  return true;
}

// Compute SHA-1 hex in the browser
async function computeSha1Hex(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Upload image to Cloudinary
async function uploadToCloudinary(file, serialNumber, participantName) {
  try {
    console.log(`📤 Uploading certificate ${serialNumber} for ${participantName}...`);
    
    // Build signed params
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signParams = new URLSearchParams();
    signParams.set('timestamp', timestamp);
    signParams.set('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    const toSign = `${Array.from(signParams.keys()).sort().map(k => `${k}=${signParams.get(k)}`).join('&')}${CLOUDINARY_CONFIG.apiSecret}`;
    const signature = await computeSha1Hex(toSign);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      throw new Error(errorJson?.error?.message || `Cloudinary error ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ Certificate ${serialNumber} uploaded: ${data.secure_url}`);
    return data.secure_url;

  } catch (error) {
    console.error(`❌ Failed to upload certificate ${serialNumber}:`, error);
    throw error;
  }
}

// Get participants ordered by registration date
async function getParticipantsOrderedByRegistration() {
  try {
    console.log('📡 Fetching participants from Firebase...');
    
    const db = firebase.firestore();
    const querySnapshot = await db.collection('participantdetailspersonal')
      .orderBy('registrationDate', 'asc')
      .get();
    
    if (querySnapshot.empty) {
      throw new Error('No participants found in database');
    }
    
    const participants = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participants.push({
        id: doc.id,
        name: data.name || 'Unknown',
        email: data.email || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date(),
        certificateUrl: data.certificateUrl || undefined
      });
    });
    
    console.log(`✅ Found ${participants.length} participants ordered by registration date`);
    return participants;
    
  } catch (error) {
    console.error('❌ Error fetching participants:', error);
    throw error;
  }
}

// Update Firebase participant with certificate URL
async function updateParticipantCertificate(participantId, certificateUrl) {
  try {
    const db = firebase.firestore();
    await db.collection('participantdetailspersonal').doc(participantId).update({
      certificateUrl: certificateUrl,
      certificateUpdated: new Date()
    });
    
    console.log(`✅ Updated participant ${participantId} with certificate URL`);
    
  } catch (error) {
    console.error(`❌ Failed to update participant ${participantId}:`, error);
    throw error;
  }
}

// Process single certificate
async function processCertificate(certificateFile, serialNumber, participant) {
  const result = {
    serialNumber,
    participantId: participant.id,
    participantName: participant.name,
    certificateUrl: '',
    success: false,
    error: null
  };
  
  try {
    console.log(`\n📋 Processing Certificate ${serialNumber}:`);
    console.log(`   👤 Participant: ${participant.name}`);
    console.log(`   📧 Email: ${participant.email}`);
    console.log(`   📁 File: ${certificateFile.name}`);
    
    // Upload to Cloudinary
    const certificateUrl = await uploadToCloudinary(
      certificateFile,
      serialNumber,
      participant.name
    );
    
    // Update Firebase
    await updateParticipantCertificate(participant.id, certificateUrl);
    
    result.certificateUrl = certificateUrl;
    result.success = true;
    
    console.log(`✅ Certificate ${serialNumber} processed successfully`);
    return result;
    
  } catch (error) {
    result.error = error.message;
    console.error(`❌ Error processing certificate ${serialNumber}:`, error);
    return result;
  }
}

// Main bulk upload function
async function bulkUploadCertificates() {
  try {
    console.log('🚀 Starting bulk certificate upload...');
    console.log(`📁 Certificate folder: ${CERTIFICATE_FOLDER_PATH}`);
    
    // Initialize Firebase
    const firebaseReady = await initializeFirebase();
    if (!firebaseReady) {
      throw new Error('Firebase initialization failed');
    }
    
    // Get file input element or create one
    let fileInput = document.getElementById('certificate-file-input');
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.multiple = true;
      fileInput.accept = 'image/*';
      fileInput.id = 'certificate-file-input';
      fileInput.style.display = 'none';
      document.body.appendChild(fileInput);
    }
    
    // Prompt user to select certificate files
    return new Promise((resolve, reject) => {
      fileInput.onchange = async (event) => {
        try {
          const files = event.target.files;
          if (!files || files.length === 0) {
            throw new Error('No files selected');
          }
          
          console.log(`📊 Selected ${files.length} certificate files`);
          
          // Get participants
          const participants = await getParticipantsOrderedByRegistration();
          
          if (files.length > participants.length) {
            console.warn(`⚠️ More certificates (${files.length}) than participants (${participants.length})`);
          }
          
          const results = [];
          let uploadedCount = 0;
          let failedCount = 0;
          
          // Process files in order
          const filesToProcess = Math.min(files.length, participants.length);
          
          for (let i = 0; i < filesToProcess; i++) {
            const serialNumber = i + 1;
            const certificateFile = files[i];
            const participant = participants[i];
            
            const result = await processCertificate(certificateFile, serialNumber, participant);
            results.push(result);
            
            if (result.success) {
              uploadedCount++;
            } else {
              failedCount++;
            }
            
            // Add delay to avoid rate limiting
            if (i < filesToProcess - 1) {
              console.log('⏳ Waiting 2 seconds before next upload...');
              await new Promise(resolve => setTimeout(resolve, 2000));
            }
          }
          
          console.log('\n🎯 Bulk Upload Complete!');
          console.log(`📊 Total Processed: ${filesToProcess}`);
          console.log(`✅ Successful: ${uploadedCount}`);
          console.log(`❌ Failed: ${failedCount}`);
          
          // Show detailed results
          console.log('\n📋 Detailed Results:');
          results.forEach(result => {
            const status = result.success ? '✅' : '❌';
            console.log(`   ${status} ${result.serialNumber}. ${result.participantName} - ${result.success ? result.certificateUrl : result.error}`);
          });
          
          const finalResult = {
            success: failedCount === 0,
            totalProcessed: filesToProcess,
            uploadedCount,
            failedCount,
            results,
            message: `Processed ${filesToProcess} certificates. ${uploadedCount} successful, ${failedCount} failed.`
          };
          
          alert(`🎉 Certificate Upload Complete!\n\n📊 Results:\n✅ Successful: ${uploadedCount}\n❌ Failed: ${failedCount}\n📄 Total: ${filesToProcess}\n\nCheck console for detailed results.`);
          
          resolve(finalResult);
          
        } catch (error) {
          console.error('❌ Bulk upload failed:', error);
          alert(`❌ Upload failed: ${error.message}`);
          reject(error);
        }
      };
      
      // Trigger file selection
      console.log('📂 Please select certificate files (1.png, 2.png, etc.) from the folder:');
      console.log(`   ${CERTIFICATE_FOLDER_PATH}`);
      alert(`📂 Certificate Upload\n\nPlease select certificate files from:\n${CERTIFICATE_FOLDER_PATH}\n\nSelect files in order: 1.png, 2.png, 3.png, etc.`);
      fileInput.click();
    });
    
  } catch (error) {
    console.error('❌ Bulk upload initialization failed:', error);
    alert(`❌ Upload failed: ${error.message}`);
    throw error;
  }
}

// Function to get upload status
async function getCertificateUploadStatus() {
  try {
    console.log('📊 Checking certificate upload status...');
    
    const firebaseReady = await initializeFirebase();
    if (!firebaseReady) {
      throw new Error('Firebase initialization failed');
    }
    
    const participants = await getParticipantsOrderedByRegistration();
    
    let withCertificates = 0;
    let withoutCertificates = 0;
    
    console.log('\n📋 Certificate Status:');
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
      completionRate: Math.round((withCertificates / participants.length) * 100),
      participants: participants.map((p, index) => ({
        serialNumber: index + 1,
        name: p.name,
        email: p.email,
        hasCertificate: !!p.certificateUrl,
        certificateUrl: p.certificateUrl
      }))
    };
    
  } catch (error) {
    console.error('❌ Error checking status:', error);
    throw error;
  }
}

// Make functions available globally
window.bulkUploadCertificates = bulkUploadCertificates;
window.getCertificateUploadStatus = getCertificateUploadStatus;

// Instructions
console.log(`
🎯 SIKKIM CREATIVE STAR - CERTIFICATE BULK UPLOAD
==============================================

📋 USAGE INSTRUCTIONS:

1. Make sure you're on a page with Firebase loaded
2. Open browser developer console (F12)
3. Run one of these commands:

   To upload certificates:
   bulkUploadCertificates()

   To check upload status:
   getCertificateUploadStatus()

📁 CERTIFICATE FOLDER:
${CERTIFICATE_FOLDER_PATH}

🔄 PROCESS:
1. Participants are ordered by registration date (earliest = Serial #1)
2. Certificate 1.png goes to participant #1, 2.png to participant #2, etc.
3. Each certificate is uploaded to Cloudinary
4. Firebase is updated with the certificate URL
5. Process includes 2-second delays to avoid rate limits

📊 MATCHING LOGIC:
- Serial Number 1 = First registered participant
- Serial Number 2 = Second registered participant
- And so on...

⚡ The system will automatically match certificate files with participants based on registration order.
`);

// If running in Node.js environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    bulkUploadCertificates,
    getCertificateUploadStatus,
    uploadToCloudinary,
    processCertificate
  };
}