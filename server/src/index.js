import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import healthRouter from "./routes/health.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);

app.get("/", (req, res) => {
  res.json({
    name: "Stratara API",
    note: "Scaffold only — no product endpoints yet. Feature routes are blocked on the Stages 1-9 MVP boundary spec.",
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] Stratara API listening on port ${PORT}`);
  });
}

start();
