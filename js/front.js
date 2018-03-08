const mainObj = document.getElementById("main");
const recommendObj = document.getElementById("recommend");
const sizeW = document.getElementById("w");
const sizeH = document.getElementById("h");
const typeObj = document.getElementById("outputType");
const fileObj = document.getElementById("usrFile");
const submitObj = document.getElementById("submitBtn");

window.onload = function() {
	document.addEventListener("dragover", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	document.addEventListener("dragleave", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	document.addEventListener("drop", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	mainObj.addEventListener("dragover", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	mainObj.addEventListener("dragleave", function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
	});
	mainObj.addEventListener("drop", function(evt) {
		evt.preventDefault();
		let type = evt.dataTransfer.files[0].type;
		if (type == "image/png" || type == "image/jpeg") {
			fileObj.files = evt.dataTransfer.files;
		}
	});
	typeObj.addEventListener("change", function(evt) {
		recommendSize();
	});
	submitObj.addEventListener("click", function(evt) {
		evt.preventDefault();
		let file = fileObj.files[0];
		console.log(file.name + ", " + document.imageUpload.type.value);
		if (file.name != "") {
			upload(document.imageUpload.type.value);
		}
		return false;
	}, false);
	recommendSize();
}

function recommendSize() {
	switch (document.imageUpload.type.value) {
		case "iOS_icon":
		sizeW.innerHTML = 180;
		sizeH.innerHTML = 180;
		recommendObj.style.color = "#000000";
		break;
		case "iOS_univeral":
		sizeW.innerHTML = "?";
		sizeH.innerHTML = "?";
		recommendObj.style.color = "#f1f3f4";
		break;
		case "Android_icon":
		sizeW.innerHTML = 192;
		sizeH.innerHTML = 192;
		recommendObj.style.color = "#000000";
		break;
		default:
	}
}

function upload(type) {
	const httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = function() {
		switch (httpReq.readyState) {
			case 0:
			console.log("uninitialized!"); break;
			case 1:
			console.log("loading..."); break;
			case 2:
			console.log("loaded."); break;
			case 3:
			console.log("interactive... " + httpReq.responseText.length + "bytes."); break;
			case 4:
			if (httpReq.status == 200 || httpReq.status == 304) {
				console.log("COMPLETE! :" + httpReq.responseText);
				const result = httpReq.responseText.split(",");
				if (result[0] == "Success") {
					switch(type) {
						case "iOS_icon":
						setTimeout(function() { download(result[1], "ios_icon"); }, 1000); break;
						case "iOS_universal":
						setTimeout(function() { download(result[1], "ios_universal"); }, 1000); break;
						case "Android_icon":
						setTimeout(function() { download(result[1], "android_icon"); }, 1000); break;
						default: break;
					}
				}
			} else if (httpReq.status == 404) {
				console.log("404 Not Found!");
				httpReq.abort();
			} else {
				console.log("Failed. HttpStatus: " + httpReq.statusText);
				httpReq.abort();
			}
			break;
		}
	}
	switch(type) {
		case "iOS_icon":
		httpReq.open("POST", location.protocol + "//" + document.domain + "/api/ios_icon.convert", false); break;
		case "iOS_universal":
		httpReq.open("POST", location.protocol + "//" + document.domain + "/api/ios_universal.convert", false); break;
		case "Android_icon":
		httpReq.open("POST", location.protocol + "//" + document.domain + "/api/android_icon.convert", false); break;
		default: break;
	}
	let res = httpReq.send(new FormData(document.imageUpload));
}

function download(dirName, type) {
	const link = document.createElement("a");
	document.body.appendChild(link);
	link.href = "./api/" + type + ".download/" + dirName;
	link.download = type + "_img.zip";
	link.click();
	document.body.removeChild(link);
}
