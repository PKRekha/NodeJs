var express=require('express');
var app=express();
var port= process.env.port || 4000;

var request=require('request');



const apiurl =
  "http://api.openweathermap.org/data/2.5/forecast/daily?q=Boston&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

  app.listen(port,err=>{
    if(err) throw err;
});


/*app.get('/',(req,res)=>{
    request(apiurl,(err,response,body)=>{
        if(err){
            res.status(404).send('error while connecting to url!!!!!!!!!!');
        }
        else{
            var out = JSON.parse(body);
             res.send(body); 
            //res.send(response); 
        }
    })
    
});
*/

app.get('/',(req,res)=>{
    request(apiurl,(err,response,body)=>{
        if(err){
            res.status(400).send('error while retriving the data from third party api');
        }
        else{
            var out = JSON.parse(body);
            res.status(200).render('index',
                {title:'Weather App',
                    result:out})
        }
    })
});