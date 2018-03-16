const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

function registerUser(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        detail: err.detail
      });
    });
}

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.status(500).send("error while trying to log in");
      } else if (!user) {
        res.status(401).send("invalid username/password");
      } else if (user) {
        req.logIn(user, function(err) {
          if (err) {
            res.status(500).send("error");
          } else {
            res.status(200).send(user);
          }
        });
      }
    })(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}



module.exports = {
  
};
