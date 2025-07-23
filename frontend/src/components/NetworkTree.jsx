import React from "react";
import { myTeam } from "../data/network";
import TreeNode from "./TreeNode";

export default function NetworkTree() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Хедер профілю */}
      <div className="flex items-center mb-8 p-6 bg-white rounded-lg shadow">
        <img src={myTeam.avatar} alt={myTeam.name} className="w-20 h-20 rounded-full border-4 border-blue-500 mr-6" />
        <div>
          <h2 className="text-2xl font-bold">{myTeam.name}</h2>
          <div className="text-gray-500">ID {myTeam.id}</div>
        </div>
      </div>
      {/* Дерево */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-2xl font-bold mb-6">My Team</div>
        <div className="flex flex-col items-center">
          <TreeNode user={{ ...myTeam, children: myTeam.users }} />
        </div>
      </div>
    </div>
  );
}
