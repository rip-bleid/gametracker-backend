import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";
import Usuario from "../models/usuario.js";

dotenv.config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "secreto123";

// ⭐ CONFIGURAR MULTER PARA GUARDAR FOTOS
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ----------------------------------
// REGISTER
// ----------------------------------
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password)
      return res.status(400).json({ mensaje: "Datos incompletos" });

    let existe = await Usuario.findOne({ email });
    if (existe)
      return res.status(400).json({ mensaje: "Email ya registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashed,
    });
    await usuario.save();

    res.json({ mensaje: "Usuario registrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error en registro" });
  }
});

// ----------------------------------
// LOGIN
// ----------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok)
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: "7d" });

    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        fotoPerfil: usuario.fotoPerfil,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error en login" });
  }
});

// ----------------------------------
// SUBIR FOTO DE PERFIL
// ----------------------------------
router.post("/subir-foto", upload.single("foto"), async (req, res) => {
  try {
    const { id } = req.body;

    const nuevaRuta = `/uploads/${req.file.filename}`;

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { fotoPerfil: nuevaRuta },
      { new: true }
    );

    res.json({ fotoPerfil: usuario.fotoPerfil });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al subir imagen" });
  }
});

export default router;
