const passport = require("passport")

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {

    if (err || !user) {
      return res.status(403).json({
        error: "You are not authorized"
      })
    }

    // แนบ user ให้ใช้ต่อใน controller
    req.user = user
    next()

  })(req, res, next)
}