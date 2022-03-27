const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  console.log("fr civ")
  console.log(req.body)
  // Username
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(email => {
    if (email) {
      console.log("Failed! email is already in use!")
      // res.status(400).send({
      res.send({
        message: "Erreur! l'email est déja utilisé!"
      });
      return;
    }
    next();
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      console.log("req.body.roles[i]")
      console.log(req.body.roles[i])
      if (!ROLES.includes(req.body.roles[i])) {
        // res.status(400).send({
        res.send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;