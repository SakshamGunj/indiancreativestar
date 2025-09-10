import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadToCloudinary } from '../lib/cloudinary';

interface ParticipantData {
  id: string;
  name: string;
  email: string;
  registrationDate: Date;
  certificateUrl?: string;
}

interface UploadResult {
  serialNumber: number;
  participantId: string;
  participantName: string;
  certificateUrl: string;
  success: boolean;
  error?: string;
}

interface BulkUploadResult {
  success: boolean;
  totalCertificates: number;
  uploadedCount: number;
  failedCount: number;
  results: UploadResult[];
  message: string;
}

/**
 * Get participants from Firebase in EXACT same order as CSV export
 * This uses the natural Firebase document order (no sorting)
 */
export const getParticipantsInCSVOrder = async (): Promise<ParticipantData[]> => {
  try {
    console.log('📡 Fetching participants in CSV export order...');
    
    // NO orderBy - this gets participants in the same order as CSV export
    // This matches the exact order used in csvExport.ts
    const querySnapshot = await getDocs(collection(db, 'participantdetailspersonal'));
    
    if (querySnapshot.empty) {
      throw new Error('No participants found in database');
    }
    
    const participants: ParticipantData[] = [];
    querySnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      participants.push({
        id: docSnapshot.id,
        name: data.name || 'Unknown',
        email: data.email || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date(),
        certificateUrl: data.certificateUrl || undefined
      });
    });
    
    console.log(`✅ Found ${participants.length} participants in CSV export order`);
    console.log('📋 First 5 participants:');
    participants.slice(0, 5).forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.name} (${p.email})`);
    });
    
    return participants;
    
  } catch (error) {
    console.error('❌ Error fetching participants:', error);
    throw error;
  }
};

// Keep old function for backward compatibility
export const getParticipantsOrderedByRegistration = getParticipantsInCSVOrder;

/**
 * Upload certificate image to Cloudinary
 */
export const uploadCertificateToCloudinary = async (
  file: File,
  serialNumber: number,
  participantName: string
): Promise<string> => {
  try {
    console.log(`📤 Uploading certificate ${serialNumber} for ${participantName}...`);
    
    // Create a new file with descriptive name for Cloudinary
    const renamedFile = new File([file], `certificate-${serialNumber}-${participantName.replace(/\s+/g, '_')}.png`, {
      type: file.type
    });
    
    const certificateUrl = await uploadToCloudinary(renamedFile);
    console.log(`✅ Certificate ${serialNumber} uploaded: ${certificateUrl}`);
    
    return certificateUrl;
    
  } catch (error) {
    console.error(`❌ Failed to upload certificate ${serialNumber}:`, error);
    throw error;
  }
};

/**
 * Update Firebase participant with certificate URL
 */
export const updateParticipantCertificate = async (
  participantId: string,
  certificateUrl: string
): Promise<void> => {
  try {
    const participantRef = doc(db, 'participantdetailspersonal', participantId);
    await updateDoc(participantRef, {
      certificateUrl: certificateUrl,
      certificateUpdated: new Date()
    });
    
    console.log(`✅ Updated participant ${participantId} with certificate URL`);
    
  } catch (error) {
    console.error(`❌ Failed to update participant ${participantId}:`, error);
    throw error;
  }
};

/**
 * Process single certificate upload and Firebase update
 */
export const processCertificate = async (
  certificateFile: File,
  serialNumber: number,
  participant: ParticipantData
): Promise<UploadResult> => {
  const result: UploadResult = {
    serialNumber,
    participantId: participant.id,
    participantName: participant.name,
    certificateUrl: '',
    success: false
  };
  
  try {
    // Upload to Cloudinary
    const certificateUrl = await uploadCertificateToCloudinary(
      certificateFile,
      serialNumber,
      participant.name
    );
    
    // Update Firebase
    await updateParticipantCertificate(participant.id, certificateUrl);
    
    result.certificateUrl = certificateUrl;
    result.success = true;
    
    return result;
    
  } catch (error) {
    result.error = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Error processing certificate ${serialNumber}:`, error);
    return result;
  }
};

/**
 * Bulk upload certificates from file input
 */
export const bulkUploadCertificates = async (
  certificateFiles: FileList,
  onProgress?: (progress: { current: number; total: number; participant: string }) => void
): Promise<BulkUploadResult> => {
  try {
    console.log('🚀 Starting bulk certificate upload...');
    
    // Get participants ordered by registration date
    const participants = await getParticipantsOrderedByRegistration();
    
    if (certificateFiles.length === 0) {
      throw new Error('No certificate files provided');
    }
    
    console.log(`📊 Processing ${certificateFiles.length} certificates for ${participants.length} participants`);
    
    const results: UploadResult[] = [];
    let uploadedCount = 0;
    let failedCount = 0;
    
    // Process certificates serially (to avoid Cloudinary rate limits)
    for (let i = 0; i < certificateFiles.length && i < participants.length; i++) {
      const serialNumber = i + 1;
      const certificateFile = certificateFiles[i];
      const participant = participants[i];
      
      // Notify progress
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: Math.min(certificateFiles.length, participants.length),
          participant: participant.name
        });
      }
      
      console.log(`\n📋 Processing Certificate ${serialNumber}:`);
      console.log(`   👤 Participant: ${participant.name}`);
      console.log(`   📧 Email: ${participant.email}`);
      console.log(`   📁 File: ${certificateFile.name}`);
      
      const result = await processCertificate(certificateFile, serialNumber, participant);
      results.push(result);
      
      if (result.success) {
        uploadedCount++;
        console.log(`✅ Certificate ${serialNumber} processed successfully`);
      } else {
        failedCount++;
        console.log(`❌ Certificate ${serialNumber} failed: ${result.error}`);
      }
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const totalProcessed = Math.min(certificateFiles.length, participants.length);
    
    console.log('\n🎯 Bulk Upload Complete!');
    console.log(`📊 Total Processed: ${totalProcessed}`);
    console.log(`✅ Successful: ${uploadedCount}`);
    console.log(`❌ Failed: ${failedCount}`);
    
    return {
      success: failedCount === 0,
      totalCertificates: totalProcessed,
      uploadedCount,
      failedCount,
      results,
      message: `Processed ${totalProcessed} certificates. ${uploadedCount} successful, ${failedCount} failed.`
    };
    
  } catch (error) {
    console.error('❌ Bulk upload failed:', error);
    return {
      success: false,
      totalCertificates: 0,
      uploadedCount: 0,
      failedCount: 0,
      results: [],
      message: `Bulk upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Get certificate upload status for all participants
 */
export const getCertificateUploadStatus = async (): Promise<{
  total: number;
  withCertificates: number;
  withoutCertificates: number;
  participants: Array<{
    serialNumber: number;
    name: string;
    email: string;
    hasCertificate: boolean;
    certificateUrl?: string;
  }>;
}> => {
  try {
    const participants = await getParticipantsOrderedByRegistration();
    
    let withCertificates = 0;
    let withoutCertificates = 0;
    
    const participantStatus = participants.map((participant, index) => {
      const hasCertificate = !!participant.certificateUrl;
      
      if (hasCertificate) {
        withCertificates++;
      } else {
        withoutCertificates++;
      }
      
      return {
        serialNumber: index + 1,
        name: participant.name,
        email: participant.email,
        hasCertificate,
        certificateUrl: participant.certificateUrl
      };
    });
    
    return {
      total: participants.length,
      withCertificates,
      withoutCertificates,
      participants: participantStatus
    };
    
  } catch (error) {
    console.error('Error getting certificate status:', error);
    throw error;
  }
};