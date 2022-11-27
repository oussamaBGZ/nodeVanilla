const response=(res, data, status)=>{
    res.writeHead(status)
    return res.end(data)
}

module.exports ={
    response
}