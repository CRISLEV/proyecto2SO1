const http = require('http');
const { MongoClient } = require('mongodb')
//SERVER CONTANTS............................................................
const hostname = '0.0.0.0';
const port = 3000;

//IMPORTS....................................................................
var express = require('express');
const { Console } = require('console');
const { randomInt } = require('crypto');
const { response } = require('express');
const bodyParser = require('body-parser');
const { findIndex } = require('lodash');

var app = express();
var MONGO_URI ='mongodb://35.238.198.129:27017'
const cliente = new MongoClient(MONGO_URI)

app.use(bodyParser.json({limit: '50mb', type: 'application/json', extended: true}));


//SERVER START...............................................................
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//API.................................................................
app.post('/sendMsg', async (req, res) =>{
    console.log("Obteniendo informacion...");
    const body = req.body;
    
    name = body.name;
    location = body.location;
    age = body.age;
    infectedtype = body.infectedtype;
    state = body.state;
    
    //if loadbalancer

    console.log("Insertando en mongo...")
    var newCaso = {name:name, location:location, age:age, infectedtype:infectedtype, state:state, server:"nodejs Server"};
    let result = {"message":"ok"};
    try{
      await cliente.connect();
      const database = cliente.db("Proyecto2")
      const collection = database.collection("Caso")
      collection.insertOne(newCaso);
    }
    catch(err){
      console.log(err);
      result= {"message":"failed"};
    }
    finally{
      res.statusCode = 200;
      res.json(result);
      res.end();
    }
});

//FUNCTIONS AND METHODS

