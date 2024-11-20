const { connectToMongoDb, getDb } = require("../database/mongoDb.config");
let db;
const getColl = (name) => db.collection(name);
connectToMongoDb((err) => {
  if (!err) {
    db = getDb();
  } else {
    console.log(err);
  }
});

module.exports = getColl;
