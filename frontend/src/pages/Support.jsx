import React from "react";

export default function Support() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">Чат підтримки</h2>
      <div className="bg-white shadow rounded-lg p-6 max-w-lg w-full">
        <div className="mb-4 text-gray-500 text-center">
          Тут скоро зʼявиться онлайн-чат з нашою службою підтримки!
        </div>
        {/* Тут буде сам чат */}
      </div>
    </div>
  );
}
