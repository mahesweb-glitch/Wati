import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/index.js";       // auth + maybe others
import whatsappRoutes from "./routes/whatsapp.js"; // WhatsApp routes

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files (so qr.html works directly at /qr.html)
app.use(express.static("public"));

// ✅ Keep existing auth/other routes
app.use("/api", routes);

// ✅ Add WhatsApp routes separately
app.use("/api/whatsapp", whatsappRoutes);

// =========================
// 🚀 Start Server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
