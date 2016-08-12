var fs = require('fs');

process.stdin.setEncoding('utf8');

var lineReader = require('readline').createInterface({
  input: process.stdin
});

var firstLine = true;
lineReader.on('line', function (line) {
    if (!!line.match("^{{.*}}$")) {
        //Read the file contained between the curly brace (relative to the code execution path)
        process.stdout.write(fs.readFileSync(process.cwd() + line.slice(2, line.length - 2)));
        //Write it out to stdout
        process.stdout.write("\r\n");
        //do it syncronously, since we can't pause the lineReader
    } else {
        if (!firstLine) {
            process.stdout.write("\r\n");
        } else {
            firstLine = false;
        }
        process.stdout.write(line);
    }
});