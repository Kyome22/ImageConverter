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
    switch (true) {
        case (/^\/$/).test(req.url):
        getFileSupport(res, "./index.html", "text/html"); break;
        case (/^\/css\/style\.css$/).test(req.url):
        getFileSupport(res, "./css/style.css", "text/css"); break;
        case (/^\/js\/front\.js$/).test(req.url):
        getFileSupport(res, "./js/front.js", "text/javascript"); break;
        case (/^\/api/).test(req.url):
        switch (true) {
            case (/\/ios\.convert$/).test(req.url):
            convertSupport(req, res, "ios"); break;
            case (/\/android\.convert$/).test(req.url):
            convertSupport(req, res, "android"); break;
            case (/\/ios\.download\//).test(req.url):
            downloadSupport(res, "./shed/" + req.url.slice(-9), "ios_img.zip"); break;
            case (/\/android\.download\//).test(req.url):
            downloadSupport(res, "./shed/" + req.url.slice(-9), "android_img.zip"); break;
            default:
            console.log(req.url); break;
        }
        break;
        case (/^\/favicon\.ico$/):
        break;
        default:
        console.log(req.url); break;
    }
}

function getFileSupport(res, path, type) {
    fs.readFile(path, "UTF-8", function(err, data) {
        res.writeHead(200, {"Content-Type" : type});
        res.write(data);
        res.end();
    });
}

function convertSupport(req, res, type) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const dirName = getUniqueStr();
        fs.mkdir("./shed/" + dirName, 0750, function (err) {
            const oldpath = files.userfile.path;
            if (err) {
                fs.unlink(oldpath, function(err) {
                    if (err) throw err;
                });
            } else {
                const extension = (files.userfile.type == "image/png") ? ".png" : ".jpeg";
                fs.rename(oldpath, "./shed/" + dirName + "/original" + extension, function(err) {
                    if (err) throw err;
                    run("/bin/bash ./shell/" + type + ".sh " + "./shed/" + dirName + " /original" + extension, function(result) {
                        res.write(result + "," + dirName);
                        res.end();
                    });
                });
            }
        });
    });
}

function downloadSupport(res, dirName, fileName) {
    res.writeHead(200, {"Content-Type" : "application/zip"});
    const stream = fs.createReadStream(dirName + "/" + fileName);
    stream.on("end", function() {
        exec("rm -rf " + dirName);
    });
    stream.pipe(res);
}

//run shellScript
function run(cmd, callback) {
    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            callback("Failed");
            console.log(err);
        } else {
            callback("Success");
        }
    });
}

//generate unique string
function getUniqueStr() {
    const dateStr = new Date().getTime().toString(16).toUpperCase().slice(-4);
    const randomStr = ("0000" + Math.floor(Math.random() * 65536).toString(16).toUpperCase()).slice(-4);
    return dateStr + "_" + randomStr;
}
