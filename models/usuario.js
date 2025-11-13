import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  contraseña: String,
});

export default mongoose.model("Usuario", usuarioSchema);
      