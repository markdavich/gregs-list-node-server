import mongoose from "mongoose"
const Schema = mongoose.Schema

export const carSchema = new Schema(
  {
    make: {type: String, required: false},
    model: {type: String, required: false},
    imgUrl: {type: String, required: false},
    year: {type: Number, required: false},
    price: {type: Number, required: false},
    description: {type: String, required: false}
  },
  
  {
    timestamps: true
  }
)