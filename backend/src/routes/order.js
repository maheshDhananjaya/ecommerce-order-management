const express = require("express");
const router = express.Router();
const controller = require("../controllers/order");

router.get("/order", controller.getOrders);
router.get("/product", controller.getProducts);
router.get("/order/:id", controller.getOrderById);
router.post("/orders", controller.addOrder);
router.put("/orders/:id", controller.updateOrder);
router.delete("/orders/:id", controller.deleteOrder);

module.exports = router;
