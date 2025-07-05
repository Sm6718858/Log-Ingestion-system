*** Log Ingestion and Querying System ***

A full-stack developer assignment simulating a real-world developer tool used for monitoring and debugging applications. The app allows ingestion of logs via an API and querying/filtering those logs via an intuitive frontend dashboard.


---

## ✅ Live Features

- Log Ingestion (via `POST /logs`)
- Log Query UI
  - Full-text search on message
  - Filter by:
    - Log level (error, warn, info)
    - Resource ID
    - Timestamp range
  - Combine filters for advanced querying
- Interactive Filtering (debounced input)
- No page reloads for filtering
- Log Ingestion Form
  - Submit new logs from UI
  - Instant success/error feedback
- Visual Differentiation
  - Color-coded log entries based on level
- Responsive Design (mobile, tablet, desktop)

---

## 🛠 Tech Stack

| Layer    | Stack                    |
| -------- | ------------------------ |
| Frontend | React, TailwindCSS, Vite |
| Backend  | Node.js, Express.js      |
| Database | JSON File via Node's fs  |

---

## ⚙️ Setup Instructions
clone it -> git clone https://github.com/Sm6718858/Log-Ingestion-system.git
### 🖥 Backend Setup

```bash
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
sm6718858@gmail.com
