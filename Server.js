import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import juegosRoutes from "./routes/juegos.js";
import reseñasRoutes from "./routes/reseñas.js";

dotenv.config();
const app = express(); 

app.use(cors());
app.use(express.json());

app.use("/api/juegos", juegosRoutes)
app.use("/api/reseñas", reseñasRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log(err)); 

app.listen(5000, () => console.log("Servidor corriendo en el puerto 5000"));