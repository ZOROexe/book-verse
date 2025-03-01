import express from "express";
import { authentication } from "../lib/auth.js";
import { placeOrder, orderHistory } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", authentication, placeOrder);
router.get("/", authentication, orderHistory);

export default router;
