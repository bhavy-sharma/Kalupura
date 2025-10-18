// index.js (or your main file)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http'; // ✅ http server ke liye
import Router from './routes/kalupra.route.js';
import { connectDB } from './database/db.index.js';
import { setupSocket } from './socket/index.js'; // ✅ socket setup function

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS enable karo (Express ke liye)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/kalupra', Router);



// HTTP server banayein (Express + HTTP)
const server = http.createServer(app);

// Socket.IO attach karein
setupSocket(server);

// DB connect aur server start
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});