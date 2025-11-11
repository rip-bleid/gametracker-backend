import mongoose from "mongoose";

const reseñaSchame = new mongoose.Schema({
    juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  autor: { type: String, required: true },
  texto: { type: String },
  puntuacion: { type: Number, min: 0, max: 5 },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("reseña", reseñaSchame)