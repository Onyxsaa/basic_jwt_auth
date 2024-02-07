var express = require('express');
var router = express.Router();


router.get("/", (req, res) => {
    res.clearCookie("accesToken")
    res.redirect("login")
})






module.exports = router;