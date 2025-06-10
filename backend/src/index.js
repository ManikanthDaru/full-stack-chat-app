// const express = require('express'); -> "type": "commonjs"
// to use the import syntax we should specify
// "type": "module" in package.json
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // default import
import cors from "cors";

import { connectDB } from "./config/db.js";
import { app, server } from "./config/socket.js";

import authRoutes from "./routes/auth.route.js"; // named import
import messageRoutes from "./routes/message.route.js";

import path from "path";

// create an http server
// const app = express();

// .env file is used to manage environment variables
dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// a middleware that converts body/payload into JSON format
app.use(express.json());
// allows you to parse cokkies
// cookieParser is a middleware that parses cookies attached to the client request object
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// authentication middleware
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

// run the http server
server.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});
