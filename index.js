var fs = require('fs');

process.stdin.setEncoding('utf8');


var line = '';
process.stdin.addListener('data', function (data) {

    // pause stream while processing the data
    process.stdin.pause();
    //Split on new lines in case data containes multiple lines
    var lines = data.split(/\r?\n/);
    for (var i = 0; i < lines.length; i++) {
        line += lines[i];
        if(lines[i].match(".$")) {
            //If the line matches our pattern double curly brace opening and closing the line
            //process.stdout.write(line.match("^{{.*}}$"));
            if (!!lines[i].match("^{{.*}}$")) {
                //Read the file contained between the curly brace (relative to the code execution path)
                //Pipe it to stdout
                //Resume processing the input stream when finished
                fs.createReadStream(process.cwd() + line.slice(2, line.length - 2)).pipe(process.stdout).on('finish', function () {
                    process.stdout.write("\r\n");
                    line = '';
                    process.stdin.resume();
                    
                });
    
            } else {
                process.stdout.write(line + "\r\n");
                line = '';
                process.stdin.resume();
            }
        }
    }
});