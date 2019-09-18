var express=require('express');

var productsRouter=express.Router();

var mongodb=require('mongodb').MongoClient;
var url='mongodb://localhost:27017';

function routing(menu){
    productsRouter.route("/").get(function(req, res) {
      mongodb.connect(url,(err,dbCon)=>{
        if(err){
          res.status(404).send('error while connecting...');
        }
        else{
          const dbo=dbCon.db('node_practise');
          dbo.collection('products').find({}).toArray((err,data)=>{
            if(err){
              res.status(404).send('no data...');
            }
            else{
              /*res.status(200).render('products',
              {title:'products page',
              products:data,
              menu})
              */
             res.status(200).json(data);
            }
          })
          
        }
      })
      
    });

    productsRouter.route("/details/:id").get(function(req, res) {
      var {id}=req.params;
      mongodb.connect(url,(err,dbCon)=>{
        if(err){
          res.status(404).send('error while connecting.....');
        }
        else{
          var dbo=dbCon.db('node_practise');
          dbo.collection('products').findOne({_id:id},(err,data)=>{
            if(err){
              res.status(404).send('no data');
            }
            else{
              res.status(200).render('productDetails',
              {title:"products Details page",
            products:data,
          menu})
            }
          })
        }
      })
     
    });

    return productsRouter;
}


module.exports=routing;