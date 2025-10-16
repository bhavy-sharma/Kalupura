import express from 'express';  // ✅ correct spelling
import dotenv from 'dotenv';
import cors from 'cors';
import Router from './routes/kalupra.route.js';
import { connectDB } from './database/db.index.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/kalupra', Router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
