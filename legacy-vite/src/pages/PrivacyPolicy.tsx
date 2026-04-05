import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/')}
          className="bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto pt-20">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy – Daami Event</h1>
        <p className="text-white/80 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-4 text-white/90">
          <p>
            This Privacy Policy explains how Daami Event ("we", "us", or "our") collects, uses,
            discloses, and protects your information when you use our website, participate in our
            events, or interact with our services.
          </p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Personal Information:</strong> Name, email, phone/WhatsApp, address, age, and identity details when required for contest eligibility.</li>
            <li><strong>Payment Information:</strong> Transaction details from payment providers (we do not store full card/UPI details).</li>
            <li><strong>Content Submissions:</strong> Artwork, media, and materials you upload for events/contests.</li>
            <li><strong>Usage Data:</strong> Device, browser, IP address, pages visited, referral source.</li>
            <li><strong>Cookies & Tracking:</strong> Cookies, pixels, and similar technologies to improve experience and analytics.</li>
          </ul>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Process registrations, payments, and participation in events/contests.</li>
            <li>Communicate updates, results, support, and policy changes.</li>
            <li>Promote events and showcase user submissions with permission/license.</li>
            <li>Improve our website, services, and user experience.</li>
            <li>Ensure safety, prevent fraud, and comply with legal obligations.</li>
          </ul>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Service Providers:</strong> Payment gateways, hosting, cloud storage, analytics, communication tools.</li>
            <li><strong>Legal Compliance:</strong> When required by law, regulation, or valid legal process.</li>
            <li><strong>Event Partners:</strong> With your consent when required for co-hosted events.</li>
          </ul>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">4. Data Retention</h2>
          <p>We retain personal data for as long as necessary for the purposes described, or as required by applicable laws and tax/accounting rules.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">5. Your Rights</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Access, update, or correct your information.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Request deletion subject to legal/legitimate interests.</li>
            <li>Opt-out of marketing communications at any time.</li>
          </ul>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">6. Security</h2>
          <p>We use reasonable technical and organizational measures to protect your information. However, no method of transmission or storage is 100% secure.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">7. International Users</h2>
          <p>Your data may be processed and stored in India or other countries where our service providers operate. By using our services, you consent to such transfers.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">8. Children’s Privacy</h2>
          <p>We do not knowingly collect personal information from children under 13 without parental consent. If you believe a child provided data without consent, contact us to remove it.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">9. Cookies</h2>
          <p>We use cookies to remember preferences, enable core functionality, and analyze traffic. You can control cookies through your browser settings. Disabling cookies may affect functionality.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">10. Changes to this Policy</h2>
          <p>We may update this Privacy Policy from time to time. Updates will be posted here with a revised date.</p>
        </section>

        <section className="space-y-2 text-white/90 mt-8">
          <h2 className="text-xl font-semibold">11. Contact Us</h2>
          <p>Email: <a className="text-blue-300 underline" href="mailto:daamievent@gmail.com">daamievent@gmail.com</a></p>
          <p>Phone/WhatsApp: +91 96359 08358</p>
          <p>Address: Majitar, Sikkim – 737136, India</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
