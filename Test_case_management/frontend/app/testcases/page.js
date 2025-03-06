'use client';
import { useEffect, useState } from 'react';

export default function TestCases() {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    fetch('/api/testcases', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(data => setTestCases(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Test Cases</h1>
      <ul className="mt-4 space-y-2">
        {testCases.map(tc => (
          <li key={tc._id} className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold">{tc.title}</h2>
            <p className="text-sm">{tc.description}</p>
            <p className={`text-xs ${tc.status === 'Passed' ? 'text-green-600' : 'text-red-600'}`}>{tc.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
