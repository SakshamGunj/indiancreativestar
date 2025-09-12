import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Loader2, Plus, Minus } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface GeneratePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    uid: string;
    name: string;
    email: string;
    phone: string;
  };
  onPassesGenerated: (passes: any[]) => void;
}

const PassForm = ({ passNumber, onUpdate, passData, isUserPass = false }) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h4 className="font-semibold">{isUserPass ? "Your Pass" : `Guest Pass #${passNumber}`}</h4>
      <div className="space-y-2">
        <Label className="text-white">Name</Label>
        <Input
          value={passData.name}
          onChange={(e) => onUpdate(passNumber - 1, "name", e.target.value)}
          placeholder="Name of the person"
          className="bg-gray-800 border-gray-600 text-white"
          disabled={isUserPass}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Phone Number</Label>
        <Input
          value={passData.phone}
          onChange={(e) => onUpdate(passNumber - 1, "phone", e.target.value)}
          placeholder="Phone number of the person"
          className="bg-gray-800 border-gray-600 text-white"
          disabled={isUserPass}
        />
      </div>
    </div>
  );
};

export function GeneratePassModal({
  isOpen,
  onClose,
  user,
  onPassesGenerated,
}: GeneratePassModalProps) {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [guestDetails, setGuestDetails] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);

  const handleNumberOfGuestsChange = (amount) => {
    const newCount = numberOfGuests + amount;
    if (newCount >= 0 && newCount <= 4) {
      setNumberOfGuests(newCount);
      const newGuestDetails = [...guestDetails];
      while (newGuestDetails.length < newCount) {
        newGuestDetails.push({ name: "", phone: "" });
      }
      setGuestDetails(newGuestDetails.slice(0, newCount));
    }
  };

  const handleGuestDataChange = (index, field, value) => {
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index][field] = value;
    setGuestDetails(newGuestDetails);
  };

  const handleGeneratePasses = async () => {
    setIsGenerating(true);
    try {
      const allPasses = [
        { name: user.name, phone: user.phone, token: uuidv4(), status: 'valid' },
        ...guestDetails.map(guest => ({ ...guest, token: uuidv4(), status: 'valid' }))
      ];
      const passCollection = collection(db, 'eventPasses');
      const promises = allPasses.map(pass => {
        return addDoc(passCollection, {
          userId: user.uid,
          eventName: "Prize Distribution Ceremony",
          ...pass,
          createdAt: serverTimestamp(),
        });
      });

      await Promise.all(promises);

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [85.6, 54],
      });

      for (let i = 0; i < allPasses.length; i++) {
        const pass = allPasses[i];
        const qrCodeData = await QRCode.toDataURL(pass.token);

        if (i > 0) {
          doc.addPage();
        }

        // Add gradient background
        doc.setFillColor(30, 30, 30); // Dark background
        doc.rect(0, 0, 85.6, 54, "F");

        // Add colorful header background
        doc.setFillColor(139, 92, 246); // Purple
        doc.rect(0, 0, 85.6, 12, "F");

        // Add secondary color stripe
        doc.setFillColor(236, 72, 153); // Pink
        doc.rect(0, 10, 85.6, 2, "F");

        // Add main title - Sikkim Creative Star
        doc.setTextColor(255, 255, 255); // White text
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("SIKKIM CREATIVE STAR", 42.8, 7, { align: "center" });

        // Add subtitle - Art Competition
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("Art Competition", 42.8, 9.5, { align: "center" });

        // Add event title with background
        doc.setFillColor(251, 191, 36); // Yellow background
        doc.rect(5, 14, 75.6, 6, "F");
        
        doc.setTextColor(0, 0, 0); // Black text
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("INVITE ONLY - PRIZE DISTRIBUTION CEREMONY", 42.8, 17.5, { align: "center" });

        // Add decorative border
        doc.setDrawColor(139, 92, 246); // Purple border
        doc.setLineWidth(0.5);
        doc.rect(2, 2, 81.6, 50);

        // Add pass details with styling
        doc.setTextColor(255, 255, 255); // White text
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text("PASS HOLDER:", 8, 25);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6);
        doc.text(`${pass.name}`, 8, 27);
        
        if (pass.phone) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7);
          doc.text("PHONE:", 8, 30);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(6);
          doc.text(`${pass.phone}`, 8, 32);
        }

        // Add decorative elements
        doc.setFillColor(236, 72, 153); // Pink
        doc.circle(75, 8, 1.5, "F");
        doc.circle(10, 8, 1.5, "F");
        
        doc.setFillColor(251, 191, 36); // Yellow
        doc.circle(75, 6, 1, "F");
        doc.circle(10, 6, 1, "F");

        // Add QR code with border
        doc.setFillColor(255, 255, 255); // White background for QR
        doc.rect(55, 22, 25, 25, "F");
        doc.addImage(qrCodeData, "JPEG", 56, 23, 23, 23);

        // Add QR label
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(5);
        doc.setFont("helvetica", "normal");
        doc.text("SCAN QR CODE", 67.5, 49, { align: "center" });

        // Add event details
        doc.setTextColor(251, 191, 36); // Yellow
        doc.setFontSize(5);
        doc.setFont("helvetica", "bold");
        doc.text("Event Date: 14th September 2025", 8, 36);
        doc.text("Time: 11:00 AM", 8, 38);
        doc.text("Venue: Sundar Resort, Majitar, Sikkim - 737136", 8, 40);
        
        // Add footer
        doc.setTextColor(200, 200, 200);
        doc.setFontSize(4);
        doc.setFont("helvetica", "normal");
        doc.text("Valid for Prize Distribution Ceremony Only", 42.8, 51, { align: "center" });
      }
      doc.save("event-passes.pdf");

      onPassesGenerated(allPasses);
      onClose();
    } catch (error) {
      console.error("Error generating passes:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Generate Event Passes
          </DialogTitle>
          <DialogDescription>
            Generate passes for the "Prize Distribution Ceremony" event.
          </DialogDescription>
        </DialogHeader>
        {step === 1 ? (
          <div className="space-y-4">
            <Label className="text-white text-center block">How many guest passes do you want to generate? (Max 4)</Label>
            <p className="text-white/70 text-sm text-center">You will automatically get 1 pass for yourself + up to 4 guest passes</p>
            <div className="flex items-center justify-center space-x-4">
              <Button onClick={() => handleNumberOfGuestsChange(-1)} size="icon" variant="outline" className="text-black">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-bold">{numberOfGuests}</span>
              <Button onClick={() => handleNumberOfGuestsChange(1)} size="icon" variant="outline" className="text-black">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={onClose} className="text-black">
                Cancel
              </Button>
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {/* User's own pass */}
              <PassForm
                key="user"
                passNumber={1}
                passData={{ name: user.name, phone: user.phone }}
                onUpdate={() => {}} // No update needed for user pass
                isUserPass={true}
              />
              {/* Guest passes */}
              {guestDetails.map((pass, index) => (
                <PassForm
                  key={index}
                  passNumber={index + 2}
                  passData={pass}
                  onUpdate={(passIndex, field, value) => handleGuestDataChange(index, field, value)}
                />
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} disabled={isGenerating} className="text-black">
                Back
              </Button>
              <Button onClick={handleGeneratePasses} disabled={isGenerating} className="bg-gradient-to-r from-creative-yellow to-creative-orange hover:from-creative-orange hover:to-creative-yellow text-black font-semibold">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Passes"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}