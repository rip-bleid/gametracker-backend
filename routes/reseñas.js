import express from "express";
import Reseña from "../models/reseña.js";

const router = express.Router();

// Obtener reseñas por juego
router.get("/:juegoId", async (req, res) => {
  const reseñas = await Reseña.find({ juegoId: req.params.juegoId });
  res.json(reseñas);
});

// Crear reseña
router.post("/", async (req, res) => {
  const nuevaReseña = new Reseña(req.body);
  await nuevaReseña.save();
  res.json(nuevaReseña);
});

export default router;
