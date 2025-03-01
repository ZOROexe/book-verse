import express from "express";
import { authentication } from "../lib/auth.js";
import {
  addFav,
  getFavs,
  removeFav,
} from "../controllers/favourites.controller.js";

const router = express.Router();

router.put("/add/:id", authentication, addFav);
router.delete("/remove/:id", authentication, removeFav);
router.get("/", authentication, getFavs);

export default router;
