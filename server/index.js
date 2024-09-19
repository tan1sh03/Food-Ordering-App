const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 6001
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());

//mongoodb config

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodi-client.5x8m2un.mongodb.net/demo-foodie-client?retryWrites=true&w=majority&appName=demo-foodi-client`)
.then(
    console.log("MongoDB connected Successfully")
)
.catch((error) => console.log("Error connecting to MongoDB",error))

//jwt authentification

app.post('/jwt',async(req,res)=>{
  const user = req.body;
  const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr'
  })
  res.send({token});
})

//verify jwt token
//middleware

const verifyToken = (req,res,next) => {
 // console.log(req.headers.authorization)
 if(!req.headers.authorization) {
  return res.status(401).send({message: "Unauthorized access"});
}

const token = req.headers.authorization.split(' ')[1];
//console.log(token);
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=> {
  if(err) {
    return res.status(401).send({message: 'token is invalid'})
  }
  req.decoded = decoded;
  next();
})
}

//import routes here

const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu',menuRoutes)
app.use('/carts',cartRoutes)
app.use('/users',userRoutes)


app.get('/',verifyToken, (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})