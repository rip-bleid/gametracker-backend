import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: String,
  plataforma: String,
  año: Number,
  imagen: String,
  horasJugadas: Number,
  terminado: Boolean,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" } // 🧩 relación con usuario
});

export default mongoose.model("Juego", juegoSchema);
