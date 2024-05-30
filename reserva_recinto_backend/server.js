import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js';
import recintoRoutes from './routes/recintoRoutes.js';

const app = express();
app.use(express.json())
dotenv.config();
conectarDB()



app.use("/api/usuarios", usuarioRoutes)
app.use("/api/recinto", recintoRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}}`);
})