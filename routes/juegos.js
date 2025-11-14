import express from "express";
import Juego from "../models/juego.js";

const router = express.Router();

// Obtener todos los juegos
router.get("/", async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

// Crear nuevo juego
router.post("/", async (req, res) => {
  try {
    const nuevoJuego = new Juego({
      titulo: req.body.titulo,
      imagen: req.body.imagen,
      horasJugadas: req.body.horasJugadas,
      completado: req.body.completado,
      creadoPor: req.body.creadoPor || null
    });

    await nuevoJuego.save();
    res.status(201).json({ mensaje: "Juego agregado correctamente", juego: nuevoJuego });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar juego", error });
  }
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

export default router;
