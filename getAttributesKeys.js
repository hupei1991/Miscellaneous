// get all attributes keys for UMLS NLP JSON files

var fs = require('fs');

 const resultSet = new Set();

 function readFiles(dirname, onFileContent, onError) {
    console.log("Started to parsing files in directory: " + dirname);
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (fs.lstatSync(dirname + filename).isFile()) {
                    if (filename.endsWith("done")) {
                        onFileContent(filename, content);
                    }
                    if (err) {
                        onError(err);
                        return;
                    }
                }
            })
        })
    })
 }

 function onFileContent(filename, content) {
    console.log("parsing " + filename + "...");
    var doc = JSON.parse(content);
    var resultList = doc.result;
    Object.keys(resultList).forEach(function(key) {
        var attributes = resultList[key].attributes;
        for (var k in attributes) {
            resultSet.add(k);
        }
    });
    console.log(resultSet);
 }

 readFiles("./", onFileContent, function(err) {
     throw err;
 });
