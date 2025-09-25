import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-white/80 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-white/90">
        <p>
          This page is a placeholder. Please provide your organization name, legal entity,
          registered address, and governing law/jurisdiction to complete this page. We will
          replace the placeholders and tailor the clauses to your operations.
        </p>

        <h2 className="text-xl font-semibold">Key Sections To Be Finalized</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Eligibility and user obligations</li>
          <li>Account, submissions, and content ownership/license</li>
          <li>Payments, fees, and taxes</li>
          <li>Event/contest rules and disqualification grounds</li>
          <li>Intellectual property and acceptable use</li>
          <li>Privacy and data processing references</li>
          <li>Disclaimers, limitation of liability, indemnity</li>
          <li>Termination and suspension</li>
          <li>Governing law, dispute resolution, and venue</li>
          <li>Contact details for notices</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;

