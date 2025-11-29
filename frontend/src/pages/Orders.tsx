import { useEffect, useState } from "react";
import { getOrders, orderDelete } from "../api";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    const data = await getOrders();
    setIsLoading(false);
    setOrders(data);
  };

  const filtered = orders.filter(
    (o) =>
      o.id.toString().includes(search) ||
      o.orderdescription.toLowerCase().includes(search.toLowerCase())
  );

  const handelDelete = (id: number) => async () => {
    await orderDelete(id);
    load();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 4 }}>
      <h2>Order Management</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Search by ID or Description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 4 }}
        />

        <button onClick={() => navigate("/add")}>Book Order</button>
      </div>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Created Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.orderdescription}</td>
              <td>{new Date(o.createdat).toLocaleString()}</td>
              <td>
                {
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handelDelete(o.id)}
                  >
                    Delete
                  </span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
