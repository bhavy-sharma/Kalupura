import experss from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Router from './routes/kalupra.route';
import connectDB from './database/db.index';

const app = experss();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(experss.json());
app.use('/api/v1/kalupra',Router);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})