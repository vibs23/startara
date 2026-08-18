import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import healthRouter from "./routes/health.js";
import recommendationsRouter from "./routes/recommendations.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/recommendations", recommendationsRouter);

app.get("/", (req, res) => {
  res.json({
    name: "Stratara API",
    note: "POC only — ranked/explainable scoring against sample data. Not built against a real MVP boundary spec yet; do not treat as the product.",
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] Stratara API listening on port ${PORT}`);
  });
}

start();
