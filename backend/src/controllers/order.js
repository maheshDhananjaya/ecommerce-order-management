const db = require("../db");

exports.getOrders = async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM orders ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM products ORDER BY id ASC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
    if (!rows[0]) return res.status(404).json({ message: "Order not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const { orderDescription, productIds = [] } = req.body;
    if (!orderDescription)
      return res.status(400).json({ message: "orderDescription required" });

    const insertOrder = await db.query(
      "INSERT INTO orders(orderDescription, createdAt) VALUES($1, NOW()) RETURNING id, orderDescription, createdAt",
      [orderDescription]
    );
    const order = insertOrder.rows[0];

    if (Array.isArray(productIds) && productIds.length) {
      const insertPromises = productIds.map((pid) =>
        db.query(
          "INSERT INTO orderProductMap(orderId, productId) VALUES($1, $2) ON CONFLICT DO NOTHING",
          [order.id, pid]
        )
      );
      await Promise.all(insertPromises);
    }

    res.status(201).json({ message: "Order Created", order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderDescription } = req.body;
    if (!orderDescription)
      return res.status(400).json({ message: "orderDescription required" });

    await db.query("UPDATE orders SET orderDescription = $1 WHERE id = $2", [
      orderDescription,
      id,
    ]);
    res.json({ message: "Order Updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json({ message: "Order Removed" });
  } catch (err) {
    next(err);
  }
};
