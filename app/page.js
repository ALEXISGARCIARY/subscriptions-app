"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [subs, setSubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Entretenimiento",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("subscriptions") || "[]");
    setSubs(data);
  }, []);

  const saveData = (data) => {
    localStorage.setItem("subscriptions", JSON.stringify(data));
    setSubs(data);
  };

  const addSub = () => {
    const newData = [
      ...subs,
      {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        category: form.category,
      },
    ];

    saveData(newData);
    setShowForm(false);
    setForm({ name: "", price: "", category: "Entretenimiento" });
  };

  const total = subs.reduce((acc, s) => acc + s.price, 0);

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Suscripciones</h1>

      <h2 style={{ marginTop: 10 }}>Total: ${total}</h2>

      {subs.map((s) => (
        <div
          key={s.id}
          style={{
            background: "#fff",
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{s.name}</strong>
          <div>${s.price}</div>
          <small>{s.category}</small>
        </div>
      ))}

      <button
        onClick={() => setShowForm(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "black",
          color: "white",
          fontSize: 30,
        }}
      >
        +
      </button>

      {showForm && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "white",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <h3>Añadir suscripción</h3>

          <input
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <input
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={{ width: "100%", marginBottom: 10 }}
          />

          <button onClick={addSub}>Guardar</button>
        </div>
      )}
    </div>
  );
}
