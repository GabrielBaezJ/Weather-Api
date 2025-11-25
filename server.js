require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/weathers", weatherRoutes);

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "";

if (!MONGO_URI) {
  console.error("ERROR: Debes definir MONGO_URI en .env");
  process.exit(1);
}

const fullUri = MONGO_URI + DB_NAME;

mongoose.connect(fullUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB:", DB_NAME))
  .catch(err => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor en puerto ${port}`));
