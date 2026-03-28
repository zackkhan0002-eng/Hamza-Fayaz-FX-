import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "db.json";

// create DB file if not exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], payments: [] }, null, 2));
}

const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { email } = req.body;
  const db = readDB();

  if (!db.users.find(u => u.email === email)) {
    db.users.push({ email, plan: "free" });
    writeDB(db);
  }

  res.json({ ok: true });
});

// ================= CHAT =================
app.post("/chat", (req, res) => {
  const { email, message } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email);

  if (!user || user.plan === "free") {
    return res.json({
      reply: `⚠️ Free user.\n\n💰 Join course:\nSadaPay | Abdul Fayaz | 03489584436\n\n👉 Payment ke baad verify page use karo.`
    });
  }

  res.json({
    reply: "🔥 PRO AI: " + message
  });
});

// ================= VERIFY =================
app.post("/verify", (req, res) => {
  const db = readDB();

  db.payments.push({
    ...req.body,
    status: "pending",
    time: Date.now()
  });

  writeDB(db);
  res.json({ ok: true });
});

// ================= GET PAYMENTS =================
app.get("/payments", (req, res) => {
  const db = readDB();
  res.json(db.payments);
});

// ================= APPROVE =================
app.post("/approve", (req, res) => {
  const { txid, email } = req.body;
  const db = readDB();

  const payment = db.payments.find(p => p.txid === txid);
  if (payment) payment.status = "approved";

  const user = db.users.find(u => u.email === email);
  if (user) user.plan = "pro";

  writeDB(db);

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
