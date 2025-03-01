import express from "express";
import { authentication } from "../lib/auth.js";
import {
  deleteBook,
  newBook,
  updateBook,
} from "../controllers/books.controller.js";
import { getAllOrder, updateOrder } from "../controllers/order.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = express.Router();

router.post("/new-book", authentication, verifyAdmin, newBook);
router.put("/update-book/:bookId", authentication, verifyAdmin, updateBook);
router.delete("/delete-book/:bookId", authentication, verifyAdmin, deleteBook);

router.get("/get-all-orders", authentication, verifyAdmin, getAllOrder);
router.put("/update-order/:id", authentication, verifyAdmin, updateOrder);

export default router;
