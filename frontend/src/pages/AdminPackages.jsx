import React, { useEffect, useState, useContext } from "react"; 
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Додаємо імпорт

export default function AdminPackages() {
  const { user } = useContext(AuthContext); // <-- Додаємо сюди

  // Якщо користувач не адмін, не показуємо адмінку
  if (!user || user.role !== "admin") return <div>Доступ заборонено</div>;

  const [pkgs, setPkgs] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", duration: "", tokens: "", description: "" });
  const [editId, setEditId] = useState(null);

  // Завантажити всі тарифи
  const fetchPackages = () => {
    axios.get("/api/admin/packages", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(res => setPkgs(res.data));
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line
  }, []);

  // Додати або оновити тариф
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/admin/packages/${editId}`, form, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
        setEditId(null);
      } else {
        await axios.post("/api/admin/packages", form, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });
      }
      setForm({ name: "", price: "", duration: "", tokens: "", description: "" });
      fetchPackages();
    } catch (err) {
      alert("Помилка при збереженні!");
    }
  };

  // Почати редагування
  const startEdit = (pkg) => {
    setForm({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      tokens: pkg.tokens,
      description: pkg.description || ""
    });
    setEditId(pkg._id);
  };

  // Видалити тариф
  const removePackage = async (id) => {
    if (!window.confirm("Видалити тариф?")) return;
    await axios.delete(`/api/admin/packages/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    fetchPackages();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Тарифи (Packages)</h2>
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-2">
        <input placeholder="Назва" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Ціна ($)" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input placeholder="Тривалість (днів)" type="number" value={form.duration} onChange={e=>setForm({...form, duration:e.target.value})} required />
        <input placeholder="Токени" type="number" value={form.tokens} onChange={e=>setForm({...form, tokens:e.target.value})} required />
        <input placeholder="Опис" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white rounded p-2">{editId ? "Оновити" : "Додати"}</button>
      </form>
      <div>
        {pkgs.map(pkg => (
          <div key={pkg._id} className="border p-2 rounded mb-2 flex justify-between items-center">
            <div>
              <b>{pkg.name}</b> | ${pkg.price} | {pkg.duration} днів | {pkg.tokens} токенів <br />
              <small>{pkg.description}</small>
            </div>
            <div>
              <button className="mr-2" onClick={() => startEdit(pkg)}>✏️</button>
              <button onClick={() => removePackage(pkg._id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
