const fs = require('fs')

function log(date, agent, ip, route, method, statusCode) {
    const new_log = `${ip} - - [${date}] "${method} ${route}" ${statusCode}  - - ${agent}\n`
    fs.appendFile("./logs.txt", new_log, (error) => {
        if (error) {
            console.log(`Error occured: ${error}`)
        }
    })
}


module.exports = { log }