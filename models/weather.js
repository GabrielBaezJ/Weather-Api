const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
    temperature: Number,        // usamos Number y controlamos 2 decimales en las rutas
    description: String,
    humidity: Number,
    wind_speed: Number,
    date_observed: String,
    weather_source: String
}, { collection: "weather_searches" }); // forzar colección exacta

module.exports = mongoose.model("Weather", weatherSchema, "weather_searches");
