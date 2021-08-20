const mongoose = require("mongoose");

const connectDB = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://Admin:@Admin7028@auth.upvxs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
  console.log("Connecting....");
  console.log("Connected, Loading Status...");
  console.log(`Status: Connected, Host: ${connect.connection.host}`);
};

module.exports = connectDB;
