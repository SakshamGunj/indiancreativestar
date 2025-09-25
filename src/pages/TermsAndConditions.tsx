import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms & Policies – Daami Event</h1>
      <p className="text-white/80 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4 text-white/90">
        <h2 className="text-xl font-semibold">1. Legal/Business Information</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Organization/Entity Name:</strong> Daami Event</li>
          <li><strong>Type of Business:</strong> Event Management Company (Online & Offline Events)</li>
          <li><strong>Registered Address:</strong> Majitar, Sikkim – 737136, India</li>
          <li><strong>Official Email:</strong> <a className="text-blue-300 underline" href="mailto:daamievent@gmail.com">daamievent@gmail.com</a></li>
          <li><strong>Contact Number/WhatsApp:</strong> +91 9635908358</li>
          <li><strong>Support Hours:</strong> Monday–Saturday, 10:00 AM – 7:00 PM IST</li>
          <li><strong>Response SLA:</strong> Within 24–48 business hours</li>
          <li><strong>Governing Law:</strong> Laws of India; disputes subject to Sikkim jurisdiction</li>
          <li><strong>Registration Identifiers:</strong> To be updated when GSTIN/CIN is available</li>
        </ul>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">2. Terms and Conditions</h2>
        <p><strong>Eligibility:</strong> Participants must be at least 13 years old. For paid registrations, users under 18 require parental/guardian consent. Events are open to participants worldwide unless specified otherwise.</p>
        <p><strong>Account & Submissions:</strong> By submitting content (artwork, writing, performance, etc.), you grant Daami Event a non-exclusive, royalty-free license to display, promote, and publish your work for event-related activities and promotions. Ownership remains with the creator.</p>
        <p><strong>Prohibited Conduct:</strong> No plagiarism, abusive content, hate speech, illegal material, or violation of intellectual property rights.</p>
        <p><strong>IP & Brand Use:</strong> Use of Daami Event’s name, brand, or logos requires prior written consent.</p>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">3. Fees, Payments & Taxes</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Services Covered:</strong> Event registrations, tickets, online/offline contests, subscriptions, and merchandise (if offered).</li>
          <li><strong>Payment Terms:</strong> Full advance payment required during registration.</li>
          <li><strong>Taxes:</strong> Applicable GST (if registered) will be charged separately.</li>
          <li><strong>Recurring Charges:</strong> Not applicable unless specified for subscriptions.</li>
        </ul>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">4. Contest/Event Rules</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Fair Participation:</strong> Each entry must follow the event’s guidelines.</li>
          <li><strong>Grounds for Disqualification:</strong> False information, offensive submissions, plagiarism, or violation of event rules.</li>
          <li><strong>Final Authority:</strong> Daami Event reserves the right to accept/reject entries at its discretion.</li>
        </ul>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">6. Disclaimers & Liability</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Daami Event is not liable for delays, cancellations, or interruptions due to force majeure events (natural disasters, technical failures, strikes, etc.).</li>
          <li>Participation is voluntary, and attendees are responsible for their safety and conduct at events.</li>
          <li>Our liability is limited to the amount paid for registration/tickets.</li>
        </ul>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">7. Termination/Suspension</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Accounts or entries may be suspended or terminated for violating these Terms.</li>
          <li>Event access may be denied to any participant engaging in misconduct.</li>
        </ul>
      </section>

      <section className="space-y-4 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">8. Privacy & Cookies</h2>
        <p>Please refer to our Privacy Policy. We may use cookies and tracking technologies on our website/event pages to improve user experience.</p>
      </section>

      <section className="space-y-2 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">9. Effective Date</h2>
        <p>This policy is effective as of the date published and may be updated at any time.</p>
      </section>

      <section className="space-y-2 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">10. Contact Us</h2>
        <p><strong>Email:</strong> <a className="text-blue-300 underline" href="mailto:daamievent@gmail.com">daamievent@gmail.com</a></p>
        <p><strong>Phone/WhatsApp:</strong> +91 9635908358</p>
        <p><strong>Business Address:</strong> Majitar, Sikkim – 737136, India</p>
        <p><strong>Instagram:</strong> <a className="text-blue-300 underline" href="https://www.instagram.com/daamievent/" target="_blank" rel="noreferrer">Daami Event</a></p>
      </section>
    </div>
  );
};

export default TermsAndConditions;

