const mongoose = require("mongoose");
require("dotenv").config();


const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected to DB`))
    .catch((err) => console.log(err));
};

module.exports = connect;