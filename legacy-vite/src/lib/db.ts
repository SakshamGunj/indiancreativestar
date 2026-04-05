
import { supabase } from './supabase';

// Collection/Table names
export const TABLES = {
    PARTICIPANTS: 'participants',
    WINTER_ART_REGISTRATIONS: 'winter_art_registrations',
    REVIEWS: 'reviews'
};

// --- Participants (Sikkim Creative Star) ---

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
        const { data, error } = await supabase
            .from(TABLES.PARTICIPANTS)
            .insert([{
                ...participantData,
                status: 'registered'
            }])
            .select()
            .single();

        if (error) throw error;

        // Webhook trigger can be handled here or via Supabase Database Webhooks (Edge Function recommended)
        // For now, we will simply log success as we migrate logic.
        console.log("Participant registered:", data);

        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error adding participant: ", error);
        return { success: false, error };
    }
};

// --- Reviews ---

export const addReview = async (reviewData: {
    name: string;
    location: string;
    message: string;
    rating: number;
}) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.REVIEWS)
            .insert([{
                ...reviewData,
                approved: false
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error adding review: ", error);
        return { success: false, error };
    }
};

// --- Winter Art Royale ---

export const registerWinterArtUser = async (userData: any) => {
    try {
        const { data, error } = await supabase
            .from(TABLES.WINTER_ART_REGISTRATIONS)
            .insert([{
                ...userData,
                payment_status: 'pending',
                amount_paid: 0,
                platform: 'website',
                category: userData.category,
                art_form: userData.artType // Mapping artType from form to art_form in DB
            }])
            .select()
            .single();

        if (error) throw error;

        return { success: true, id: data.id };
    } catch (error) {
        console.error("Error registering Winter Art Royale user: ", error);
        return { success: false, error };
    }
};

export const getWinterArtRegistrations = async () => {
    try {
        const { data, error } = await supabase
            .from(TABLES.WINTER_ART_REGISTRATIONS)
            .select('*')
            .order('registration_date', { ascending: false });

        if (error) throw error;

        // Map fields to match application expectations if needed (camelCase vs snake_case)
        // Supabase returns snake_case by default for columns. 
        // We should adapt the frontend or map here. 
        // Adapting map here for backward compatibility:
        const mappedData = data.map((item: any) => ({
            ...item,
            registrationDate: item.registration_date,
            paymentStatus: item.payment_status,
            amountPaid: item.amount_paid,
            orderId: item.order_id,
            paymentId: item.payment_id
        }));

        return { success: true, data: mappedData };
    } catch (error) {
        console.error("Error fetching registrations: ", error);
        return { success: false, error };
    }
};

export const updateWinterArtPayment = async (docId: string, paymentDetails: {
    paymentStatus: string;
    amountPaid: number;
    orderId: string;
    paymentId?: string;
}) => {
    try {
        const { error } = await supabase
            .from(TABLES.WINTER_ART_REGISTRATIONS)
            .update({
                payment_status: paymentDetails.paymentStatus,
                amount_paid: paymentDetails.amountPaid,
                order_id: paymentDetails.orderId,
                payment_id: paymentDetails.paymentId,
            })
            .eq('id', docId);

        if (error) throw error;

        return { success: true };
    } catch (error) {
        console.error("Error updating payment status: ", error);
        return { success: false, error };
    }
};

// --- Artwork Submissions (New Flow) ---

export const addArtworkSubmission = async (data: {
    name: string;
    email: string;
    phone: string;
    plan_type: string;
    amount_paid: number;
}) => {
    try {
        const { data: result, error } = await supabase
            .from('artwork_submissions')
            .insert([{
                ...data,
                payment_status: 'pending',
                created_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return { success: true, id: result.id };
    } catch (error) {
        console.error("Error creating submission:", error);
        return { success: false, error };
    }
};

export const updateSubmissionPayment = async (orderId: string, status: 'SUCCESS' | 'FAILED') => {
    try {
        const { error } = await supabase
            .from('artwork_submissions')
            .update({ payment_status: status })
            .eq('order_id', orderId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

export const updateSubmissionArtworks = async (submissionId: string, artworks: string[]) => {
    try {
        const { error } = await supabase
            .from('artwork_submissions')
            .update({ artworks: artworks }) // Storing as JSON array
            .eq('id', submissionId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};

export const getArtworkSubmissions = async () => {
    try {
        const { data, error } = await supabase
            .from('artwork_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return { success: false, error };
    }
};
