// deletes all node_module folders.

const fs = require('fs')
const { exec } = require('node:child_process');

const folder = "../"

let relativePath;

exec(`ls -la ${folder}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    else {
        const contents = stdout.split("\n").splice(3,)
        // console.log(contents)
        contents.forEach(fileInfo => {
            if (fileInfo[0] == 'd') { // directory
                const fileIntermediate = fileInfo.split(" ")

                // console.log(fileIntermediate)
                let unformatedFolderName = fileIntermediate.slice(9,)


                if (!fileIntermediate.includes('')) {
                    unformatedFolderName = fileIntermediate.slice(8,)
                }

                let folderName = unformatedFolderName[0]
                if (unformatedFolderName.length > 1) {
                    folderName = formatDirectoryName(unformatedFolderName)
                }
                // console.log(folderName)
                relativePath = `${folder}${folderName}`
                // console.log(relativePath)
                const node_modules_path = `${relativePath}/node_modules`

                try {
                    if (fs.lstatSync(node_modules_path).isDirectory()) {
                        exec(`rm -rf ${node_modules_path}`, (error, stdout, stderr) => {
                            if (error) {
                                console.error(`exec error: ${error}`);
                                return
                            }
                            else {
                                console.log(`Successfully deleted -> ${node_modules_path}`)
                            }
                        })
                    }
                }
                catch (err) {
                    console.log(`node_modules folder doesn't exists at -> ${relativePath}`)
                }
            }
        })
    }
})



function formatDirectoryName(unformatedFolderName) {
    const name = unformatedFolderName.join("\\ ")
    return name
}