import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminSupportPage() {
  const [chats, setChats] = useState([]);             // всі чати (юзери)
  const [selectedUser, setSelectedUser] = useState(null); // вибраний юзер
  const [messages, setMessages] = useState([]);       // повідомлення
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");           // рядок пошуку

  // 1. Завантажити всі чати користувачів
  useEffect(() => {
    api.get("/support/chats").then(res => setChats(res.data));
  }, []);

  // 2. Коли вибрали юзера — завантажити історію чату
  useEffect(() => {
    if (selectedUser) {
      api.get(`/support/${selectedUser._id}`).then(res => setMessages(res.data));
    }
  }, [selectedUser]);

  // 3. Відправити відповідь
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post(`/support/${selectedUser._id}`, { message: text });
    setMessages(msgs => [...msgs, data]);
    setText('');
  };

  // 4. Фільтрований список юзерів за пошуком (по name або email)
  const filteredChats = chats.filter(user =>
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase()))
  );

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
