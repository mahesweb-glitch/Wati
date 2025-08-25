import { Router } from "express";
import { authenticateToken } from "../authMiddleware.js";
import whatsappManager from "../whatsappManager.js";
import express from "express";
const router = Router();

router.post("/:clientId/init", authenticateToken, async (req, res) => {
  try {
    await whatsappManager.initClient(req.params.clientId, req.user.id);
    res.json({ message: "Session initialized" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:clientId/qr", authenticateToken, async (req, res) => {
  try {
    const qr = whatsappManager.getQr(req.params.clientId);
    if (!qr) return res.json({ message: "QR not ready" });
    res.json({ qr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:clientId/status", authenticateToken, (req, res) => {
  try {
    const status = whatsappManager.getStatus(req.params.clientId);
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:clientId/send-text", authenticateToken, async (req, res) => {
  const { phone, message } = req.body;
  try {
    await whatsappManager.sendMessage(req.params.clientId, phone, message);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;