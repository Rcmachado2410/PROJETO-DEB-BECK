const prisma = require("../database/prisma");

exports.listar = async (req, res) => {
  const agendamentos = await prisma.agendamento.findMany({
    where: { userId: req.userId }
  });

  res.json(agendamentos);
};

exports.criar = async (req, res) => {
  const novo = await prisma.agendamento.create({
    data: {
      ...req.body,
      status: "Pendente",
      userId: req.userId
    }
  });

  res.status(201).json(novo);
};

exports.editar = async (req, res) => {
  await prisma.agendamento.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });

  res.sendStatus(204);
};

exports.excluir = async (req, res) => {
  await prisma.agendamento.delete({
    where: { id: Number(req.params.id) }
  });

  res.sendStatus(204);
};
