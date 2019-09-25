import express  from "express";
import mongo from "mongodb";
import  bodyParser from "body-parser";
let app = express();
const port = process.env.port || 4000;
let MongoClient = mongo.MongoClient;
let mongourl = "mongodb://127.0.0.1:27017/";
let db;
let col_name = "names";


//the below two lines are used to fetch the data from body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//app.listen(port,err=>{console.log(`server is working on port${port}`)});

app.get("/", (req, res) => {
  res.send("sucess");
});

MongoClient.connect(mongourl, (err, res) => {
  if (err) throw err;
  db = res.db('node_practise');
  app.listen(port, err=>console.log(`this server is running on port: ${port}`));
  });

  app.get("/user", (req, res) => {
    db.collection(col_name)
      .find()
      .toArray((err, result) => {
        if (err) {
          res.status(401).send("no data found");
        } else {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
            "Access-Control-Allow_headers",
            "Origin,X-Request-with,Content-type,Accept"
          );
          res.status(200).send(result);
        }
      });
  });


