const { Coffee } = require('../models')

module.exports = {
  // GET /coffees
  async index(req, res) {
    try {
      const coffees = await Coffee.findAll()
      res.send(coffees)
    } catch (err) {
      res.status(500).send({ error: 'Cannot get coffees' })
    }
  },

  // POST /coffee
  async create(req, res) {
    try {
      const coffee = await Coffee.create(req.body)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Cannot create coffee' })
    }
  },

  // GET /coffee/:coffeeId
  async show(req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Coffee not found' })
    }
  },

  // PUT /coffee/:coffeeId
  async put(req, res) {
    try {
      await Coffee.update(req.body, {
        where: { id: req.params.coffeeId }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({ error: 'Cannot update coffee' })
    }
  },

  // DELETE /coffee/:coffeeId
  async remove(req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) {
        return res.status(404).send({ error: 'Coffee not found' })
      }
      await coffee.destroy()
      res.send(coffee)
    } catch (err) {
      res.status(500).send({ error: 'Cannot delete coffee' })
    }
  }
}
