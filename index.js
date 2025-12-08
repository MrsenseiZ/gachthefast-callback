import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// URL callback của bạn: https://your-railway-url/callback
app.post("/callback", async (req, res) => {
  console.log("📩 Callback received:", req.body);

  // gửi OK cho server gachthefast để nó ngừng retry
  res.json({ status: "ok" });

  // Tự viết logic xử lý -> gửi kết quả vào BOT
  // Bạn chỉ cần gọi API bot:
  // POST http://localhost:4444/card-callback  (trong bot)
  
  try {
    await fetch("http://<YOUR_BOT_IP>:4444/card-callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
  } catch (e) {
    console.error("Bot unreachable:", e);
  }
});

app.listen(3000, () => {
  console.log("Callback server running on port 3000");
});
