import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connDb } from "./lib/db.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import favRoute from "./routes/favourites.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`server running at ${process.env.PORT}`);
  connDb();
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/favourites", favRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello!!");
});
