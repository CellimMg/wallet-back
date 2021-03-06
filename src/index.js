import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";
import { connectDB } from "./datasource/datasource.js";

dotenv.config({
    path: "../.env"
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(transactionRouter);

connectDB().then(_ => {
    app.listen(process.env.PORT, () => {
        console.log("Servidor rodando na porta 5000!");
    });
}).catch(err => console.error("Não foi possível conectar ao servidor!\n\n" + err));




