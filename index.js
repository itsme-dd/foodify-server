const express = require("express");
const app = express();
const mongoDB = require("./db");
mongoDB();
const dotenv = require('dotenv'); 
dotenv.config();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Devashish!");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/LoginUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
