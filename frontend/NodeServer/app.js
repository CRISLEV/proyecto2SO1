const   express     = require("express"),
        app         = express(),
        mongoose    = require("mongoose"),
        bodyParser  = require("body-parser"),
        multer      = require("multer"),
        upload      = multer()
        clearCache   = require('./services/cache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// MONGODB SETUP

mongoose.connect('mongodb://35.238.198.129:27017/Proyecto2',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection
        .once('open', ()=>console.log('connected to database'))
        .on('error',(err)=>console.log("connection to database failed!!",err))

const Caso = require('./models/caso');

app.use(upload.array()); 
app.use(express.static('public'));






// ROUTES

app.get('/',(req,res)=>{
    Caso.find({})
            .then((data)=>{

                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})


app.get('/getpiedata',(req,res)=>{
    Caso.aggregate([  {$unwind: "$location"},  {$group: {
        _id: "$location",
        total: {
          $sum: 1
        }
      }}])
            .then((data)=>{

                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})




app.get('/getbarrasdata',(req,res)=>{
    Caso.aggregate([  {$unwind: "$age"},  {$group: {
        _id: "$age",
        total: {
          $sum: 1
        }
      }}])
            .then((data)=>{

                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})

app.get('/getTop',(req,res)=>{
    Caso.aggregate([  {$unwind: "$location"},  {$group: {
        _id: "$location",
        total: {
          $sum: 1
        }
      }},
      {         $sort: {             "total": -1         }     },     

 {         $limit : 3     }  
    ])
            .then((data)=>{

                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})


app.get('/getlast',(req,res)=>{
    Caso.find().sort({"_id" : -1}).limit(1)
            .then((data)=>{

                res.json({found: true, data: data});
            })
            .catch((err)=>{
                console.log(err)
                res.json({found: false, data: null});
            })
})

app.post('/caso',async (req,res)=>{
    console.log(req.body.name)
    new Caso(req.body)
            .save()
            .then((v_data)=>{
            console.log(v_data);
            res.json({save: true})
            clearCache(v_data._id)
        })
        .catch((err)=>{
            console.log(err)
            res.json({save: false})
        }) 
})



app.listen(2000,()=>console.log("server started at port:2000"))