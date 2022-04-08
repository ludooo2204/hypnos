const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  console.log("coucou ludo")
  let token = req.headers["x-access-token"];
  console.log("token")
  console.log(token)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    console.log("decoded")
    console.log(decoded)
    console.log('err')
    console.log(err)
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    console.log("token decodé !")
    let rolesTemp=[]
    User.findByPk(decoded.id).then(user => {
      console.log(JSON.stringify(user,null,2))
  
      user.getRoles().then(roles => {
        console.log(JSON.stringify(roles,null,2))
        for (let i = 0; i < roles.length; i++) {
          rolesTemp.push(roles[i].name)
        }
  
        req.roles=rolesTemp
        req.userId = decoded.id;
        req.email = decoded.email;
        // req.password = decoded.password;

        next();

      });
    });
   
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      console.log(JSON.stringify(roles,null,2))

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          req.roles = roles[i].name;

          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
isManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      console.log(JSON.stringify(roles,null,2))
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          req.roles = roles[i].name;

          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Manager Role!"
      });
      return;
    });
  });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
};
module.exports = authJwt;