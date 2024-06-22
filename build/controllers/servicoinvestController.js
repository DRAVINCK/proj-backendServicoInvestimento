"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//controllers/servicoinvestController.ts
const tsoa_1 = require("tsoa");
const servicoinvest_1 = require("../models/servicoinvest");
const mongoose_1 = require("mongoose");
let ServicoInvestController = class ServicoInvestController {
    async create(body) {
        const data = new servicoinvest_1.ServicoInvestModel({
            nome: body.nome,
            idade: body.idade,
            valorInvestimento: body.valorInvestimento,
            tempoDeInvestimento: body.tempoDeInvestimento,
            risco: body.risco,
        });
        try {
            await data.save();
            return "Serviço de investimento criado com sucesso!";
        }
        catch (error) {
            console.error("Erro ao criar serviço de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async list() {
        try {
            const data = await servicoinvest_1.ServicoInvestModel.find();
            return JSON.parse(JSON.stringify(data)); // Retornando os dados em formato JSON
        }
        catch (error) {
            console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async listForId(id) {
        try {
            const data = await servicoinvest_1.ServicoInvestModel.findById(id);
            return JSON.parse(JSON.stringify(data)); // Retornando os dados em formato JSON
        }
        catch (error) {
            console.error("Erro ao listar serviço de investimento por id:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async listMoreFive() {
        try {
            const data = await servicoinvest_1.ServicoInvestModel.find({ tempoDeInvestimento: "12 meses" });
            return JSON.parse(JSON.stringify(data)); // Retornando os dados em formato JSON
        }
        catch (error) {
            console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async listForAge() {
        try {
            const data = await servicoinvest_1.ServicoInvestModel.find({ idade: { $gt: 40 } });
            return JSON.parse(JSON.stringify(data)); // Retornando os dados em formato JSON
        }
        catch (error) {
            console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async listForRisk(nivelRisco) {
        try {
            const data = await servicoinvest_1.ServicoInvestModel.find({ risco: nivelRisco });
            return JSON.parse(JSON.stringify(data)); // Retornando os dados em formato JSON
        }
        catch (error) {
            console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async update(id, body) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return "ID inválido!";
        }
        try {
            const objectId = new mongoose_1.Types.ObjectId(id);
            await servicoinvest_1.ServicoInvestModel.findByIdAndUpdate(objectId, body);
            return "Serviço de investimento atualizado com sucesso!";
        }
        catch (error) {
            console.error("Erro ao atualizar serviço de investimento:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
    async delete(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return "ID inválido!";
        }
        try {
            const objectId = new mongoose_1.Types.ObjectId(id);
            await servicoinvest_1.ServicoInvestModel.findByIdAndDelete(objectId);
            return "Serviço de investimento deletado com sucesso!";
        }
        catch (error) {
            console.error("Erro ao deletar serviço de investimento:", error);
            return JSON.stringify(error);
        }
    }
    async calculateResult(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            return "ID inválido!";
        }
        try {
            const objectId = new mongoose_1.Types.ObjectId(id);
            const investimento = await servicoinvest_1.ServicoInvestModel.findById(objectId);
            if (!investimento) {
                return "Serviço de investimento não encontrado!";
            }
            const valor = investimento.valorInvestimento;
            const tempo = parseFloat(investimento.tempoDeInvestimento.replace(" meses", ""));
            let riscoCalc = 0;
            switch (investimento.risco.toLowerCase()) {
                case "baixo":
                    riscoCalc = 0.3;
                    break;
                case "medio":
                    riscoCalc = 0.6;
                    break;
                case "alto":
                    riscoCalc = 0.12;
                    break;
                default:
                    return "Nível de risco inválido!";
            }
            const resultado = (valor * riscoCalc) * tempo;
            return { resultado };
        }
        catch (error) {
            console.error("Erro ao calcular o resultado:", error); // Logando o erro no console
            return JSON.stringify(error);
        }
    }
};
__decorate([
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)("/list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "list", null);
__decorate([
    (0, tsoa_1.Get)("/listforid/{id}"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "listForId", null);
__decorate([
    (0, tsoa_1.Get)("/listmoremonths"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "listMoreFive", null);
__decorate([
    (0, tsoa_1.Get)("/listforage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "listForAge", null);
__decorate([
    (0, tsoa_1.Get)("/listforrisk"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "listForRisk", null);
__decorate([
    (0, tsoa_1.Patch)("/update/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)("/result/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicoInvestController.prototype, "calculateResult", null);
ServicoInvestController = __decorate([
    (0, tsoa_1.Route)("api/servicoinvest")
], ServicoInvestController);
exports.default = ServicoInvestController;
