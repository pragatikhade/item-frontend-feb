import { useState } from "react";

//const API = "https://osteopathically-unhuzzaed-julian.ngrok-free.dev/api/items";
//const API = "https://item-api-production-ab3d.up.railway.app";
//const API = "http://localhost:8080/api/
//const API = "https://osteopathically-unhuzzaed-julian.ngrok-free.dev/api/items";

 const API = "https://osteopathically-unhuzzaed-julian.ngrok-free.dev/api/items";


function App() {

  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    description: ""
  });

  const [id, setId] = useState("");
  const [singleItem, setSingleItem] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ Create
  const createItem = async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "ngrok-skip-browser-warning": "true"
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

      await res.json();

      setForm({
        id: "",
        name: "",
        price: "",
        description: ""
      });

      setMsg("Item created successfully");

    } catch (e) {
      setMsg("Server error");
    }
  };

  // ✅ Get by id
  const getById = async () => {
    try {
     const res = await fetch(`${API}/${id}`, {
       headers: {
         "ngrok-skip-browser-warning": "true"
       }
     });

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

      {msg && <p>{msg}</p>}

    </div>
  );
}

export default App;
