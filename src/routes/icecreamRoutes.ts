import express, { Request, Response } from "express"
import icecreamController from "../controllers/IcecreamController"

const router = express.Router()
const controller = new icecreamController()

router.post("/create",
    async (req: Request, res: Response) => {
        const response = await controller.create(req.body)

        return res.status(
            response === "OK" ? 200 : 400
        ).send(response)
    }
);

export default router;