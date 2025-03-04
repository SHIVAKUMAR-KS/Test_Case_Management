import express from "express";
import TestCase from "../models/TestCase.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Fetch all test cases
router.get("/", authMiddleware, async (req, res) => {
  try {
    const testCases = await TestCase.find();
    res.json(testCases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a test case
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const testCase = new TestCase({ title, description, status: "Pending" });
    await testCase.save();
    res.status(201).json(testCase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
