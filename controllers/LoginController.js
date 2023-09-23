const bcrypt = require("bcrypt");

function login(req, res){
    if(req.session.loggedin != true){
      res.render("login/index.hbs");
    } else {
      res.redirect("/");
    }
}

function Auth(req, res){
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM usuarios WHERE Email = ?", [data.Email], (err, userdata)=>{
      if(userdata.length > 0){
        console.log(userdata);
        userdata.forEach(element => {
          bcrypt.compare(data.Clave, element.Clave, (err, isMatch) => {
            if(!isMatch){
              res.render("login/index", {error: "Contraseña incorrecta" });
            } else {
              req.session.loggedin = true;
              req.session.name = element.Usuario;
              res.redirect("/");
            }
          })
        });
      } else {
        res.render("login/register", {error: "Usuario no registrado" });
      }
      });
  })
}

function register(req, res){
     if(req.session.loggedin != true){
      res.render("login/register");
    } else {
      res.redirect("/");
    }
}

function storeUser(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM usuarios WHERE Email = ?", [data.Email], (err, userdata)=>{
          if(userdata.length > 0){
            res.render("login/register", {error: "Usuario registrado" });
          } else {
            bcrypt.hash(data.Clave, 12).then(hash =>{
                data.Clave = hash;
                req.getConnection((err, conn) =>{
                    if(err){
                        console.log(err);
                    } else {
                      conn.query("INSERT INTO usuarios SET ?", [data], (err, rows)=>{
                        if (err) {
                            console.log(err);
                        } else {
                            req.session.loggedin = true;
                            req.session.name = data.Usuario;
                            res.redirect("/");
                        }
                      })
                    }
                })
            })
          }
        });
    });
}

function logout(req, res){
  if (req.session.loggedin == true){
    req.session.destroy();
  }
  res.redirect("/login")
}

module.exports = {
    login,
    register,
    storeUser,
    Auth,
    logout,
}