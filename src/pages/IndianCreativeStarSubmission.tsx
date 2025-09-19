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
  const [whatsapp, setWhatsapp] = useState("");
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
    if (!name.trim() || !email.trim() || !whatsapp.trim() || !file) {
      toast({ title: "Missing info", description: "Please fill name, email, WhatsApp, and add artwork." });
      return;
    }
    try {
      setIsSubmitting(true);
      const artworkUrl = await uploadToCloudinary(file);
      const result = await addSubmission({ name: name.trim(), email: email.trim(), artworkUrl, source: "web", whatsapp: whatsapp.trim() });
      if (result.success) {
        toast({ title: "Submitted!", description: "Your artwork has been submitted successfully." });
        setName("");
        setEmail("");
        setWhatsapp("");
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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-12 text-center">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-40" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.2) 45%, rgba(0,0,0,0) 70%)" }} />
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="gradient-text-purple">Indian Creative Star</span>
          </h1>
          <p className="text-white/70 mt-3 text-lg">Submit your artwork with your details below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
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
                    <div className="md:col-span-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input id="whatsapp" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="e.g. 9800xxxxxx" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="artwork">Artwork Image</Label>
                    <Input id="artwork" type="file" accept="image/*" onChange={onFileChange} />
                    {previewUrl && (
                      <div className="mt-4 rounded-xl border border-white/20 p-3 bg-white/5">
                        <img src={previewUrl} alt="Preview" className="rounded-lg max-h-80 object-contain w-full" />
                      </div>
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

          <div className="lg:col-span-2 space-y-4">
            <div className="creative-card p-6">
              <h3 className="text-xl font-semibold mb-2">Tips for a great submission</h3>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li><span className="text-white">Use high-quality, well-lit photos.</span></li>
                <li><span className="text-white">Center the artwork and avoid glare.</span></li>
                <li><span className="text-white">Accepted formats: JPG/PNG.</span></li>
              </ul>
            </div>
            <div className="creative-card p-6">
              <h3 className="text-xl font-semibold mb-2">Need help?</h3>
              <p className="text-white/70">Message us on WhatsApp after submitting if you face any issues.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianCreativeStarSubmission;

