const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  console.log("test signup")
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Le compte a bien été enregistré !" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Le compte a bien été enregistré !" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  console.log("test signin")

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      // console.log("user trouveé")
      if (!user) {
        // return res.status(404).send({ message: "Cet identifiant n'existe pas !" });
        return res.send({ message: "Cet identifiant n'existe pas !" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        // return res.status(401).send({
        return res.send({
          accessToken: null,
          message: "Mot de passe erroné!"
        });
      }
      var token = jwt.sign({ id: user.id,username:user.username }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      // console.log("user")
      // console.log(user)
      // res.setHeader('x-access-token', 'Bearer '+ token);
      // res.setHeader('x-access-token', token);
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};