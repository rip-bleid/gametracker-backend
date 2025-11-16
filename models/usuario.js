import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    fotoPerfil: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Usuario", usuarioSchema);
