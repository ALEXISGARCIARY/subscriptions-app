"use client";

import { useEffect, useState } from "react";

const colors = {
  Entretenimiento: "#111111",
  Música: "#E11D48",
  Productividad: "#6366F1",
  Otros: "#10B981",
};

export default function Home() {
  const [subs, setSubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
  name: "",
  price: "",
  category: "Entretenimiento",
  image: ""
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
    if (!form.name || !form.price) return;

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

      <div
        style={{
          background: "#fff",
          padding: 15,
          borderRadius: 15,
          marginTop: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontSize: 14, color: "#666" }}>Total mensual</div>
        <div style={{ fontSize: 26, fontWeight: "bold" }}>${total}</div>
      </div>

      {/* Lista */}
      {subs.map((s) => (
        <div
          key={s.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            padding: 15,
            borderRadius: 12,
            marginTop: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: colors[s.category] || "#ccc",
              }}
            />
            <div>
              <div style={{ fontWeight: "bold" }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#777" }}>
                {s.category}
              </div>
            </div>
          </div>

          <div style={{ fontWeight: "bold" }}>${s.price}</div>
        </div>
      ))}

      {/* Botón + */}
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
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        +
      </button>

      {/* Modal */}
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
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{ width: "100%", marginBottom: 10 }}
          />

          <input
            placeholder="Precio"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            style={{ width: "100%", marginBottom: 10 }}
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            style={{ width: "100%", marginBottom: 10 }}
          >
            <option>Entretenimiento</option>
            <option>Música</option>
            <option>Productividad</option>
            <option>Otros</option>
          </select>

          <button onClick={addSub}>Guardar</button>
        </div>
      )}
    </div>
  );
}
