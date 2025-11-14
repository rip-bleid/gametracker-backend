import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagen: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  genero: { type: String, default: null },
  resena: { type: String, default: null },
  rating: { type: Number, default: 0 },
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", default: null }
});

export default mongoose.model("Juego", juegoSchema);
