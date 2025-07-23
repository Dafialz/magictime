import React from "react";

const statusColors = {
  active: "bg-blue-400",
  inactive: "bg-orange-300",
};

export default function TreeNode({ user }) {
  return (
    <div className="flex flex-col items-center mx-4">
      <div className={`rounded-full w-16 h-16 flex items-center justify-center text-2xl text-white ${statusColors[user.status] || "bg-blue-400"}`}>
        U
      </div>
      <div className="text-center mt-2 font-bold">{user.name}</div>
      <div className="text-center text-xs text-gray-500">ID {user.id}</div>
      {user.investment && (
        <div className="text-xs text-gray-600">Investment: ${user.investment}</div>
      )}
      {user.status === "inactive" && user.joined && (
        <div className="text-xs text-gray-400">ID Inactive<br />Joined {user.joined}</div>
      )}
      {user.children && user.children.length > 0 && (
        <div className="flex justify-center mt-4">
          {user.children.map(child => (
            <TreeNode key={child.id} user={child} />
          ))}
        </div>
      )}
    </div>
  );
}
