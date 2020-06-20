const { MongoClient } = require("salvage.db");
const db = new MongoClient({
  mongoURI: require("./token.json").Mongo,
  schema: {
    name: "Salvage5"
  },
  logFile: "./log.txt"
});
module.exports = db;
(async () => {
  await db.addSchema("TEST1");
  console.log(db.schemas);
  await db.set("KEYTEST1", "VALUETEST1", "TEST1");
  console.log(await db.get("KEYTEST1", "TEST1"));
  await db.delete("KEYTEST1", "TEST1");
  console.log(await db.get("KEYTEST1", "TEST1"));
  await db.delete("1232131231312321", "DEFAULT");
})();
