import express from 'express';
const app = express();
import path from "path";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorhandeler";
import routeNotFound from "./middlewares/routNotFound";
import Routes from "./routes";

// middleWares
app.use(express.json());

app.use(cors({
  origin: ['*', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Welcome to Digital Competency Platform server..!");
});

// Routes
app.use("/api/v1", Routes);

// route not found
app.use(routeNotFound);

// global error handler
app.use(globalErrorHandler);

export default app;
