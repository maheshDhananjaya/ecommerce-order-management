const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/";

export const getOrders = () =>
  fetch(`${API_URL}api/order`).then((res) => res.json());

export const addOrder = (order: any) =>
  fetch(`${API_URL}api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

export const getProducts = () =>
  fetch(`${API_URL}api/products`).then((res) => res.json());

export const orderDelete = (id: number) =>
  fetch(`${API_URL}api/orders/${id}`, {
    method: "DELETE",
  });
