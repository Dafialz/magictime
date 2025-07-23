// frontend/src/data/network.js
export const myTeam = {
  id: 123456,
  name: "Roman Ivanov",
  avatar: "/images/roman.jpg", // заміни шлях на свою аватарку або залиш порожнім
  users: [
    {
      id: 234567,
      name: "User 1",
      status: "active",
      investment: 700,
      children: [],
    },
    {
      id: 345678,
      name: "User 2",
      status: "active",
      children: [
        {
          id: 456890,
          name: "User 4",
          status: "inactive",
          joined: "01 Apr, 2024",
          children: [],
        },
        {
          id: 678901,
          name: "User 5",
          status: "active",
          children: [],
        },
      ],
    },
    {
      id: 456789,
      name: "User 3",
      status: "active",
      children: [],
    },
  ],
};
