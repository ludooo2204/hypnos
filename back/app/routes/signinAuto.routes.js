let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
console.log("req.userId")
console.log(req.userId)
console.log("req.username")
console.log(req.username)
res.status(200).json({username:req.username,userId:req.userId})
});
router.post("/", (req, res) => {

});
module.exports = router;
