//load module
const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const exec = require("child_process").exec;
//open local server
const server = http.createServer();
server.on("request", fileRequest);
server.listen(process.env.VMC_APP_PORT || 8080);
console.log("Server running ...");
console.log("http://localhost:8080");


function fileRequest(req, res) {
    switch(req.url) {
        case "/":
        fs.readFile("./index.html", "UTF-8", function(err, data) {
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.write(data);
            res.end();
        });
        break;
        case "/css/style.css":
        fs.readFile("./css/style.css", "UTF-8", function(err, data) {
            res.writeHead(200, {"Content-Type" : "text/css"});
            res.write(data);
            res.end();
        });
        break;
        case "/js/front.js":
        fs.readFile("./js/front.js", "UTF-8", function(err, data) {
            res.writeHead(200, {"Content-Type" : "text/javascript"});
            res.write(data);
            res.end();
        });
        break;
        case "/api/ios.convert":
        convertSupport(req, res, "ios"); break;
        case "/api/android.convert":
        convertSupport(req, res, "android"); break;
        case "/down/ios_img.zip":
        downloadSupport(res, "./down/ios_img.zip"); break;
        case "/down/android_img.zip":
        downloadSupport(res, "./down/android_img.zip"); break;
        default:
        console.log(req.url);
        break;
    }
}

function convertSupport(req, res, type) {
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        let oldpath = files.userfile.path;
        let newpath = "./up/" + files.userfile.name.replace(/\s/g, "");
        console.log(oldpath + ",  " + newpath);
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            run("/bin/bash ./shell/" + type + ".sh " + files.userfile.name.replace(/\s/g, ""), function(result) {
                res.write(result);
                res.end();
            });
        });
    });
}

function downloadSupport(res, path) {
    res.writeHead(200, {"Content-Type" : "application/zip"});
    fs.createReadStream(path).pipe(res);
    setTimeout(function() {
        exec("rm -f " + path, function(err, stdout, stderr) {
            if (err) { console.log(err); }
        });
    }, 2000);
}

//run shellScript
function run(cmd, callback) {
    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            callback("Failed");
            console.log(err);
        }
        //console.log("stdout: " + stdout);
        //console.log("stderr: " + stderr);
        callback("Success");
    });
}
