"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IcecreamController_1 = __importDefault(require("../controllers/IcecreamController"));
const router = express_1.default.Router();
const controller = new IcecreamController_1.default();
router.post("/create", async (req, res) => {
    const response = await controller.create(req.body);
    return res.status(response === "OK" ? 200 : 400).send(response);
});
exports.default = router;
