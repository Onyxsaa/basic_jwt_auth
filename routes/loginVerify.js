var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var mysql = require("mysql");
require('dotenv').config();
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



router.post("/", (req, res) => {
    const { mail, passwd } = req.body;


    var sql = 'SELECT * FROM users WHERE mail = ' + mysql.escape(mail) + 'AND password = ' + mysql.escape(passwd);
    con.query(sql, function (err, result) {

        if (err) {
            return res.status(400).json({ message: "hatalı sorgu" });
            
        } else {
            console.log(result[0])


            if (result.length > 0) {
                const user = result[0];
                const anan = user.username;
                const email = user.mail;
                const password = user.password;
                            
                const accesToken = jwt.sign({userName: anan, mail: email, passwd: password}, "38c86534b3ca69475cfe1cb663ca783c0b93db342f4d71000b7cf01a0fdd8b48a89f1159a2f016e750c614a508f5b93d012928fe424c3ed689d5691c4e48b7f9");
                
                const updateAccesTokenQuery = `insert into accesTokens (token) values("${accesToken}")`
                con.query(updateAccesTokenQuery, (err, res) => {
                    if(err) {
                        throw err
                    } else {
                        console.log("accesToken güncellendi")
                    }
                })
                console.log(accesToken)
                res.cookie('accesToken', accesToken);
                res.redirect('/admin');

            }
        
        }
        
    });
})
module.exports = router;
