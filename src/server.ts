import express, { application } from "express";
import dotenv from "dotenv"
import { testDbConnection } from "./config/database";
import applicationRoutes from './routes/applicationRoutes'
import authRoutes from "./routes/authRoutes"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;


const startServer = async () => {
   await  testDbConnection();

    app.use(express.json());
    app.use("/api/auth",authRoutes)
    app.use('/api', applicationRoutes)
   
    app.listen(PORT,()=>{
        console.log(`Server is running on https://localhost:${PORT}`);
    });
};

startServer();