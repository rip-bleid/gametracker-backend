import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const router = express.Router();

// Registrar usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const nuevoUsuario = new Usuario({ nombre, email, contraseña });
    await nuevoUsuario.save();

    res.json({ mensaje: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login usuario
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    if (usuario.contraseña !== contraseña)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, "secreto123", {
      expiresIn: "2h",
    });

    res.json({ mensaje: "Login exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, contraseña } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  if (usuario.contraseña !== contraseña)
    return res.status(401).json({ mensaje: "Contraseña incorrecta" });

  // 🧠 Crear token
  const token = jwt.sign({ id: usuario._id }, "secreto123", { expiresIn: "2h" });
  res.json({ mensaje: "Login exitoso", token });
});


export default router;
