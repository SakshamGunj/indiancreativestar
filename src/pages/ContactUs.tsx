import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-white/80 mb-4">We'd love to hear from you.</p>

      <div className="space-y-6 text-white/90">
        <p className="text-white/80">
          This page is a placeholder. Share your official email, phone/WhatsApp number,
          business address, support hours, and social links to complete this page.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/10 p-4 bg-white/5">
            <h2 className="font-semibold mb-2">Email</h2>
            <p>example@yourdomain.com</p>
          </div>
          <div className="rounded-lg border border-white/10 p-4 bg-white/5">
            <h2 className="font-semibold mb-2">Phone</h2>
            <p>+91-00000-00000</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-semibold mb-2">Address</h2>
          <p>Company Name, Street, City, State, PIN, Country</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-semibold mb-2">Support Hours</h2>
          <p>Mon–Fri, 10:00–18:00 IST</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

