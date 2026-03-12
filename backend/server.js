import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import jobroutes from "./routes/jobroutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Portal is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobroutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});