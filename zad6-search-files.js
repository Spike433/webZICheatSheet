const io = require('console-read-write');
const path = require('path');

async function main() {

    let str= await io.read();
    let rootDelim=str.split(" ");

    const finder = require('findit')(rootDelim[0]);

    finder.on('directory', function (dir, stat, stop) {
        var base = path.basename(dir);
        if (base === '.git' || base === 'node_modules') stop()
        else {

            if(dir.includes(rootDelim[1])) {
                console.log(dir);
            }
        }
    });

    finder.on('file', function (file, stat) {
        console.log(file);
    });
}

main();