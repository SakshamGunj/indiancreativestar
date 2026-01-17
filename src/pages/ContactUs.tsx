import React from "react";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen text-white px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us – Daami Event</h1>
      <p className="text-white/80 mb-4">We'd love to hear from you.</p>

      <div className="space-y-6 text-white/90">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-white/10 p-4 bg-white/5">
            <h2 className="font-semibold mb-2">Email</h2>
            <p>
              <a className="text-blue-300 underline" href="mailto:daamievent@gmail.com">daamievent@gmail.com</a>
            </p>
          </div>
          <div className="rounded-lg border border-white/10 p-4 bg-white/5">
            <h2 className="font-semibold mb-2">Phone/WhatsApp</h2>
            <p>+91 96359 08358</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-semibold mb-2">Address</h2>
          <p>Majitar, Sikkim – 737136, India</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-semibold mb-2">Support Hours</h2>
          <p>Monday–Saturday, 10:00 AM – 7:00 PM IST</p>
        </div>

        <div className="rounded-lg border border-white/10 p-4 bg-white/5">
          <h2 className="font-semibold mb-2">Socials</h2>
          <p>
            Instagram: <a className="text-blue-300 underline" href="https://www.instagram.com/daamievent/" target="_blank" rel="noreferrer">@daamievent</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

