import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test xem app sống không
app.get("/", (req, res) => {
  res.send("Callback server is running");
});

// GạchTheFast sẽ gọi vào URL này:  https://...railway.app/callback
app.post("/callback", async (req, res) => {
  console.log("👉 Callback nhận được:", req.body);

  // Trả OK cho GTF để nó không retry nữa
  res.json({ status: "ok" });

  // Gửi tiếp data sang VPS để bot xử lý
  try {
    await fetch("http://8.222.133.102:4444/card-callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    console.log("✅ Đã đẩy callback sang VPS thành công");
  } catch (err) {
    console.error("❌ Lỗi gửi sang VPS:", err);
  }
});

// Railway BẮT BUỘC dùng process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Callback server running on port", PORT);
});
