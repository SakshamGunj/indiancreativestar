
import { supabase } from './supabase';

/**
 * Uploads a file to Supabase Storage.
 * @param file The file object to upload.
 * @param bucket The storage bucket name (default: 'artworks').
 * @param path Optional path/folder structure. If not provided, a random ID will be used.
 * @returns The public URL of the uploaded file.
 */
export const uploadToSupabase = async (
    file: File,
    bucket: string = 'artworks',
    folder: string = 'uploads'
): Promise<string> => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Error uploading file to Supabase:', error);
        throw error;
    }
};
