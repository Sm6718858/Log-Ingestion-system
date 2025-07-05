*** Log Ingestion and Querying System ***

A full-stack developer assignment simulating a real-world developer tool used for monitoring and debugging applications. The app allows ingestion of logs via an API and querying/filtering those logs via an intuitive frontend dashboard.

***Project Structure***
log-ingestion-system/
├── Backend/
│   ├── server.js
│   ├── utils/
│   │   └── fileHandler.js
│   └── logs.json
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── useDebounce.js
│   └── index.html
└── README.md


***Live Features***

✅ Functionalities Implemented
 -> Log Ingestion (via POST /logs) <-

-> Log Query UI
-> Full-text search on message
-> Filter by:
        - Log level (error, warn, info)
        - Resource ID
        - Timestamp range
        - Combine filters for advanced querying
        - Interactive Filtering
-> Real-time updates as user types (debounced)
-> No reloads or submit button needed
-> Log Ingestion Form
        - Submit new logs from UI
-> Instant feedback on success/error
-> Visual Differentiation
        - Color-coded log entries based on level (error, warn, info)
-> Responsive Design
        - Works on mobile, tablet, and desktop



***Tech Stack***
Frontend	 -> React, TailwindCSS, Vite
Backend	     -> Node.js, Express.js
Database	 -> JSON File via fs module

***Setup Instructions***
 (1) -> Backend Setup <-
    cd Backend
    npm install
    node index.js

    Runs on: http://localhost:5000

    Make sure logs.json exists as: []

  (2) -> Frontend Setup <-
    cd Frontend
    npm install
    npm run dev

    Runs on: http://localhost:5173

***API Endpoints***
    POST /logs
{
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": { "parentResourceId": "server-5678" }
}

    GET /logs

 message
 level
 resourceId
 timestamp_start
 timestamp_end

 ----------------------------------------------------------------------

 **Author**
Shivam Mishra
Frontend & Backend Developer
LinkedIn | sm6718858@gmail.com