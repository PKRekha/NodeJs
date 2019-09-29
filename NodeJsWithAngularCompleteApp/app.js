var express=require('express');
const app=express();

app.use(express.static(__dirname));

const port=process.env.port || 4000;

app.listen(port,err=>{
    if(err) throw err;
});