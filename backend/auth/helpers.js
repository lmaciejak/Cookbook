const bcrypt = require("bcryptjs");
const db = require("../db/index");

function comparePass(username, password) {
  console.log(username);
  return bcrypt.compareSync(username, password);
}

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return db.none(
    "INSERT INTO accounts (user_id, username, password) VALUES (DEFAULT, ${username}, ${password})",
    { username: req.body.username, password: hash }
  );
}

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ status: "Please log in" });
  }
  return next();
}


module.exports = {
  comparePass,
  createUser,
  loginRequired
};
