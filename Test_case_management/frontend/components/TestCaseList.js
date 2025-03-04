export default function TestCaseList({ testCases }) {
    return (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Test Cases</h2>
        <ul>
          {testCases.length === 0 ? <p>No test cases available.</p> : testCases.map((testCase) => (
            <li key={testCase._id} className="border p-4 mb-2">
              <h2 className="font-bold">{testCase.title}</h2>
              <p>{testCase.description}</p>
              <p className="text-sm text-gray-500">Status: {testCase.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  