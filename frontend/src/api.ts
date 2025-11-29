const API_URL = "http://localhost:4000/api";

export const getOrders = () =>
  fetch(`${API_URL}/order`).then((res) => res.json());

export const addOrder = (order: any) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
