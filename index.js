var fs = require('fs');

process.stdin.setEncoding('utf8');


var line = '';
process.stdin.addListener('data', function (data) {

    // pause stream while processing the data
    process.stdin.pause();
    //Split on new lines in case data containes multiple lines
    var lines = data.split(/\r?\n/, -1);
    for (var i = 0; i < lines.length; i++) {
        //Its possible the data is split in the middle of a line
        line += lines[i];
        //if(lines[i].match(".$")) {
            //If the line matches our pattern double curly brace opening and closing the line
            //process.stdout.write(line.match("^{{.*}}$"));
            if (!!lines[i].match("^{{.*}}$")) {
                //Read the file contained between the curly brace (relative to the code execution path)
                //Pipe it to stdout
                //Resume processing the input stream when finished
                process.stdout.write(fs.readFileSync(process.cwd() + line.slice(2, line.length - 2)));
                process.stdout.write("\r\n");
                line = '';
                process.stdin.resume();
                    
    
            } else {
                //Our regex can match the end of the line,
                //But wierdly does not write to stdout. Except on the final line
                process.stdout.write(line + "\r\n");
                line = '';
                process.stdin.resume();
            }
      //  }
    }
});