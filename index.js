import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// BẮT BUỘC PHẢI CÓ ROUTE NÀY
app.get("/", (req, res) => {
  res.send("Callback server OK");
});

// GạchTheFast callback
app.post("/callback", async (req, res) => {
  console.log("👉 Callback nhận được:", req.body);

  // Trả OK cho hệ thống GTF
  res.json({ status: "ok" });

  // Đẩy callback sang VPS
  try {
    await fetch("http://8.222.133.102:4444/card-callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    console.log("✅ Đã đẩy callback sang VPS!");
  } catch (err) {
    console.error("❌ Lỗi gửi sang VPS:", err);
  }
});

// PORT Railway chỉ định
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Callback server running on port", PORT);
});
