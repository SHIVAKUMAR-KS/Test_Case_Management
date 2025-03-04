export default function Navbar({ setToken }) {
    return (
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">Test Case Management</h1>
        <input
          type="text"
          placeholder="Enter Token"
          onChange={(e) => setToken(e.target.value)}
          className="p-2 text-black"
        />
      </nav>
    );
  }
  