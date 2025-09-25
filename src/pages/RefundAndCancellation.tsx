import React from "react";

const RefundAndCancellation: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy – Daami Event</h1>
      <p className="text-white/80 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <section className="space-y-4 text-white/90">
        <p><strong>Refunds:</strong> No refunds for cancellations made within <strong>48 hours of the event</strong>.</p>
        <p><strong>Refund Window:</strong> Cancellations before 48 hours of the event may be eligible for refund (subject to processing fees).</p>
        <p><strong>Refund Request Window:</strong> Participants can request a refund within <strong>7 working days</strong> from the date of payment/registration, subject to the above event timeline rule.</p>
        <p><strong>Refund Processing Time:</strong> Approved refunds will be processed within <strong>48 hours</strong>.</p>
        <p><strong>Refund Method:</strong> Same mode as original payment (wallet/UPI/card/bank).</p>
        <p><strong>Failed Transactions/Duplicate Payments:</strong> Will be verified and refunded within <strong>48 hours</strong> after verification.</p>
        <p><strong>Non-Refundable Fees:</strong> Service/processing charges, merchandise orders, and no-shows.</p>
      </section>

      <section className="space-y-2 text-white/90 mt-8">
        <h2 className="text-xl font-semibold">How to Request a Refund</h2>
        <p>Email us at <a className="text-blue-300 underline" href="mailto:daamievent@gmail.com">daamievent@gmail.com</a> with payment details and proof.</p>
      </section>
    </div>
  );
};

export default RefundAndCancellation;

