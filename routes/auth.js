import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const router = express.Router();

// 🔹 Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const hashed = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre, email, contraseña: hashed });
    await nuevoUsuario.save();

    res.json({ mensaje: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const valido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valido) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, "secreto123", {
      expiresIn: "2h",
    });

    res.json({ mensaje: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
