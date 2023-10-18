import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import waitingListRoutes from "./routes/waitingList.routes";
import { investmentOpportunities } from "./data/investmentOpportunities";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI in the environment variables.");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

app.use("/api", waitingListRoutes);

app.get("/api/investments", (req, res) => {
  res.json(investmentOpportunities);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
