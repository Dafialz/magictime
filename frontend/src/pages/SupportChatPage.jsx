import React, { useEffect, useState, useContext, useRef } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function SupportChatPage() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const chatRef = useRef();

  // Автоматичне оновлення чату кожні 3 секунди
  useEffect(() => {
    // Функція для завантаження історії
    const fetchMessages = () => {
      api.get('/support/my').then(res => setMessages(res.data));
    };

    fetchMessages(); // Завантажити одразу при відкритті

    const interval = setInterval(fetchMessages, 3000); // Кожні 3 сек

    return () => clearInterval(interval); // Очистити інтервал при виході зі сторінки
  }, []);

  // Пролистати вниз при додаванні нового повідомлення
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post('/support', { message: text });
    setMessages(msgs => [...msgs, data]);
    setText('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow bg-white">
      <div className="text-lg font-bold mb-4">Чат підтримки</div>
      <div className="h-80 overflow-y-auto bg-gray-50 rounded p-3 mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <b>{msg.sender === 'user' ? 'Я' : 'Адмін'}:</b> {msg.message}
            </div>
          </div>
        ))}
        <div ref={chatRef}></div>
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Введіть повідомлення..."
        />
        <button className="bg-blue-600 text-white px-5 rounded" type="submit">
          Надіслати
        </button>
      </form>
    </div>
  );
}
