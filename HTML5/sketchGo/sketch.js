var sectionPin = document.querySelector("#pin");
var sectionCatch = document.querySelector("#catch");

var btnPinNew = document.querySelector("#btnPinNew");
btnPinNew.addEventListener("click", showPin);
var btnPinCancel = document.querySelector("#btnPinCancel");
btnPinCancel.addEventListener("click", function() {
    clearSketch();
    showCatch();
});
var btnPinPost = document.querySelector("#btnPinPost");
btnPinPost.addEventListener("click", function() {
   if (geolocation==null) {
       alert("We didn't acquire your location yet to pin your sketch. Please wait.");
   } else {
       // We will save the sketch in the remote database
       var db = firebase.database().ref("sketch");
       var object = db.push();
       object.set({
           key: object.key,
           latitude: geolocation.latitude,
           longitude: geolocation.longitude,
           image: getBase64Image()
       });
       alert("Sketch pinned at this location");
       clearSketch();
       showCatch();
   }
});

showCatch();

function showCatch() {
    sectionPin.style.display = "none";
    sectionCatch.style.display = "block"
}

function showPin() {
    sectionPin.style.display = "block";
    sectionCatch.style.display = "none"
}