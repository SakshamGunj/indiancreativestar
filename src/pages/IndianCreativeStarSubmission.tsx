import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { addSubmission } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const IndianCreativeStarSubmission = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !file) {
      toast({ title: "Missing info", description: "Please fill name, email, and add artwork." });
      return;
    }
    try {
      setIsSubmitting(true);
      const artworkUrl = await uploadToCloudinary(file);
      const result = await addSubmission({ name: name.trim(), email: email.trim(), artworkUrl, source: "web" });
      if (result.success) {
        toast({ title: "Submitted!", description: "Your artwork has been submitted successfully." });
        setName("");
        setEmail("");
        setFile(null);
        setPreviewUrl("");
      } else {
        throw new Error("Failed to save submission.");
      }
    } catch (err: any) {
      toast({ title: "Submission failed", description: err?.message || "Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-purple animate-text-glow">Indian Creative Star</h1>
          <p className="text-white/70 mt-2">Submit your artwork with your name and email</p>
        </div>

        <Card className="creative-card">
          <CardHeader>
            <CardTitle className="text-gradient">Artwork Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <Label htmlFor="artwork">Artwork Image</Label>
                <Input id="artwork" type="file" accept="image/*" onChange={onFileChange} />
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="mt-4 rounded-xl border border-white/20 max-h-72 object-contain w-full" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-white/60 text-sm">PNG, JPG up to ~10MB</p>
                <Button type="submit" disabled={isSubmitting} className="creative-btn">
                  {isSubmitting ? "Submitting…" : "Submit Artwork"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndianCreativeStarSubmission;

