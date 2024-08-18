const mongoose = require("mongoose");

// mongoose.set("debug", true);
// mongoose.connect(process.env.DATABASE_URL);


//debugging log
mongoose.set("debug", true)

//.env will not be pushed to github
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});