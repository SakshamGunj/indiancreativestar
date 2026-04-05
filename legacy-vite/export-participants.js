// Standalone JavaScript file for exporting Sikkim Creative Star participant data to CSV
// This can be run in the browser console or as a standalone script

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyCSz6IBz0YBdHr4mgKzzN8vaTnjXxd-2KE",
  authDomain: "scsdaamievent.firebaseapp.com",
  projectId: "scsdaamievent",
  storageBucket: "scsdaamievent.firebasestorage.app",
  messagingSenderId: "947375829992",
  appId: "1:947375829992:web:d4a411c92ff81bb59e6a5d",
  measurementId: "G-1V3FQ0L5HT"
};

// Function to initialize Firebase (if not already initialized)
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

// Function to convert data to CSV format
function convertToCSV(data, headers) {
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle dates, escape quotes, and wrap in quotes if contains comma
        if (value instanceof Date) {
          return `"${value.toISOString()}"`;
        }
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
}

// Function to download CSV file
function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Main function to export participants with Device ID and Name
async function exportParticipantsCSV() {
  try {
    console.log('🚀 Starting participant data export...');
    
    // Initialize Firebase
    const firebaseReady = await initializeFirebase();
    if (!firebaseReady) {
      throw new Error('Firebase initialization failed');
    }
    
    const db = firebase.firestore();
    
    console.log('📡 Fetching participants from Firestore...');
    
    // Fetch all documents from participantdetailspersonal collection
    const querySnapshot = await db.collection('participantdetailspersonal').get();
    
    if (querySnapshot.empty) {
      console.warn('⚠️ No participants found in the database.');
      alert('No participants found in the database.');
      return;
    }
    
    console.log(`📊 Found ${querySnapshot.size} participants`);
    
    // Convert Firestore documents to array of objects
    const participants = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participants.push({
        id: doc.id,
        name: data.name || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        address: data.address || 'N/A',
        profileImage: data.profileImage || 'N/A',
        registrationDate: data.registrationDate ? data.registrationDate.toDate() : new Date(),
        status: data.status || 'N/A',
        deviceId: data.deviceId || 'N/A',
        authProvider: data.authProvider || 'email'
      });
    });
    
    // Define CSV headers for complete export
    const fullHeaders = [
      'id',
      'name',
      'email', 
      'phone',
      'address',
      'profileImage',
      'registrationDate',
      'status',
      'deviceId',
      'authProvider'
    ];
    
    // Define CSV headers for simple export (Name and Device ID only)
    const simpleHeaders = ['name', 'deviceId', 'registrationDate'];
    
    // Generate timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    
    // Export full CSV
    const fullCsvContent = convertToCSV(participants, fullHeaders);
    const fullFilename = `sikkim-creative-star-participants-full-${timestamp}.csv`;
    downloadCSV(fullCsvContent, fullFilename);
    
    // Export simple CSV (Name and Device ID only)
    const simpleCsvContent = convertToCSV(participants, simpleHeaders);
    const simpleFilename = `sikkim-participants-name-deviceid-${timestamp}.csv`;
    downloadCSV(simpleCsvContent, simpleFilename);
    
    console.log('✅ Export completed successfully!');
    console.log(`📁 Files generated:`);
    console.log(`   - ${fullFilename} (Complete data)`);
    console.log(`   - ${simpleFilename} (Name & Device ID only)`);
    
    alert(`✅ Export completed!\n\n📊 Exported ${participants.length} participants\n📁 Generated 2 files:\n\n1. ${fullFilename}\n   (Complete participant data)\n\n2. ${simpleFilename}\n   (Name & Device ID only)`);
    
    return {
      success: true,
      count: participants.length,
      files: [fullFilename, simpleFilename]
    };
    
  } catch (error) {
    console.error('❌ Error exporting participants:', error);
    alert(`❌ Export failed: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Function to export only Name and Device ID (simplified)
async function exportSimpleCSV() {
  try {
    console.log('🚀 Starting simple participant data export (Name & Device ID)...');
    
    const firebaseReady = await initializeFirebase();
    if (!firebaseReady) {
      throw new Error('Firebase initialization failed');
    }
    
    const db = firebase.firestore();
    const querySnapshot = await db.collection('participantdetailspersonal').get();
    
    if (querySnapshot.empty) {
      alert('No participants found in the database.');
      return;
    }
    
    const participants = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participants.push({
        name: data.name || 'N/A',
        deviceId: data.deviceId || 'N/A',
        registrationDate: data.registrationDate ? data.registrationDate.toDate() : new Date()
      });
    });
    
    const headers = ['name', 'deviceId', 'registrationDate'];
    const csvContent = convertToCSV(participants, headers);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `sikkim-participants-simple-${timestamp}.csv`;
    
    downloadCSV(csvContent, filename);
    
    console.log(`✅ Simple export completed: ${filename}`);
    alert(`✅ Simple export completed!\n\n📊 Exported ${participants.length} participants\n📁 File: ${filename}`);
    
    return {
      success: true,
      count: participants.length,
      filename: filename
    };
    
  } catch (error) {
    console.error('❌ Error in simple export:', error);
    alert(`❌ Export failed: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Make functions available globally
window.exportParticipantsCSV = exportParticipantsCSV;
window.exportSimpleCSV = exportSimpleCSV;

// Instructions for usage
console.log(`
🎯 SIKKIM CREATIVE STAR - CSV EXPORT UTILITY
============================================

📋 USAGE INSTRUCTIONS:

1. Make sure you're on a page with Firebase loaded
2. Open browser developer console (F12)
3. Run one of these commands:

   For complete export (all data):
   exportParticipantsCSV()

   For simple export (name & device ID only):
   exportSimpleCSV()

📁 FILES GENERATED:
- Complete: sikkim-creative-star-participants-full-[timestamp].csv
- Simple: sikkim-participants-name-deviceid-[timestamp].csv

🔧 DATA INCLUDES:
- Participant ID
- Name  
- Email
- Phone
- Address
- Profile Image URL
- Registration Date
- Status
- Device ID (for tracking unique registrations)
- Authentication Provider (email/google)

⚡ The files will download automatically to your Downloads folder.
`);

// If running in Node.js environment, export the functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    exportParticipantsCSV,
    exportSimpleCSV,
    convertToCSV,
    downloadCSV
  };
}