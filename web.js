const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('우리 봇은 죽지 않아!!')
})
function keepAlive(){
    server.listen(8080, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;