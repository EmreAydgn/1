import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Writing Assistant endpoint
app.post("/api/ai/writing-assistant", async (req, res) => {
  try {
    const ai = getGeminiAI();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY konfigüre edilmemiş. Lütfen Ayarlar > Secrets bölümünü kontrol edin.",
      });
    }

    const { action, text, context, tone = "Edebi & Derin" } = req.body;

    let systemInstruction = `Sen ödüllü bir edebiyatçı, yayın editörü ve usta metin yazarısın. Türkçe dil bilgisine, üsluba ve kelime zenginliğine hakimsin.
Yazarın fikirlerini daha etkileyici, akıcı, imla kurallarına tam uygun ve estetik hale getiriyorsun.
Seçilen Üslup/Ton: ${tone}.`;

    let prompt = "";

    switch (action) {
      case "polish":
        prompt = `Aşağıdaki metni imla, akıcılık ve anlatım bozuklukları açısından düzelt, edebi ve pürüzsüz hale getir. Sadece düzeltilmiş metni ver (açıklama yapma):\n\n${text}`;
        break;
      case "expand":
        prompt = `Aşağıdaki düşünceyi/paragrafı zenginleştir, derinleştir ve estetik tasvirlerle geliştir. Konu bağlamı: ${context || "Blog yazısı"}.\n\nParagraf:\n${text}`;
        break;
      case "simplify":
        prompt = `Aşağıdaki metni daha net, sadede ve anlaşılır hale getir:\n\n${text}`;
        break;
      case "titles":
        prompt = `Aşağıdaki taslak metin veya konu için 5 adet son derece merak uyandıran, estetik, şiirsel veya vurucu blog başlığı öner. JSON formatında 'titles' dizisi olarak döndür:\n\nMetin/Konu: ${text}`;
        systemInstruction += ` Yanıtı SADECE geçerli bir JSON objesi olarak ver: {"titles": ["Başlık 1", "Başlık 2", ...]}`;
        break;
      case "outline":
        prompt = `Aşağıdaki başlık/fikir için 4-6 ana bölümden oluşan detaylı bir yazı taslağı (outline) hazırla:\n\nFikir: ${text}`;
        break;
      case "summary":
        prompt = `Aşağıdaki blog yazısının okuyucu için 2-3 cümlelik çekici, şiirsel özetini (excerpt) çıkar:\n\n${text}`;
        break;
      case "continue":
        prompt = `Aşağıdaki metnin doğal devamı olarak 2 akıcı, edebi paragraf daha yaz:\n\n${text}`;
        break;
      default:
        prompt = `Aşağıdaki metni geliştir:\n\n${text}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const resultText = response.text || "";

    if (action === "titles") {
      try {
        const cleaned = resultText.replace(/```json|```/g, "").trim();
        const json = JSON.parse(cleaned);
        return res.json({ titles: json.titles || [resultText] });
      } catch (e) {
        return res.json({ result: resultText });
      }
    }

    return res.json({ result: resultText });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "Yapay zeka asistanı çalışırken bir hata oluştu." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
