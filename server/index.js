import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import UserRoutes from "./routes/User.js";
import AdminRoutes from "./routes/Admin.js";

dotenv.config();

// Initialize Express and HTTP server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

const allowedOrigins = [
  "http://localhost:3000", // Admin frontend
  "http://localhost:3001", // Client frontend
];
// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello developers",
  });
});

// API Routes
app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRoutes);
app.use("/qrcodes", express.static("public/qrcodes"));

// Error Handling Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

// MongoDB Connection
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};

// Socket.IO for Real-Time Updates
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Watch for MongoDB Changes
const watchDatabaseChanges = async () => {
  mongoose.connection.once("open", () => {
    console.log("MongoDB connection open. Watching changes...");

    const db = mongoose.connection.db;

    if (!db) {
      console.error("Database connection is not established.");
      return;
    }

    const entryCollection = db.collection("rfid_logs_entry");
    const exitCollection = db.collection("rfid_logs_exit");

    // Watch for entry log changes
    entryCollection.watch().on("change", (change) => {
      console.log("Change detected in entry logs:", change);
      io.emit("entryLogUpdated");
    });

    // Watch for exit log changes
    exitCollection.watch().on("change", (change) => {
      console.log("Change detected in exit logs:", change);
      io.emit("exitLogUpdated");
    });
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error in MongoDB connection:", err);
  });
};

// Start the Server
const startServer = async () => {
  try {
    connectDB();
    watchDatabaseChanges(); // Start watching database changes
    httpServer.listen(8080, () => console.log("Server running at port 8080"));
  } catch (err) {
    console.error(err);
  }
};

startServer();
