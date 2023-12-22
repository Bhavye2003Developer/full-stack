const { exec } = require("node:child_process")

exec("python main.py", (err, stdout, stdin) => {
    if (!err) {
        console.log(stdout)
    }
})