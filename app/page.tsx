"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("subscriptions") || "[]");
    setSubs(data);
  }, []);

  const total = subs.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-xl">${total}</p>
    </div>
  );
}
