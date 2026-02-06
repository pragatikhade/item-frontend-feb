import { useState } from "react";
import "./App.css";

//const API = "http://localhost:8080/api/items";
const API = "https://<tera-railway-url>/api/items";

function App() {

  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    description: ""
  });

  const [id, setId] = useState("");
  const [singleItem, setSingleItem] = useState(null);
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");

  // ✅ Create
  const createItem = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: Number(form.id),
          name: form.name,
          price: Number(form.price),
          description: form.description
        })
      });

      if (!res.ok) {
        setMsg("Create failed");
        return;
      }

      setMsg("Item created successfully");
    } catch (e) {
      setMsg("Server error");
    }
  };

  // ✅ Get by id
  const getById = async () => {
    try {
      const res = await fetch(`${API}/${id}`);

      if (!res.ok) {
        setSingleItem(null);
        setMsg("Item not found");
        return;
      }

      const data = await res.json();
      setSingleItem(data);
      setMsg("");
    } catch (e) {
      setMsg("Server error");
    }
  };

  // ✅ Get all
  const getAll = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setMsg("Error loading items");
    }
  };

  return (
    <div className="container">

      <h2>Item Management UI</h2>

      {/* Create */}
      <div className="card">
        <h3>Create Item</h3>

        <input
          placeholder="Id"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button onClick={createItem}>Create</button>
      </div>

      {/* Get by id */}
      <div className="card">
        <h3>Get Item By Id</h3>

        <input
          placeholder="Enter id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={getById}>Get By Id</button>

        {singleItem && (
          <div className="result">
            <p>ID : {singleItem.id}</p>
            <p>Name : {singleItem.name}</p>
            <p>Price : {singleItem.price}</p>
            <p>Description : {singleItem.description}</p>
          </div>
        )}
      </div>

      {/* Get all */}
      <div className="card">
        <h3>All Items</h3>

        <button onClick={getAll}>Get All</button>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.price}</td>
                <td>{it.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {msg && <p>{msg}</p>}

    </div>
  );
}

export default App;
