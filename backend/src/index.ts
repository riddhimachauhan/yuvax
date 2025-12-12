import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/database";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { attachAnnotationWSS } from "./ws/annotations";
import cookieParser from "cookie-parser";


// Routes
import apiRoutes from "./routes/index";

// Middlewares
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

// Utils
import { connectRedis } from "./lib/redis";
import {rateLimiterMiddleware} from "./middlewares/rateLimiterMiddleware";

dotenv.config();
const app: Express = express();

const startServer = async () => {
  try {
    // 2. Connect to Redis before anything else
    await connectRedis();
    await connectDB();
    // --- Middleware ---
    // Security middleware
    app.use(helmet());
    
    // Compression middleware
    app.use(compression());

    app.use(cookieParser());


    app.use(rateLimiterMiddleware);
    
    // CORS middleware
    app.use(
      cors({
        origin: [
          "https://yuvax.tech",
          "http://localhost:3001",
          "http://localhost:3000",
        ],
        credentials: true,
      })
    );
    
    // Logging middleware
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
    }
    
    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

     app.use(rateLimiterMiddleware);

    // --- Routes ---
    app.use("/api", apiRoutes);

    console.log("✅ Routes configured");

    // Health check route
    app.get("/", (req: Request, res: Response) => {
      res.json({
        success: true,
        message: "🚀 Yuvax Backend API is working",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      });
    });

    // Error handling middleware (must be last)
    app.use(notFoundHandler);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);
    attachAnnotationWSS(server);
    server.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`🔌 WS endpoint: ws://localhost:${PORT}/ws/annotations`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      try {
        console.log(`\n${signal} received. Closing resources...`);
        await disconnectDB();
        server.close(() => {
          console.log("🛑 HTTP server closed");
          process.exit(0);
        });
      } catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start the server:", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
