import React from "react";

// Додай картинки для кожного пакета в /public/images/tariffs/
const packages = [
  {
    name: "STARTER",
    price: 0,
    duration: "Автоматично",
    tokens: 0,
    img: "/images/tariffs/starter.png",
    description: "Безкоштовно. Активується автоматично, не дає бонусів.",
  },
  {
    name: "BASIC",
    price: 10,
    duration: "18 днів",
    tokens: 5,
    img: "/images/tariffs/basic.png",
    description: "5 токенів. Базовий рівень бонусів.",
  },
  {
    name: "PRO",
    price: 30,
    duration: "18 днів",
    tokens: 15,
    img: "/images/tariffs/pro.png",
    description: "15 токенів. Збільшені бонуси.",
  },
  {
    name: "PREMIUM",
    price: 60,
    duration: "18 днів",
    tokens: 30,
    img: "/images/tariffs/premium.png",
    description: "30 токенів. Максимальні бонуси.",
  },
  {
    name: "VIP",
    price: 100,
    duration: "18 днів",
    tokens: 60,
    img: "/images/tariffs/vip.png",
    description: "60 токенів. Елітний пакет.",
  },
];

export default function PackagesBlock() {
  return (
    <div className="bg-[#f9fbfd] min-h-screen py-12">
      <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <span role="img" aria-label="hourglass" className="text-4xl">⏳</span>
        Виберіть свій пакет
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {packages.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center w-72 bg-white shadow rounded-2xl p-6 border hover:scale-105 transition-all duration-200"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-16 h-16 mb-2 object-contain select-none"
              draggable={false}
              loading="lazy"
            />
            <div className="font-bold text-xl mb-1">{p.name}</div>
            <div className="text-2xl font-bold mb-1">{p.price ? `$${p.price}` : "Безкоштовно"}</div>
            <div className="mb-2 text-lg">{p.duration}</div>
            <div className="mb-3 text-blue-600 font-bold">{p.tokens ? `${p.tokens} токенів` : "Без токенів"}</div>
            <div className="text-gray-500 text-center text-xs mb-2">{p.description}</div>
            <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-7 py-2 rounded-xl font-bold shadow transition-all">
              {p.price === 0 ? "Початковий" : "Обрати"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
