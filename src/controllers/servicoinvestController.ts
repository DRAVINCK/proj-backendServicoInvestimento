
//controllers/servicoinvestController.ts
import { Body, Delete, Get, Patch, Path, Post, Query, Route } from "tsoa";
import { ServicoInvestModel } from "../models/servicoinvest";
import { JsonObject } from "swagger-ui-express";
import { Types } from "mongoose";


@Route("api/servicoinvest")
export default class ServicoInvestController {
  @Post("/create")
  public async create(@Body() body: { nome: string, idade: number, valorInvestimento: number, tempoDeInvestimento: String, risco: String }): Promise<string> {
    const data = new ServicoInvestModel({
      nome: body.nome,
      idade: body.idade,
      valorInvestimento: body.valorInvestimento,
      tempoDeInvestimento: body.tempoDeInvestimento,
      risco: body.risco,
    })

    try {
      await data.save();
      return "Serviço de investimento criado com sucesso!";
    } catch (error) {
      console.error("Erro ao criar serviço de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Get("/list")
  public async list(): Promise<string> {
    try {
      const data = await ServicoInvestModel.find();
      return JSON.parse(JSON.stringify( data )); // Retornando os dados em formato JSON
    } catch (error) {
      console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Get("/listforid/{id}")
  public async listForId(id: string): Promise<string> {
    try {
      const data = await ServicoInvestModel.findById(id);
      return JSON.parse(JSON.stringify( data )); // Retornando os dados em formato JSON
    } catch (error) {
      console.error("Erro ao listar serviço de investimento por id:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Get("/listmoremonths")
  public async listMoreFive(): Promise<string> {
    try {
      const data = await ServicoInvestModel.find({tempoDeInvestimento: "12 meses"});
      return JSON.parse(JSON.stringify( data )); // Retornando os dados em formato JSON
    } catch (error) {
      console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Get("/listforage")	
  public async listForAge(): Promise<string> {
    try {
      const data = await ServicoInvestModel.find({idade: {$gt: 40}});
      return JSON.parse(JSON.stringify( data )); // Retornando os dados em formato JSON
    } catch (error) {
      console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Get("/listforrisk")
  public async listForRisk(@Query() nivelRisco: String ): Promise<string> {
    try {
      const data = await ServicoInvestModel.find({risco: nivelRisco});
      return JSON.parse(JSON.stringify( data )); // Retornando os dados em formato JSON
    } catch (error) {
      console.error("Erro ao listar serviços de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Patch("/update/{id}")
  public async update(
    @Path() id: string, 
    @Body() body: { nome: string, idade: number, valorInvestimento: number, tempoDeInvestimento: String, risco: String }
  ): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      return "ID inválido!";
    }
    try {
      const objectId = new Types.ObjectId(id);
      await ServicoInvestModel.findByIdAndUpdate(objectId, body);
      return "Serviço de investimento atualizado com sucesso!";
    } catch (error) {
      console.error("Erro ao atualizar serviço de investimento:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }

  @Delete("/delete/{id}")
  public async delete(@Path() id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      return "ID inválido!";
    }
    try {
      const objectId = new Types.ObjectId(id);
      await ServicoInvestModel.findByIdAndDelete(objectId);
      return "Serviço de investimento deletado com sucesso!";
    } catch (error) {
      console.error("Erro ao deletar serviço de investimento:", error); 
      return JSON.stringify(error);
    }
  }

  @Get("/result/{id}")
  public async calculateResult(@Path() id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      return "ID inválido!";
    }

    try {
      const objectId = new Types.ObjectId(id);
      const investimento = await ServicoInvestModel.findById(objectId);

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
    } catch (error) {
      console.error("Erro ao calcular o resultado:", error); // Logando o erro no console
      return JSON.stringify(error);
    }
  }
}

