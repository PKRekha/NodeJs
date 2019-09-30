import express from 'express';
import redis from 'redis';
import axios from 'axios';
const port=process.env.port || 4000;
const app=express();
const client=redis.createClient({
    host:'localhost',
    port:6379
});


client.on('error',err=>{
    console.log(err);
});

app.get('/dataredis',(req,res)=>{
    const input=req.query.country;
    const url = `https://en.m.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${input}`;
    return client.get(`wiki:${input}`,(err,result)=>{
        if(result){
            const output=JSON.parse(result);
            return res.status(200).json(output);
        }else{
            return axios.get(url)
            .then(response=>{
                const output=response.data;
                client.setex(
                  `wiki:${input}`,
                  3600,
                  JSON.stringify({ source: "Redis api...", ...output })
                );
                return res.status(200).json({source:'Api....',...output});
            })
            .catch(err=>{
                return res.err;
            })
        }
    });

})

app.listen(port,err=>{
    console.log(`server is running on the port: ${port}`);
});

