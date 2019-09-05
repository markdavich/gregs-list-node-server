import express from 'express'
import GregsListService from '../services/gregs-list-service';

let gls

export default class GregsListController {
  /**
   * 
   * @param {GregsListService} service 
   */
  constructor(service) {
    this.model = service.Model
  }

  static getRouter(documentName, schema) {
    let result = new GregsListController(new GregsListService(documentName, schema)).Router
    return result
  }

  get Router() {
    //NOTE  each route gets registered as a .get, .post, .put, or .delete,
    // the first parameter of each method is a string to be concatinated onto the
    // base url registered with the route in main.
    // The second parameter is the method that will be run when this route is hit.
    return express.Router()
      .get('', this.getAll.bind(this))
      .get('/:id', this.getById.bind(this))
      .post('', this.create.bind(this))
      .put('/:id', this.edit.bind(this))
      .delete('/:id', this.delete.bind(this))
  }


  async getAll(req, res, next) {
    try {
      let data = await this.model.find({})
      return res.send({ data: data })
    } catch (error) {
      next(error)
    }

  }

  async getById(req, res, next) {
    try {
      let data = await this.model.findById(req.params.id)
      if (!data) {
        throw new Error("Invalid Id")
      }
      res.send({ data: data })
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      let newData = req.body
      delete newData._id

      let data = await this.model.create(newData)
      res.send({ data: data })
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await this.model.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true })
      if (data) {
        return res.send({ data: data })
      }
      throw new Error("invalid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id })
      res.send("deleted value")
    } catch (error) { next(error) }

  }

}