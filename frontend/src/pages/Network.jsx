import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Network() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/myteam")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div>Loading...</div>;

  // Формуємо реферальну силку:
  const referralLink = user.referralLink || `https://magictime.com/ref/${user.id}`;

  // Функція для копіювання та красивого повідомлення:
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Силка скопійована!");
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* ToastContainer для toast повідомлень */}
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Profile Card */}
      <div className="flex items-center gap-6 bg-white rounded-2xl px-8 py-6 shadow mb-8">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-16 h-16 rounded-full border-4 border-sky-400 object-cover"
        />
        <div>
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-gray-500">{user.status}</div>
        </div>
        <button
          className="ml-auto bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700"
          onClick={handleCopy}
        >
          Copy my referral link
        </button>
        <a
          href="#"
          className="ml-4 text-blue-600 font-medium hover:underline"
        >
          View my rewards
        </a>
      </div>

      {/* Team Tree */}
      <div className="bg-white rounded-2xl p-8 shadow">
        <h2 className="text-xl font-bold mb-8">My Team</h2>
        <div className="flex flex-col items-center">
          {/* Main User */}
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-sky-400 object-cover"
            />
            <div className="font-semibold text-lg mt-2">{user.name}</div>
            <div className="text-gray-400">ID {user.id}</div>
          </div>
          <div className="h-8 border-l-2 border-gray-200"></div>
          <div className="flex gap-20">
            {(user.team || []).map((member, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mb-2 text-white font-bold text-xl"
                  style={{ background: member.color || "#53A9FA" }}
                >
                  {member.name?.[0] || "U"}
                </div>
                <div className="font-medium">{member.name}</div>
                <div className="text-gray-400 text-sm">ID {member.id}</div>
                {member.investment && (
                  <div className="text-xs">Investment: ${member.investment}</div>
                )}
                {member.status === "Inactive" && (
                  <div className="text-orange-500 font-semibold text-xs">
                    ID Inactive
                  </div>
                )}
                {member.joinDate && (
                  <div className="text-gray-400 text-xs">
                    Joined {member.joinDate}
                  </div>
                )}
                {member.children && (
                  <>
                    <div className="h-8 border-l-2 border-gray-200"></div>
                    <div className="flex gap-10">
                      {member.children.map((child, j) => (
                        <div key={j} className="flex flex-col items-center text-center">
                          <div
                            className="w-11 h-11 flex items-center justify-center rounded-full mb-1 text-white font-bold text-lg"
                            style={{ background: child.color || "#F7A334" }}
                          >
                            {child.name?.[0] || "U"}
                          </div>
                          <div className="font-medium text-sm">{child.name}</div>
                          <div className="text-gray-400 text-xs">ID {child.id}</div>
                          {child.status === "Inactive" && (
                            <div className="text-orange-500 font-semibold text-xs">
                              ID Inactive
                            </div>
                          )}
                          {child.joinDate && (
                            <div className="text-gray-400 text-xs">
                              Joined {child.joinDate}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
