const express = require("express");
const { engine } = require("express-handlebars");
const myconnection = require("express-myconnection");
const mysql2 = require("mysql2");
const bodyParser = require("body-parser");
const session = require('cookie-session');

const loginRoutes = require("./routes/Login.js");

const app = express();

app.set("port", 4000);

app.set("views", __dirname + "/views");

app.engine(".hbs", engine({
    extname: ".hbs",
}));

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(myconnection(mysql2, {
    host: "containers-us-west-210.railway.app",
    user: "root",
    password: "swoy40Rat8VnxNTUbfcm",
    database: "railway",
    port: 7633,
}));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.listen(app.get("port"), () => {
  console.log("Listening on port", app.get("port"));
});

app.use("/", loginRoutes);

app.get("/", (req, res) => {
    if(req.session.loggedin == true){
        res.render("home", {name: req.session.name, loggeding: req.session.loggedin});
    } else {
        res.render("home", {name: req.session.name, loggedin: req.session.loggedin});
    }
});

