const ping = require('ping');
const express = require('express')
const app = express()
app.all('/', async (req, res) => {
    const host = req.query.host;
    const isAlive = await checkHost(host);
    res.send({
        status: "ok",
        host,
        isAlive,
    });
})
app.listen(process.env.PORT || 3000)


const checkHost = async (host) => {
    return new Promise((resolve, reject) => {
        try {
            ping.sys.probe(host, isAlive => {
                console.log(`Ping - host: ${host}, isAlive: ${isAlive}`);
                resolve(isAlive);
            }, 
            {
                timeout: 3
            });
        }
        catch(e) {
            console.log(e.message);
            reject(e);
        }
    })
}
