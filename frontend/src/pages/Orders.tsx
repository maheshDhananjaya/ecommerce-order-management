//ts-ignore
import React, { useEffect, useState } from "react";
import { getOrders } from "../api";
import { useNavigate } from "react-router-dom";

interface IOrder {
  id: number;
  orderdescription: string;
  createdat: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const filtered = orders.filter(
    (o) =>
      o.id.toString().includes(search) ||
      o.orderdescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Management</h2>

      <input
        placeholder="Search by ID or Description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => navigate("/add")}>Book Order</button>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Created Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.orderdescription}</td>
              <td>{new Date(o.createdat).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
