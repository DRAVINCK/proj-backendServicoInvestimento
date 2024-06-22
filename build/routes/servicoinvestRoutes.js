"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/servicoinvestRoutes.ts
const express_1 = __importDefault(require("express"));
const servicoinvestController_1 = __importDefault(require("../controllers/servicoinvestController"));
const router = express_1.default.Router();
const controller = new servicoinvestController_1.default();
router.post("/create", async (req, res) => {
    try {
        const response = await controller.create(req.body);
        if (response === "Serviço de investimento criado com sucesso!") {
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(response);
        }
    }
    catch (error) {
        console.error("Erro na rota de criação:", error); // Logando o erro no console
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/listforid/:id", async (req, res) => {
    try {
        const response = await controller.listForId(req.params.id);
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro na rota de listagem por id:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/list", async (req, res) => {
    try {
        const response = await controller.list();
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro na rota de listagem:", error); // Logando o erro no console
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/listmoremonths", async (req, res) => {
    try {
        const response = await controller.listMoreFive();
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro na rota de listagem de investimentos:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/listforage", async (req, res) => {
    try {
        const response = await controller.listForAge();
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro na rota de listagem por idade:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/listforrisk", async (req, res) => {
    const nivelRisco = req.query.nivelRisco;
    try {
        const response = await controller.listForRisk(nivelRisco);
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Erro na rota de listagem por risco:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.patch("/update/:id", async (req, res) => {
    try {
        const response = await controller.update(req.params.id, req.body);
        if (response === "Serviço de investimento atualizado com sucesso!") {
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(response);
        }
    }
    catch (error) {
        console.error("Erro na rota de atualização:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        const response = await controller.delete(req.params.id);
        if (response === "Serviço de investimento deletado com sucesso!") {
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send(response);
        }
    }
    catch (error) {
        console.error("Erro na rota de deleção:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
router.get("/result/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.calculateResult(id);
        if (response) {
            return res.status(200).json(response);
        }
        else {
            return res.status(400).send("Não foi possível calcular o resultado.");
        }
    }
    catch (error) {
        console.error("Erro ao calcular o resultado:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});
exports.default = router;
