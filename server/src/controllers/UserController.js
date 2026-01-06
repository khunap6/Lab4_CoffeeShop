const { User } = require('../models')

module.exports = {
  // GET /users
  async index(req, res) {
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: 'The users information was incorrect'
      })
    }
  },

  // POST /user
  async create(req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Create user incorrect'
      })
    }
  },

  // GET /user/:userId
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'The user information was incorrect'
      })
    }
  },

  // PUT /user/:userId
  async put(req, res) {
    try {
      await User.update(req.body, {
        where: { id: req.params.userId }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Update user incorrect'
      })
    }
  },

  // DELETE /user/:userId
  async remove(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return res.status(404).send({
          error: 'User not found'
        })
      }
      await user.destroy()
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Delete user incorrect'
      })
    }
  }
}
