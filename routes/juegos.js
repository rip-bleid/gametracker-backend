import express from "express";
import Juego from "../models/juego.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Obtener todos los juegos
router.get("/", async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

// Crear nuevo juego
router.post("/", async (req, res) => {
  const nuevoJuego = new Juego(req.body);
  await nuevoJuego.save();
  res.json(nuevoJuego);
});

// Editar juego
router.put("/:id", async (req, res) => {
  const actualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar juego
router.delete("/:id", async (req, res) => {
  await Juego.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Juego eliminado" });
});

const verificarToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(403).json({ mensaje: "Token no proporcionado" });
  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "secreto123");
    req.usuarioId = decoded.id;
    next();
  } catch {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};


export default router;
