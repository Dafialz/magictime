import React from 'react';

const faqs = [
  { q: 'What is a token?', a: 'Tokens are credits you use in our system for access and bonuses.' },
  { q: 'How does the referral program work?', a: 'Earn $ and tokens up to 4 levels when your referrals purchase packages.' },
  { q: 'Can I switch packages mid-subscription?', a: 'Yes, upgrade at any time; balance will prorate automatically.' },
  { q: 'What payment methods are supported?', a: 'We support TON and USDT via MyTonWallet integration.' }
];

export default function FAQ() {
  return (
    <section className="py-12 bg-gray-800 text-white px-4">
      <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div key={i}>
            <h4 className="font-semibold">{f.q}</h4>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
