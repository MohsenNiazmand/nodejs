import http from 'http';

const server=http.createServer((req,res)=>{
 res.write('Hello nodejs!')
 res.end();
});


server.listen(3000,()=>{
    console.log('HTTP server is Listening on the port 3000')
});