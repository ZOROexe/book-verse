import express from "express";
import { authentication } from "../lib/auth.js";
import {
  addCart,
  removeCart,
  viewCart,
} from "../controllers/cart.controller.js";

const router = express.Router();
router.put("/add/:id", authentication, addCart);
router.put("/remove/:id", authentication, removeCart);
router.get("/", authentication, viewCart);

export default router;
