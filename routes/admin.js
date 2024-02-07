var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
/* GET home page. */
var mysql = require("mysql")

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "users"
  });
  
  con.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log("Db ye başarıyla bağlanıldı!    ")
    }
  });

router.get("/", (req, res) => {

    const token = req.cookies.accesToken
    var isValid;
    if(!token) {
        res.redirect("/login")
    } else {
        jwt.verify(token, "38c86534b3ca69475cfe1cb663ca783c0b93db342f4d71000b7cf01a0fdd8b48a89f1159a2f016e750c614a508f5b93d012928fe424c3ed689d5691c4e48b7f9", (err, result) => {
            if(err) {
                throw err
            } else {
                let query = `select * from accesTokens where token="${token}"`

                con.query(query, (err, res) => {
                    if(err) {
                        throw err
                    } else {
                        if(res.lenght > 0) {
                            isValid = false
                        } else {
                            isValid = true
                        }
                    }
                })
                setTimeout(() => {
                    if(isValid == true) {
                        res.render("adminPage")
                    } else {
                        res.send("<h1> Lütfen tekrar giriş yapın </h1>")
                    }
                }, 1000);

            }
        })
    }

    
})
module.exports = router;
