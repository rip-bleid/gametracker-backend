import mongoose from "mongoose"; 

import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  portada: { type: String },
  puntuacion: { type: Number, min: 0, max: 5 },
});

export default mongoose.model("Juego", juegoSchema);
