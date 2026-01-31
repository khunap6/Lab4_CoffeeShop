const { Coffee } = require('../models')

module.exports = {
  async index (req, res) {
    const coffees = await Coffee.findAll()
    res.send(coffees)
  },

  async show (req, res) {
    const coffee = await Coffee.findByPk(req.params.coffeeId)
    res.send(coffee)
  },

  async create (req, res) {
    const coffee = await Coffee.create(req.body)
    res.send(coffee)
  },

  async update (req, res) {
    const coffee = await Coffee.update(req.body, {
      where: { id: req.params.coffeeId }
    })
    res.send(coffee)
  },

  async remove (req, res) {
    await Coffee.destroy({
      where: { id: req.params.coffeeId }
    })
    res.send({ message: 'Coffee deleted' })
  }
}
