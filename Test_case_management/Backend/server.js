import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import testCaseRoutes from "./routes/testCases.js";

dotenv.config();
connectDB();
const app = express();  // No need to re-declare express
app.use(cors());
app.use(express.json());

app.use("/testcases", testCaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
