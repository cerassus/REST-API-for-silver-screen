const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const getRoute = require("./routes/get");
const dotenv = require("dotenv");
const corsOptions = {
  optionsSuccessStatus: 200,
  methods: "GET, POST, PUT",
};
const app = express();

// use Middleware

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/user', authRoute);
app.use('/user', postRoute);
app.use('/', getRoute);

// connect to MongoDB

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => console.log('Mongoose is connected to movies DB'));

// Listen on PORT 3000

app.listen(3003, function () {
  console.log("Silver-Screen REST API is listening on port 3003!");
});