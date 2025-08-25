import pkg from "whatsapp-web.js";
import qrcode from "qrcode";

const { Client, LocalAuth } = pkg;

class WhatsAppManager {
  constructor() {
    this.clients = {};
    this.qrs = {};
    this.status = {};
  }

  async initClient(clientId, userId) {
    if (this.clients[clientId]) return;

    const client = new Client({
      authStrategy: new LocalAuth({ clientId: `${userId}_${clientId}` }),
      puppeteer: { headless: true, args: ["--no-sandbox"] },
    });

    client.on("qr", async (qr) => {
      this.qrs[clientId] = await qrcode.toDataURL(qr);
      this.status[clientId] = "QR_READY";
    });

    client.on("ready", () => {
      this.status[clientId] = "CONNECTED";
    });

    client.on("disconnected", () => {
      this.status[clientId] = "DISCONNECTED";
      delete this.clients[clientId];
    });

    await client.initialize();
    this.clients[clientId] = client;
  }

  getQr(clientId) {
    return this.qrs[clientId];
  }

  getStatus(clientId) {
    return this.status[clientId] || "NOT_INITIALIZED";
  }

  async sendMessage(clientId, phone, message) {
    if (!this.clients[clientId]) throw new Error("Client not found");
    await this.clients[clientId].sendMessage(`${phone}@c.us`, message);
  }
}

export default new WhatsAppManager();