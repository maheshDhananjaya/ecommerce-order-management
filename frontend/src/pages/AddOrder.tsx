import { useState } from "react";
import { addOrder } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
  const [orderDescription, setDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await addOrder({ orderDescription, productIds: [1] });
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Order</h2>

      <input
        placeholder="Order Description"
        value={orderDescription}
        onChange={(e) => setDesc(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>Book Order</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}
