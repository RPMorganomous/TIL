document.addEventListener("DOMContentLoaded", function() {
    var fileSelector = document.querySelector("input[type=file]");
    var qr = document.querySelector("#qr");
    fileSelector.addEventListener("change", function() {
         var reader = new FileReader();
         reader.addEventListener("load", function(e) {
            qrcode.decode(e.target.result);
            qr.style.display = "block";
            qr.src = e.target.result;
         });
         reader.readAsDataURL(fileSelector.files[0]);

	});
});

qrcode.callback = function(data) {
    var output = document.querySelector("output");
    output.innerHTML = "QR Code Data: " + data;
}

function startCamera() {
    navigator.getUserMedia({video: true, audio: true}, function(localMediaStream) {
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    }, function() {
        alert("Error opening the camera");
    });
}

function getSnapshot() {
    var video = document.querySelector('video');
    
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    var ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg');
}  
