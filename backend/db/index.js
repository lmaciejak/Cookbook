var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/cookbookdb";
var db = pgp(connectionString);

module.exports = db;
