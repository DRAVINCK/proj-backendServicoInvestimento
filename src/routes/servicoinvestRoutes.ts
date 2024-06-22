//routes/servicoinvestRoutes.ts
import express, { Request, Response } from "express";
import ServicoInvestController from "../controllers/servicoinvestController";

const router = express.Router();
const controller = new ServicoInvestController();

router.post("/create", async (req: Request, res: Response) => {
    try {
        const response = await controller.create(req.body);
        if (response === "Serviço de investimento criado com sucesso!") {
            return res.status(200).send(response);
        } else {
            return res.status(400).send(response);
        }
    } catch (error) {
        console.error("Erro na rota de criação:", error); // Logando o erro no console
        return res.status(500).send("Erro interno do servidor");
    }
}
);

router.get("/listforid/:id", async (req: Request, res: Response) => {
    try {
        const response = await controller.listForId(req.params.id);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro na rota de listagem por id:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});

router.get("/list", async (req: Request, res: Response) => {
    try {

        const response = await controller.list();
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro na rota de listagem:", error); // Logando o erro no console
        return res.status(500).send("Erro interno do servidor");
    }
}
);

router.get("/listmoremonths", async (req: Request, res: Response) => {
    try {
        const response = await controller.listMoreFive();
        return res.status(200).json(response);

    } catch (error) {
        console.error("Erro na rota de listagem de investimentos:", error);
        return res.status(500).send("Erro interno do servidor");
    }
}
);

router.get("/listforage", async (req: Request, res: Response) => {
    try {
        const response = await controller.listForAge();
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro na rota de listagem por idade:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});

router.get("/listforrisk", async (req: Request, res: Response) => {
    const nivelRisco = req.query.nivelRisco as string;
    try {
        const response = await controller.listForRisk(nivelRisco);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Erro na rota de listagem por risco:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});

router.patch("/update/:id", async (req: Request, res: Response) => {
    try {
        const response = await controller.update(req.params.id, req.body);
        if (response === "Serviço de investimento atualizado com sucesso!") {
            return res.status(200).send(response);
        } else {
            return res.status(400).send(response);
        }
    } catch (error) {
        console.error("Erro na rota de atualização:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const response = await controller.delete(req.params.id);
        if (response === "Serviço de investimento deletado com sucesso!") {
            return res.status(200).send(response);
        } else {
            return res.status(400).send(response);
        }
    } catch (error) {
        console.error("Erro na rota de deleção:", error);
        return res.status(500).send("Erro interno do servidor");
    }
});

router.get("/result/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const response = await controller.calculateResult(id);
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(400).send("Não foi possível calcular o resultado.");
      }
    } catch (error) {
      console.error("Erro ao calcular o resultado:", error);
      return res.status(500).send("Erro interno do servidor");
    }
  });

export default router;