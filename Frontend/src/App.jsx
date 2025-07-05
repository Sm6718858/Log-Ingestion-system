import { useEffect, useState } from "react";
import { getLogs, postLog } from "./api";
import useDebounce from "./useDebounce"; 

function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  const debouncedFilters = useDebounce(filters, 500); 

  const fetchLogs = async () => {
    const res = await getLogs(debouncedFilters);
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, [debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newLog = {
      level: formData.get("level"),
      message: formData.get("message"),
      resourceId: formData.get("resourceId"),
      timestamp: formData.get("timestamp"),
      traceId: formData.get("traceId"),
      spanId: formData.get("spanId"),
      commit: formData.get("commit"),
      metadata: {
        parentResourceId: formData.get("parentResourceId"),
      },
    };

    try {
      await postLog(newLog);
      alert("Log added successfully!");
      e.target.reset();
      fetchLogs();
    } catch (err) {
      alert("Failed to add log");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-center mb-6"> Log Query Dashboard</h1>
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">🔎 Interactive Filter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            name="message"
            value={filters.message}
            onChange={handleFilterChange}
            placeholder="Search Message"
            className="p-2 border rounded"
          />
          <select
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
          </select>
          <input
            name="resourceId"
            value={filters.resourceId}
            onChange={handleFilterChange}
            placeholder="Resource ID"
            className="p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="timestamp_start"
            value={filters.timestamp_start}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="timestamp_end"
            value={filters.timestamp_end}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <form onSubmit={handleLogSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">📝 Ingest New Log</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="level" placeholder="Level (error/warn/info)" required className="p-2 border rounded w-full" />
          <input name="message" placeholder="Message" required className="p-2 border rounded w-full" />
          <input name="resourceId" placeholder="Resource ID" required className="p-2 border rounded w-full" />
          <input type="datetime-local" name="timestamp" required className="p-2 border rounded w-full" />
          <input name="traceId" placeholder="Trace ID" required className="p-2 border rounded w-full" />
          <input name="spanId" placeholder="Span ID" required className="p-2 border rounded w-full" />
          <input name="commit" placeholder="Commit Hash" required className="p-2 border rounded w-full" />
          <input name="parentResourceId" placeholder="Parent Resource ID" required className="p-2 border rounded w-full" />
        </div>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-700 transition w-full sm:w-auto">
          Submit Log
        </button>
      </form>
      <div className="space-y-3">
        {logs.map((log, idx) => (
          <div
            key={idx}
            className={`p-3 border-l-4 shadow-sm rounded ${
              log.level === "error"
                ? "border-red-500 bg-red-100"
                : log.level === "warn"
                ? "border-yellow-500 bg-yellow-100"
                : "border-blue-500 bg-blue-100"
            }`}
          >
            <p className="font-semibold text-sm text-gray-700">
              <b>{log.level.toUpperCase()}</b> - {new Date(log.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-900">{log.message}</p>
            <small className="text-gray-600">Resource: {log.resourceId}</small>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No logs found matching the filters.</p>
        )}
      </div>
    </div>
  );
}

export default App;
