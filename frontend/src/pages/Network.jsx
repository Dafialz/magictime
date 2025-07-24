import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TeamNode from "../components/TeamNode";

export default function Network() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://magictime.onrender.com/api/myteam")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("API error:", err);
        setUser(null);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  const referralLink = user.referralLink || `https://magictime.com/ref/${user.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Силка скопійована!");
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
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
        <a href="#" className="ml-4 text-blue-600 font-medium hover:underline">
          View my rewards
        </a>
      </div>

      {/* Team Tree */}
      <div className="bg-white rounded-2xl p-8 shadow">
        <h2 className="text-xl font-bold mb-8">My Team</h2>
        <div className="flex flex-col items-center">
          <TeamNode member={user} />
        </div>
      </div>
    </div>
  );
}
