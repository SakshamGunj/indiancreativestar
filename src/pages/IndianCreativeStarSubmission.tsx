import React, { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useBranding } from "@/lib/branding";

const IndianCreativeStarSubmission: React.FC = () => {
  const { brandName } = useBranding();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [artFile, setArtFile] = useState<File | null>(null);
  const [artPreview, setArtPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setArtFile(file);
    setUploadedUrl(null);
    setMessage(null);
    if (file) {
      const url = URL.createObjectURL(file);
      setArtPreview(url);
    } else {
      setArtPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!artFile) {
      setMessage("Please choose an artwork file first.");
      return;
    }
    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(artFile);
      setUploadedUrl(url);
      setMessage("Artwork uploaded successfully!");
    } catch (err: any) {
      setMessage(err?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage("Name and email are required.");
      return;
    }
    if (!uploadedUrl) {
      setMessage("Please upload your artwork before submitting.");
      return;
    }
    try {
      setMessage("Thank you! Your submission has been received.");
    } catch (err: any) {
      setMessage(err?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text-purple">
            {brandName}: Artwork Submission
          </h1>
          <p className="text-white/70 mt-2">Share your creativity with us.</p>
        </div>

        <div className="creative-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Upload Artwork</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-white/80"
              />
              {artPreview && (
                <div className="mt-4">
                  <img
                    src={artPreview}
                    alt="Artwork preview"
                    className="rounded-xl border border-white/20 max-h-64 object-contain mx-auto"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || !artFile}
                className="mt-4 creative-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : uploadedUrl ? "Re-upload" : "Upload Artwork"}
              </button>
              {uploadedUrl && (
                <p className="text-green-400 text-sm mt-2 break-all">Uploaded: {uploadedUrl}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full creative-btn"
              >
                Submit
              </button>
            </div>

            {message && (
              <p className="text-center text-sm text-white/80">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndianCreativeStarSubmission;

