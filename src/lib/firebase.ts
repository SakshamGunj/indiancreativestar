// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSz6IBz0YBdHr4mgKzzN8vaTnjXxd-2KE",
  authDomain: "scsdaamievent.firebaseapp.com",
  projectId: "scsdaamievent",
  storageBucket: "scsdaamievent.firebasestorage.app",
  messagingSenderId: "947375829992",
  appId: "1:947375829992:web:d4a411c92ff81bb59e6a5d",
  measurementId: "G-1V3FQ0L5HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Collection names
export const COLLECTIONS = {
  PARTICIPANTS: 'participants',
  REVIEWS: 'reviews',
  SUBMISSIONS: 'submissions'
};

// Webhook URL for n8n automation
const WEBHOOK_URL = "https://sikkimcreativestar.app.n8n.cloud/webhook/447a6c04-15e5-4bb4-8e0e-be9c17c84f63";

// Check if launch screen should be shown globally
export const checkLaunchScreenStatus = async (): Promise<boolean> => {
  try {
    const launchDoc = doc(db, 'settings', 'launchScreen');
    const docSnap = await getDoc(launchDoc);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.reveal === true;
    } else {
      // If document doesn't exist, default to showing launch screen
      return true;
    }
  } catch (error) {
    console.error('Error checking launch screen status:', error);
    // On error, default to showing launch screen
    return true;
  }
};

// Disable launch screen globally when someone clicks launch
export const disableLaunchScreenGlobally = async (): Promise<void> => {
  try {
    const launchDoc = doc(db, 'settings', 'launchScreen');
    await setDoc(launchDoc, { reveal: false }, { merge: true });
    console.log('Launch screen disabled globally');
  } catch (error) {
    console.error('Error disabling launch screen:', error);
  }
};

// Function to send data to n8n webhook
const sendToWebhook = async (participantData: any, registrationId: string) => {
  try {
    // Determine prize money based on category
    const prizeMoney = {
      "Adult": "₹15,000 (1st Prize)",
      "Group A (5-8 years)": "₹5,000",
      "Group B (9-12 years)": "₹5,000", 
      "Group C (13-17 years)": "₹10,000"
    };

    const webhookPayload = {
      event: "user_registration",
      timestamp: new Date().toISOString(),
      registration_id: registrationId,
      participant: {
        name: participantData.name,
        email: participantData.email,
        age: participantData.age,
        whatsapp: participantData.whatsapp,
        instagram: participantData.instagram || "",
        contestType: participantData.contestType,
        category: participantData.category,
        registrationDate: new Date().toISOString()
      },
      competition: {
        name: "Sikkim Creative Star: Art Competition",
        type: participantData.contestType,
        category: participantData.category,
        prize_money: prizeMoney[participantData.category as keyof typeof prizeMoney] || "₹15,000"
      },
      source: "website_registration",
      test: false,
      // Additional data for n8n processing
      meta: {
        whatsapp_group_link: "https://chat.whatsapp.com/G8JA8VYNvXR2KsW1Depn1j",
        contact_email: "daamievent@gmail.com",
        contact_phone: "+91 9800452188",
        instagram_handle: "@daamievent",
        submission_deadline: "July 15th, 2025",
        results_announcement: "May 15th, 2025",
        certificate_distribution: "May 20th, 2025"
      }
    };

    console.log("Sending registration data to n8n webhook...", {
      participant: participantData.name,
      category: participantData.category,
      email: participantData.email
    });

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // Bypass CORS restrictions
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload)
    });
    
    // With no-cors mode, we can't read the response, so we assume success if no error
    console.log("✅ Webhook sent successfully to n8n automation");
    return { 
      success: true, 
      message: "Registration data sent to email automation",
      registration_id: registrationId
    };

  } catch (error) {
    console.error("❌ Webhook failed:", error);
    return { 
      success: false, 
      error: error,
      message: "Failed to trigger email automation"
    };
  }
};

// Function to add participant to Firestore
export const addParticipant = async (participantData: {
  name: string;
  age: number;
  whatsapp: string;
  email: string;
  instagram?: string;
  contestType: string;
  category?: string;
}) => {
  try {
    // First, save to Firebase
    const docRef = await addDoc(collection(db, COLLECTIONS.PARTICIPANTS), {
      ...participantData,
      registrationDate: Timestamp.now(),
      status: 'registered',
      id: null // Will be updated with document ID
    });
    
    console.log("Participant registered with ID: ", docRef.id);
    
    // Then, send to webhook for email automation
    const webhookResult = await sendToWebhook(participantData, docRef.id);
    
    if (webhookResult.success) {
      console.log("Email automation triggered successfully");
    } else {
      console.warn("Email automation failed, but registration saved:", webhookResult.error);
      // Note: We don't fail the registration if webhook fails
    }
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding participant: ", error);
    return { success: false, error: error };
  }
};

// Function to add review to Firestore
export const addReview = async (reviewData: {
  name: string;
  location: string;
  message: string;
  rating: number;
}) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
      ...reviewData,
      submissionDate: Timestamp.now(),
      approved: false // Reviews need approval before showing
    });
    
    console.log("Review submitted with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding review: ", error);
    return { success: false, error: error };
  }
};

export { db, analytics, auth, googleProvider };
export default app; 

// Artwork submission helper
export const addSubmission = async (submissionData: {
  name: string;
  email: string;
  artworkUrl: string;
  source?: string;
  whatsapp?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.SUBMISSIONS), {
      ...submissionData,
      createdAt: Timestamp.now(),
      campaign: 'indiancreativestar',
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding submission: ', error);
    return { success: false, error };
  }
};