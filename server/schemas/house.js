import mongoose from "mongoose"
const Schema = mongoose.Schema

export const houseSchema = new Schema(
  {
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    levels: {type: Number, required: true},
    imgUrl: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}
  },

  {
    timestamps: true
  }
)