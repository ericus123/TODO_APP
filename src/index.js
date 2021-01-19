import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to database successfuly");
  }
);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("app is listening at " + port);
  }
});
