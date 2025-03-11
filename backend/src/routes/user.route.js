import express from "express";
import {
  signUp,
  logIn,
  getUsers,
  updateAddress,
} from "../controllers/user.controller.js";
import {
  getAllBooks,
  getRecentBooks,
  getSingleBook,
  rateBook,
  Search,
} from "../controllers/books.controller.js";
import { authentication } from "../lib/auth.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/get-user", authentication, getUsers);
router.put("/update-address", authentication, updateAddress);

router.get("/get-all-books", getAllBooks);
router.get("/get-recent-books", getRecentBooks);
router.get("/get-book/:id", getSingleBook);
router.get("/search", Search);

router.put("/rateBook", authentication, rateBook);
router.get("/rateBook", authentication, rateBook);
export default router;
