let mainObj = document.getElementById("main");
let sizeW = document.getElementById("w");
let sizeH = document.getElementById("h");
let typeObj = document.getElementById("outputType");
let fileObj = document.getElementById("usrFile");
let submitObj = document.getElementById("submitBtn");

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
		if (type == "image/jpeg" || type == "image/png") {
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
		case "iOS":
		sizeW.innerHTML = 180;
		sizeH.innerHTML = 180;
		break;
		case "Android":
		sizeW.innerHTML = 192;
		sizeH.innerHTML = 192;
		break;
		default:

	}
}

function upload(type) {
	let httpReq = new XMLHttpRequest();
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
				if (httpReq.responseText == "Success") {
					switch(type) {
						case "iOS":
						setTimeout(function() { download("ios_img.zip"); }, 1000); break;
						case "Android":
						setTimeout(function() { download("android_img.zip"); }, 1000); break;
						default: break;
					}
				}
			} else {
				console.log("Failed. HttpStatus: " + httpReq.statusText);
			}
			break;
		}
	}
	switch(type) {
		case "iOS":
		httpReq.open("POST", "http://localhost:8080/api/ios.convert", false); break;
		case "Android":
		httpReq.open("POST", "http://localhost:8080/api/android.convert", false); break;
		default: break;
	}
	let res = httpReq.send(new FormData(document.imageUpload));
}

function download(fileName) {
	let link = document.createElement("a");
	document.body.appendChild(link);
	link.href = "./down/" + fileName;
	link.download = fileName;
	link.click();
	document.body.removeChild(link);
}
