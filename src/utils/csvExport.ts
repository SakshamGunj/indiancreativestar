import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ParticipantData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
  registrationDate: Date;
  status: string;
  deviceId: string;
  authProvider?: string;
}

/**
 * Converts JavaScript object to CSV format
 */
const convertToCSV = (data: any[], headers: string[]): string => {
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
};

/**
 * Downloads CSV file to user's device
 */
const downloadCSV = (csvContent: string, filename: string): void => {
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
};

/**
 * Fetches all participants from Firestore and exports to CSV
 */
export const exportParticipantsToCSV = async (): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    console.log('Fetching participants data from Firestore...');
    
    // Fetch all documents from participantdetailspersonal collection
    const querySnapshot = await getDocs(collection(db, 'participantdetailspersonal'));
    
    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'No participants found in the database.'
      };
    }

    // Convert Firestore documents to array of objects
    const participants: ParticipantData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participants.push({
        id: doc.id,
        name: data.name || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        address: data.address || 'N/A',
        profileImage: data.profileImage || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date(),
        status: data.status || 'N/A',
        deviceId: data.deviceId || 'N/A',
        authProvider: data.authProvider || 'email'
      });
    });

    // Define CSV headers
    const headers = [
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

    // Convert to CSV
    const csvContent = convertToCSV(participants, headers);
    
    // Generate filename with current timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `sikkim-creative-star-participants-${timestamp}.csv`;
    
    // Download the file
    downloadCSV(csvContent, filename);
    
    console.log(`Successfully exported ${participants.length} participants to CSV`);
    
    return {
      success: true,
      message: `Successfully exported ${participants.length} participants to ${filename}`,
      count: participants.length
    };
    
  } catch (error) {
    console.error('Error exporting participants to CSV:', error);
    return {
      success: false,
      message: `Error exporting data: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Exports a simplified CSV with just Name and Device ID
 */
export const exportParticipantsSimpleCSV = async (): Promise<{ success: boolean; message: string; count?: number }> => {
  try {
    console.log('Fetching participants data for simple export...');
    
    const querySnapshot = await getDocs(collection(db, 'participantdetailspersonal'));
    
    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'No participants found in the database.'
      };
    }

    // Extract only name and deviceId
    const participantsSimple: { name: string; deviceId: string; registrationDate: Date }[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participantsSimple.push({
        name: data.name || 'N/A',
        deviceId: data.deviceId || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date()
      });
    });

    const headers = ['name', 'deviceId', 'registrationDate'];
    const csvContent = convertToCSV(participantsSimple, headers);
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `sikkim-participants-name-deviceid-${timestamp}.csv`;
    
    downloadCSV(csvContent, filename);
    
    return {
      success: true,
      message: `Successfully exported ${participantsSimple.length} participants (Name & Device ID) to ${filename}`,
      count: participantsSimple.length
    };
    
  } catch (error) {
    console.error('Error exporting simple CSV:', error);
    return {
      success: false,
      message: `Error exporting data: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

/**
 * Preview participants data without downloading
 */
export const previewParticipantsData = async (): Promise<{ success: boolean; data?: ParticipantData[]; message: string }> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'participantdetailspersonal'));
    
    if (querySnapshot.empty) {
      return {
        success: false,
        message: 'No participants found in the database.'
      };
    }

    const participants: ParticipantData[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      participants.push({
        id: doc.id,
        name: data.name || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        address: data.address || 'N/A',
        profileImage: data.profileImage || 'N/A',
        registrationDate: data.registrationDate?.toDate() || new Date(),
        status: data.status || 'N/A',
        deviceId: data.deviceId || 'N/A',
        authProvider: data.authProvider || 'email'
      });
    });

    return {
      success: true,
      data: participants,
      message: `Found ${participants.length} participants`
    };
    
  } catch (error) {
    console.error('Error previewing participants data:', error);
    return {
      success: false,
      message: `Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};