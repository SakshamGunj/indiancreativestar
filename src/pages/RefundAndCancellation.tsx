import React from "react";

const RefundAndCancellation: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Refund and Cancellation Policy</h1>
      <p className="text-white/80 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6 text-white/90">
        <p>
          This is a placeholder policy. Provide your fee structure, non-refundable components,
          processing timelines, and any conditions for cancellations/changes so we can finalize
          this page.
        </p>

        <h2 className="text-xl font-semibold">What We Need From You</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Products/services covered (registrations, tickets, subscriptions, etc.)</li>
          <li>Which fees are refundable vs non-refundable</li>
          <li>Time window for cancellation and refund eligibility</li>
          <li>Processing time to issue refunds (e.g., 5-7 business days)</li>
          <li>Method of refund (original payment method, wallet/credit)</li>
          <li>Contact channel to request a refund/cancellation</li>
          <li>Special cases (duplicate payments, failed transactions)</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundAndCancellation;

