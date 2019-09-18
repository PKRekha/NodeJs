var express=require('express');

var moviesRouter=express.Router();

var mongodb=require('mongodb').MongoClient;
var url='mongodb://localhost:27017';

function routing(menu){
    moviesRouter.route('/').get(function(req,res){
        mongodb.connect(url,(err,dbCon)=>{
          if(err){
            res.status(401).send('Error while connecting....');
          }
          else{
            const dbo=dbCon.db('node_practise');
            dbo.collection('movies').find({}).toArray((err,data)=>{
              if(err){
                res.status(401).send('no data.....');
              }
              else{
                res
                  .status(200)
                  .render("movies", 
                  { title: "Movies Page", 
                  movies: data,
                   menu });
              }
            })
          }
        })
   
});

moviesRouter.route('/details/:id').get(function(req,res){
  var id=req.params.id;
  //same as above line-------->var {id}=req.params; 
  mongodb.connect(url,(err,dbCon)=>{
    if(err){
      res.status(404).send('error while connecting....');
    }
    else{
      var dbo=dbCon.db('node_practise');
      dbo.collection('movies').findOne({_id:id},(err, data)=>{
        if(err){
          res.status(404).send('no record....');
        }
        else{
          res.status(200).render('detailsMovies',
          {title:"Movies details page",
        movies:data,
      menu})
        }
      })
    }
  })
    
});
return moviesRouter;
}


module.exports=routing;

// res.render('movies',{title:"Movies Page",movies,menu});