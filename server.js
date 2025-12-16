import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "prisma.js";


const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = "segredo_super_secreto"; // depois vai pro .env

// ================== CADASTRO ==================
app.post("/register", async (req, res) => {
  const { user, name, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const exists = await prisma.user.findUnique({ where: { user } });
  if (exists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { user, name, password: hash },
  });

  res.json(newUser);
});

// ================== LOGIN ==================
app.post("/login", async (req, res) => {
  const { user, password } = req.body;

  const dbUser = await prisma.user.findUnique({ where: { user } });
  if (!dbUser) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const ok = await bcrypt.compare(password, dbUser.password);
  if (!ok) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  const token = jwt.sign(
    { id: dbUser.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.listen(3000, () => {
  console.log("🔥 API rodando em http://localhost:3000");
});
