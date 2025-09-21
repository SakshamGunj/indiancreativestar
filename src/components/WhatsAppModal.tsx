import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, MessageCircle } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (whatsappNumber: string) => Promise<void>;
  isLoading?: boolean;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim()) {
      alert('Please enter your WhatsApp number');
      return;
    }
    await onSubmit(whatsappNumber.trim());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
        <DialogHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            WhatsApp Number Required
          </DialogTitle>
          <p className="text-gray-600 text-sm mt-2">
            We need your WhatsApp number for payment processing and important updates about the competition.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <Input
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="h-11 bg-gray-50 border-gray-200 rounded-xl text-sm"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 h-11 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Your number will be used for payment verification and competition updates only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppModal;