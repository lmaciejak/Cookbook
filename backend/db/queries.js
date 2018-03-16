const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


/* GET Requests */
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function getSingleUser(req, res, next) {
  console.log(req.params.userID);
  db.any("SELECT user_id, username, email, first_name, last_name FROM users WHERE user_id=$1", [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getSingleUserFavorites(req, res, next) {
  db.any("SELECT * FROM favorites WHERE user_id=$1", [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getFollowers(req, res, next) {
  db.any("SELECT user_id, username, email, first_name, last_name FROM users INNER JOIN followings ON(users.user_id=followings.followee_id) WHERE follower_id=$1", [req.params.userID])
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
}

function getFollowing(req, res, next) {
  db.any("SELECT user_id, username, email, first_name, last_name FROM users INNER JOIN followings ON(users.user_id=followings.follower_id) WHERE followee_id=$1;", [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

/*POST Request*/
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




module.exports = {
  logoutUser,
  getSingleUser,
  getSingleUserFavorites,
  getFollowers,
  getFollowing,

};
