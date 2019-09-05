import mongoose from "mongoose"
const Schema = mongoose.Schema

export default class GregsListService {
  /** @param {Schema} schema */
  constructor(documentName, schema) {
    this.documentName = documentName
    this.schema = schema
  }
  get Model() {
    return mongoose.model(this.documentName, this.schema)
  }
}