import { Body, Get, Patch, Delete, Post, Route } from "tsoa"
import { IcecreamModel } from "../models/Icecream"// Assuming the 'models' folder is one level up from the current file
import { JsonObject } from "swagger-ui-express"

@Route("api/icecream")
export default class IcecreamController {
  @Post("/create")
  public async create(@Body() body: { name: string }): Promise<string> {
    const data = new IcecreamModel({
      name: body.name,
    })

    try {
      await data.save()
      return "OK"
    } catch (error) {
      return JSON.stringify(error)
    }
  }
}