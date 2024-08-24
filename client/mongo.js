const mongoose = require("mongoose");

// mongoose.set("debug", true);
// mongoose.connect(process.env.DATABASE_URL);


//debugging log
mongoose.set("debug", true)

//.env will not be pushed to github
mongoose.connect(process.env.DATABASE_URL, {
  serverSelectionTimeoutMS: 60000, // Increase timeout to 30 seconds
  socketTimeoutMS: 60000, // 30 seconds
})

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});