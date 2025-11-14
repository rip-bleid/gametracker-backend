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
      genero: req.body.genero,
      resena: req.body.resena,
      rating: req.body.rating,
      creadoPor: req.body.creadoPor || null
    });

    await nuevoJuego.save();
    res.status(201).json({ mensaje: "Juego agregado correctamente", juego: nuevoJuego });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar juego", error });
  }
});

// Obtener un juego por ID
router.get("/:id", async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ mensaje: "Juego no encontrado" });

    res.json(juego);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener juego", error });
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
