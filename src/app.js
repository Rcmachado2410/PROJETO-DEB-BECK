const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const agendamentoRoutes = require("./routes/agendamento.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);

module.exports = app;
