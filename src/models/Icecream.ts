import mongoose from "mongoose"

const icecreamSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
})

export const IcecreamModel = 
      mongoose.model("Icecream", icecreamSchema)
