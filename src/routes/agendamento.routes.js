const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const AgendamentoController = require("../controllers/agendamento.controller");

// protege todas as rotas abaixo
router.use(authMiddleware);

// listar
router.get("/", AgendamentoController.listar);

// criar
router.post("/", AgendamentoController.criar);

// editar
router.put("/:id", AgendamentoController.editar);

// excluir
router.delete("/:id", AgendamentoController.excluir);

module.exports = router;
