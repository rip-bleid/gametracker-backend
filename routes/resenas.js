import express from "express";
import Reseña from "../models/resena.js";

const router = express.Router();

// Obtener reseñas por juego
router.get("/:juegoId", async (req, res) => {
  const reseñas = await Reseña.find({ juegoId: req.params.juegoId });
  res.json(reseñas);
});

// Crear reseña
router.post("/", async (req, res) => {
  try {
    const { juegoId, autor, texto, puntuacion } = req.body;

    if (!juegoId || !autor || !texto) {
      return res.status(400).json({ mensaje: "Campos incompletos" });
    }

    const nuevaReseña = new Reseña({
      juegoId,
      autor,
      texto,
      puntuacion
    });

    await nuevaReseña.save();
    res.json(nuevaReseña);

  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al crear reseña" });
  }
});

export default router;
