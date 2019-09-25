import express from express;
import mongo from mongodb;
 const app=express();
 const port=process.env.port | 4000;
 const mongoClient= mongo.mongoClient;
 const db;
 const col_name='names';
 const mongourl='mongodb://localhost:27017';

 mongoClient.connect(mongourl,(err,res)=>{
 if(err){
     ('error while connecting to db');
 }
 res.db('node_practise');
 app.listen(port,err=>'error while connecting to server');
 res.send(`this is server is running on the port and the app1 is alsow running:${port} is same`);
 res.send('app1 is connected');
});
