"use strict";
//models/servicoinvest.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicoInvestModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const servicoInvestSchema = new mongoose_1.default.Schema({
    nome: {
        required: true,
        type: String,
    },
    idade: {
        required: true,
        type: Number,
    },
    valorInvestimento: {
        required: true,
        type: Number,
    },
    tempoDeInvestimento: {
        required: true,
        type: String,
        enum: ["3 meses", "6 meses", "12 meses"]
    },
    risco: {
        required: true,
        type: String,
        enum: ["Baixo", "Medio", "Alto"]
    },
});
exports.ServicoInvestModel = mongoose_1.default.model("ServicoInvest", servicoInvestSchema);
