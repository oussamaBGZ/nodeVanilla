const home= async (req, res)=>{
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({data:'this is your data'}))
}

const notFound = async (req, res)=>{
    res.writeHead(404)
    res.end("no routes available")
}

module.exports={
    home,
    notFound
}