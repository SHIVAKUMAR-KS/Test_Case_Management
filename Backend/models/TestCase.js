import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Passed", "Failed"], default: "Pending" },
});

export default mongoose.model("TestCase", testCaseSchema);
