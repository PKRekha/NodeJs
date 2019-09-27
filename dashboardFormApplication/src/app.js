import express from "express";
import mongo from "mongodb";
import bodyParser from "body-parser";
import { RSA_NO_PADDING } from "constants";
const app=express();
const mongoClient=mongo.MongoClient;
const port= process.env.port || 4000;
let db;
const col_name='names';
const mongourl='mongodb://localhost:27017/';
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

mongoClient.connect(mongourl,(err,res)=>{
    if(err) throw err;
    db=res.db('node_practise');
    app.listen(port,err=>console.log(`this server is running on port ${port}`));
});


/*health check , it should be there always for every application
, it will be used to check always by the server whether the 
application is running properly or not
*/

app.get('/health',(req,res)=>{
    res.send('sucess');
});

app.get('/',(req,res)=>{
    
    //var id=Math.floor(Math.random()*1000);
    db.collection(col_name).find().toArray((err,result)=>{
        if (err) throw err;
        res.render('index',{data:result});
        //res.send(result);
        
    })

})

app.get('/new',(req,res)=>{
    var id=Math.floor(Math.random()*1000);
    db.collection(col_name).find().toArray((err,result)=>{
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow_headers','Origin,X-Request-with,Content-type, Accept');
        //res.send(result);
        res.render('admin',{id:id});
    })
});

app.post('/addUser',(req,res)=>{
    var convertedData={
        "id":parseInt(req.body.id),
        "name":req.body.name
    }
    db.collection(col_name).insertOne(convertedData,(err,result)=>{
        if(err){
            res.status(401).send('error while inserting the record in to the collection'+col_name);
        }else{
            res.setHeader('Access-Control-Allow-Origin','*');
            res.setHeader('Access-Control-Allow_headers','Origin,X-Request-with, Content-type,Accept');
            //res.status(200).send('record is inserted sucessfully.....');
            res.redirect('/');
        }
    })
});


app.post("/find_by_id", (req, res) => {
  let name = req.body.name;

  db.collection(col_name)

    .find({ name: name })

    .toArray((err, result) => {
      if (err) throw err;

      res.send(result);
    });
});

app.put('/editUser',(req,res)=>{
    db.collection(col_name).findOneAndUpdate({name:req.body.name},
        {
            $set:{
                id:req.body.id,
                name:req.body.name
            }
        },{
            upsert:true
        },(err,result)=>{
            if(err){
                res.status(401).send('error while editing the record from the collection :'+col_name);
            }else{
                res.setHeader('Access-Control-Allow-Origin','*');
                res.setHeader('Access-Control-Allow_headers','Origin,X-Request-with,Content-type,Accept');
                res.status(200).send('Record edited sucess in the collection :'+col_name);
            }
        });

});

        app.delete('/removeUser',(req,res)=>{
            db.collection(col_name).findOneAndDelete({"name":req.body.name},(err,result)=>{
                if(err){
                    res.status(401).send('error while removing record from the collection :'+ col_name);
                }else{
                    res.setHeader('Access-Control-Allow-Origin','*');
                    res.setHeader('Access-Control-Allow_headers','Origin,X-Request-with,Content-type,Accept');
                    res.status(200).send('record deleted from the collection :'+col_name);
                }
            })
        })
