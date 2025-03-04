"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import TestCaseList from "../components/TestCaseList";
import TestCaseForm from "../components/TestCaseForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [testCases, setTestCases] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) fetchTestCases();
  }, [token]);

  const fetchTestCases = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/testcases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTestCases(response.data);
    } catch (error) {
      toast.error("Failed to fetch test cases");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <Navbar setToken={setToken} />
      <div className="container mx-auto p-6">
        <TestCaseForm token={token} fetchTestCases={fetchTestCases} />
        <TestCaseList testCases={testCases} />
      </div>
    </div>
  );
}
