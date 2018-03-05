// get all attributes keys for UMLS NLP JSON files

 var fs = require('fs');

 function readFiles(dirname, onFileContent, onError, resultSet) {
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
                        onFileContent(filename, content, resultSet);
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

 function onFileContent(filename, content, resultSet) {
    // console.log("parsing " + filename + "...");
    var doc = JSON.parse(content);
    var resultList = doc.result;
    Object.keys(resultList).forEach(function(key) {
        var attributes = resultList[key].attributes;
        for (var k in attributes) {
            if (!resultSet.has(k)) {
                console.log(k);
            }
            resultSet.add(k);
        }
    });
 }



 if (require.main === module) { 

    const resultSet = new Set();

    readFiles("/home/phu/JsonData/DATA IMAGES TO CONVERT ORIGINAL OCR TEXT TO NLP FHIR JSON/", onFileContent, function(err) {
        throw err;
    }, resultSet);

}
