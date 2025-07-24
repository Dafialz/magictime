import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";

export default function AdminSupportPage() {
  const [chats, setChats] = useState([]);             
  const [selectedUser, setSelectedUser] = useState(null); 
  const [messages, setMessages] = useState([]);       
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");           

  // Авто-скрол вниз
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Завантажити всі чати користувачів
  useEffect(() => {
    api.get("/support/chats").then(res => setChats(res.data));
  }, []);

  // Коли вибрали юзера — завантажити історію чату
  useEffect(() => {
    if (selectedUser) {
      api.get(`/support/${selectedUser._id}`).then(res => setMessages(res.data));
    }
  }, [selectedUser]);

  // Автоматичне оновлення чату кожні 3 секунди
  useEffect(() => {
    if (!selectedUser) return;
    const updateMessages = () => {
      api.get(`/support/${selectedUser._id}`).then(res => setMessages(res.data));
    };
    const interval = setInterval(updateMessages, 3000);
    updateMessages();
    return () => clearInterval(interval);
  }, [selectedUser]);

  // Відправити відповідь
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post(`/support/${selectedUser._id}`, { message: text });
    setMessages(msgs => [...msgs, data]);
    setText('');
  };

  // Фільтрований список юзерів за пошуком
  const filteredChats = chats.filter(user =>
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
  );

  // Формування статусу (online/offline/невідомий)
  function getUserStatus(user) {
    if (user.lastActive) {
      const last = new Date(user.lastActive);
      const now = new Date();
      const diffSec = (now - last) / 1000;
      if (diffSec < 60) return <span className="text-green-600 font-bold">● online</span>;
      if (diffSec < 600) return <span className="text-gray-500">був(ла) онлайн {Math.floor(diffSec / 60)} хв тому</span>;
      return <span className="text-gray-400">офлайн</span>;
    }
    return <span className="text-gray-400">статус невідомий</span>;
  }

  return (
    <div className="flex max-w-5xl mx-auto mt-10 shadow rounded bg-white h-[600px]">
      {/* Список чатів */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <div className="font-bold mb-2">Чати користувачів</div>
        <input
          className="w-full mb-3 px-2 py-1 border rounded"
          type="text"
          placeholder="Пошук по імені або email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filteredChats.length === 0 && <div>Немає чатів</div>}
        {filteredChats.map(user => (
          <div
            key={user._id}
            className={`cursor-pointer px-2 py-1 rounded mb-1 ${selectedUser?._id === user._id ? "bg-blue-100" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <b>{user.name || user.email}</b>
            <div className="text-xs text-gray-500">{user.email}</div>
            {/* Online/offline/невідомий статус */}
            <div className="text-xs mt-1">{getUserStatus(user)}</div>
          </div>
        ))}
      </div>
      {/* Чат */}
      <div className="flex-1 flex flex-col p-4">
        {!selectedUser ? (
          <div className="text-gray-500 m-auto">Виберіть чат для перегляду</div>
        ) : (
          <>
            <div className="font-bold mb-2">Чат з {selectedUser.name || selectedUser.email}</div>
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-2 mb-2">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg ${msg.sender === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <b>{msg.sender === 'admin' ? 'Я' : 'User'}:</b> {msg.message}
                  </div>
                </div>
              ))}
              {/* Авто-скрол до низу */}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Ваша відповідь..."
              />
              <button className="bg-blue-600 text-white px-5 rounded" type="submit">
                Надіслати
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
