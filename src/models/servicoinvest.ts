//models/servicoinvest.ts

import mongoose from "mongoose";

const servicoInvestSchema = new mongoose.Schema({
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
    tempoDeInvestimento:{
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

export const ServicoInvestModel = mongoose.model("ServicoInvest", servicoInvestSchema)