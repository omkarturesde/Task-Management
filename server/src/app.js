import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./db/index.js";
import authRoutes from "./routes/user.routes.js";
import cors from "cors";
const app = express();

dotenv.config();
connectToDb();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
