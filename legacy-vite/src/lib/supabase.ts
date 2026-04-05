
import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your .env file
// These environment variables should be set in your .env file
// FALLBACKS UPDATED and CORRECTED.
// please restart server and remove these strings later for security.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://arabgnmffqldgfulkrlo.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyYWJnbm1mZnFsZGdmdWxrcmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDM1MTMsImV4cCI6MjA4NDExOTUxM30.12GHJh6Rv6N5a-Cc3MdYb4SI0vYUbqE9aw5sxmsZXgM";

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('⚠️ USING HARDCODED SUPABASE CREDENTIALS. Please restart your server to use .env file!');
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

// Database Helper Types
export type Tables = {
    participants: {
        id: string;
        created_at: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        // ... other fields
    };
    // Add other table definitions here
};
