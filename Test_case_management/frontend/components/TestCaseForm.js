import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TestCaseForm({ token, fetchTestCases }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Token required!");
    
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/testcases`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Test Case Added");
      setTitle("");
      setDescription("");
      fetchTestCases();
    } catch (error) {
      toast.error("Failed to add test case");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 mb-2 w-full" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 mb-2 w-full"></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Test Case</button>
    </form>
  );
}
