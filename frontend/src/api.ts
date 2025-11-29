const API_URL = "http://localhost:4000/api";

export const getOrders = () =>
  fetch(`${API_URL}/order`).then((res) => res.json());

export const addOrder = (order: any) =>
  fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

export const getProducts = () =>
  fetch(`${API_URL}/products`).then((res) => res.json());

export const orderDelete = (id: number) =>
  fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  });
