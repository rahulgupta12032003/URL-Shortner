const express=require('express');
const dotenv=require("dotenv");
dotenv.config();
const db = require('./db');

const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRouts');
const cors = require('cors');
const Url = require('./models/Url');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.get("/", (req, res) => {
    res.json({message:"Hello Hash URL"})
})

app.get("/test", async (req, res) => {
  try {
    const url = await Url.find({});
    res.json(url);
  } catch (error) {
    res.status(400).json({ message: `Get Error ${error}` });
  }
})

app.use('/api/urls', urlRoutes);

app.listen(PORT,() =>{
  console.log("Server is running at port 8000")
})