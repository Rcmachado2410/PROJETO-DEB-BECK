const prisma = require("../database/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "minha-chave";

exports.register = async (req, res) => {
  const { user, name, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { user } });
  if (exists) return res.status(400).json({ error: "Usuário já existe" });

  const hash = await bcrypt.hash(password, 8);

  await prisma.user.create({
    data: { user, name, password: hash }
  });

  res.status(201).json({ message: "Usuário criado" });
};

exports.login = async (req, res) => {
  const { user, password } = req.body;

  const userEncontrado = await prisma.user.findUnique({ where: { user } });
  if (!userEncontrado) return res.status(401).json({ error: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, userEncontrado.password);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

  res.json({ token });
};
