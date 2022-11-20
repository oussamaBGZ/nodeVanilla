const http=require('http')
const PORT=3000
const hostname = '127.0.0.1';
const scheme="http"

http.createServer((req, res)=>{
    const url=new URL(scheme+"://"+ req.headers.host+req.url)
    const pathName=url.pathname
    const query=url.searchParams
    const method=req.method
    const headers=req.headers
    let payload=''

    req.on('data',raw =>{
        payload+=raw.toString('utf-8')
    })

    req.on('end',()=>{
        console.log(payload)
        res.end("weclome ")

    })
}).listen(PORT, hostname,()=>console.log('server is runing in port '+PORT))