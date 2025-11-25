const express = require("express");
const router = express.Router();
const Weather = require("../models/Weather");

// Helper para normalizar temperature a 2 decimales
function toTwoDecimals(val) {
  if (val === undefined || val === null) return val;
  const num = Number(val);
  if (isNaN(num)) return val;
  // toFixed devuelve string; convertir a Number para almacenar como Number
  return Number(num.toFixed(2));
}

// 1. GET /weathers  (Listar)
router.get("/", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener weathers" });
  }
});

// 2. POST /weathers (Crear)
router.post("/", async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.temperature !== undefined) body.temperature = toTwoDecimals(body.temperature);

    const newWeather = new Weather(body);
    const saved = await newWeather.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error al crear weather", error: err.message });
  }
});

// 3. GET /weathers/:id (Buscar)
router.get("/:id", async (req, res) => {
  try {
    const w = await Weather.findById(req.params.id);
    if (!w) return res.status(404).json({ message: "Weather no encontrado" });
    res.json(w);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "ID inválido o error al buscar" });
  }
});

// 4. PUT /weathers/:id (Actualizar)
router.put("/:id", async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.temperature !== undefined) body.temperature = toTwoDecimals(body.temperature);

    const updated = await Weather.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!updated) return res.status(404).json({ message: "Weather no encontrado para actualizar" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error al actualizar", error: err.message });
  }
});

// 5. DELETE /weathers/:id (Eliminar)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Weather.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Weather no encontrado para eliminar" });
    res.json({ message: "Weather eliminado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error al eliminar", error: err.message });
  }
});

module.exports = router;
