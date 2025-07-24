import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/10 shadow-md backdrop-blur-lg">
        <div className="flex items-center gap-3">
          {/* Logo placeholder */}
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            ✨
          </div>
          <span className="font-extrabold text-2xl text-white tracking-wide">Magic Time</span>
        </div>
        <nav className="flex gap-8 text-white text-lg">
          <a className="hover:underline" href="#">Дашборд</a>
          <a className="hover:underline" href="#">Структура</a>
          <a className="hover:underline" href="#">Пакети</a>
          <a className="hover:underline" href="#">Досягнення</a>
          <a className="hover:underline" href="#">Новини</a>
          <a className="hover:underline" href="#">Підтримка</a>
        </nav>
        <button className="bg-red-500 px-5 py-2 rounded-xl text-white font-bold shadow hover:bg-red-600 transition">Вийти</button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-10 max-w-6xl mx-auto w-full gap-8">
        {/* Welcome & Progress */}
        <section className="w-full bg-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-xl">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow">
            Д
          </div>
          {/* Info */}
          <div className="flex flex-col gap-1">
            <span className="text-xl text-white font-semibold">Вітаємо, Давід!</span>
            <span className="text-white/80">Ваш рівень: <span className="font-bold text-yellow-300">2</span></span>
            {/* Progress bar */}
            <div className="w-64 bg-white/20 rounded-full h-3 mt-2">
              <div className="bg-yellow-400 h-3 rounded-full" style={{width: "55%"}}></div>
            </div>
            <span className="text-xs text-white/50 mt-1">До рівня 3 залишилось: 45%</span>
          </div>
          {/* Referral link */}
          <div className="ml-auto flex flex-col items-end">
            <span className="text-white/70 text-xs">Ваше реф. посилання:</span>
            <div className="flex items-center gap-2 mt-1">
              <input className="bg-white/20 text-white px-3 py-1 rounded-xl w-64" value="https://magic.time/u/david" readOnly />
              <button className="bg-blue-500 px-3 py-1 rounded-lg text-white text-lg hover:bg-blue-600 transition">📋</button>
            </div>
          </div>
        </section>

        {/* Main cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Balance Card */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-2 items-start shadow-xl min-w-[220px]">
            <span className="text-white/60">Мій баланс</span>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-1">$</span>
              54.90
              <span className="bg-yellow-300 text-blue-900 rounded-full w-8 h-8 flex items-center justify-center ml-2">MAGT</span>
              120.3
            </div>
          </div>
          {/* Package Card */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-2 items-start shadow-xl min-w-[220px]">
            <span className="text-white/60">Мій пакет</span>
            <div className="flex items-center gap-2 text-lg text-white">
              <span className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center mr-1">📦</span>
              VIP Silver
            </div>
            <span className="text-white/40 text-xs mt-2">Діє до: 20.09.2025</span>
          </div>
          {/* Structure Card */}
          <div className="bg-white/10 rounded-2xl p-6 flex flex-col gap-2 items-start shadow-xl min-w-[220px]">
            <span className="text-white/60">Моя структура</span>
            <div className="flex items-center gap-2 text-lg text-white">
              <span className="bg-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-1">👥</span>
              43 учасники
            </div>
            <button className="bg-white/10 mt-3 px-4 py-2 rounded-xl text-white text-sm hover:bg-blue-500 transition">Переглянути дерево</button>
          </div>
        </section>

        {/* News & Achievements */}
        <section className="flex flex-col md:flex-row gap-6 w-full">
          {/* News */}
          <div className="flex-1 bg-white/10 rounded-2xl p-6 shadow-xl">
            <span className="text-white/60 font-bold">Новини</span>
            <ul className="mt-3 space-y-2 text-white text-sm list-disc pl-5">
              <li>Запущено новий тарифний план “VIP Silver”.</li>
              <li>Додано новий розділ “Досягнення”.</li>
              <li>Оновлено умови реферальної програми.</li>
            </ul>
          </div>
          {/* Achievements */}
          <div className="flex-1 bg-white/10 rounded-2xl p-6 shadow-xl">
            <span className="text-white/60 font-bold">Досягнення</span>
            <div className="flex gap-3 mt-4">
              <span className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl">🏆</span>
              <span className="bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl">⭐</span>
              <span className="bg-blue-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl">🎯</span>
            </div>
          </div>
        </section>

        {/* Transaction history (demo) */}
        <section className="w-full bg-white/10 rounded-2xl p-6 shadow-xl">
          <span className="text-white/60 font-bold">Історія транзакцій</span>
          <table className="w-full mt-3 text-white text-sm">
            <thead>
              <tr className="text-white/70">
                <th className="text-left font-normal">Дата</th>
                <th className="text-left font-normal">Операція</th>
                <th className="text-left font-normal">Сума</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>21.07.2025</td>
                <td>Поповнення балансу</td>
                <td><span className="bg-green-600 rounded px-2">+$20.00</span></td>
              </tr>
              <tr>
                <td>20.07.2025</td>
                <td>Нарахування MAGT</td>
                <td><span className="bg-yellow-300 text-blue-900 rounded px-2">+14 MAGT</span></td>
              </tr>
              <tr>
                <td>19.07.2025</td>
                <td>Виведення коштів</td>
                <td><span className="bg-red-600 rounded px-2">-$15.00</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
