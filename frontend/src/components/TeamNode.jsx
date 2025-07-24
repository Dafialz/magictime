import React from "react";

export default function TeamNode({ member }) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Кружок з ім’ям або аватаркою */}
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full mb-2 text-white font-bold text-xl shadow border-4"
        style={{
          background: member.color || "#38b2ac",
          borderColor: member.status === "Inactive" ? "#f59e42" : "#90cdf4",
        }}
        title={member.name}
      >
        {member.avatar
          ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
          )
          : member.name?.[0] || "U"}
      </div>
      <div className="font-semibold">{member.name}</div>
      <div className="text-gray-400 text-xs">ID {member.id}</div>
      {member.status && (
        <div className={`text-xs mt-1 font-semibold ${member.status === "Inactive" ? "text-orange-500" : "text-green-600"}`}>
          {member.status}
        </div>
      )}
      {member.investment && (
        <div className="text-xs text-blue-800">Інвестиція: ${member.investment}</div>
      )}
      {member.joinDate && (
        <div className="text-gray-400 text-xs">З {member.joinDate}</div>
      )}
      {/* Діти-реферали */}
      {member.children && member.children.length > 0 && (
        <>
          <div className="h-8 border-l-2 border-blue-200"></div>
          <div className="flex gap-6 mt-2">
            {member.children.map((child, idx) => (
              <TeamNode member={child} key={child.id || idx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
