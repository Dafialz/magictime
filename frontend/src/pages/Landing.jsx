// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Magic Time</h1>
        <p className="text-lg max-w-xl mx-auto">
          Invest your time, earn financial freedom. Earn $ and tokens up to 4 levels when your referrals purchase packages.
        </p>
        <Link
          to="/register"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Реєстрація
        </Link>
      </header>
      <section className="px-8 pb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">FAQ</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h3 className="font-bold text-xl">What is a token?</h3>
            <p>Tokens are credits you use in our system for access and bonuses.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl">How does the referral program work?</h3>
            <p>
              Earn $ and tokens up to 4 levels when your referrals purchase packages.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl">Can I switch packages mid‑subscription?</h3>
            <p>Yes, upgrade at any time; balance will prorate automatically.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
