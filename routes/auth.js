// backend/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Usuario from "../models/usuario.js";
dotenv.config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "secreto123";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ mensaje: "Datos incompletos" });

    let existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: "Email ya registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const usuario = new Usuario({ nombre, email, password: hashed });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "7d" });
    res.json({ usuario: { id: usuario._id, nombre, email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error en registro" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "7d" });
    res.json({ 
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error en login" });
  }
});

export default router;
