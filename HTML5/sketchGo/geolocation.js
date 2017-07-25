var geolocation = null;

// We watch for user's geolocation changes
navigator.geolocation.watchPosition(function(position) {
    geolocation = position.coords;
    updateSketches();
}, function() {
    alert("We couldn't locate you");
});

// We update the sketches on the list based on current distance
function updateSketches() {
    var db = firebase.database().ref("sketch");
    var list = db.limitToLast(500);
    var ul = document.querySelector("ul");
    ul.innerHTML = "";

    list.on("child_added", function(child) {
        var sketch = child.val();
        var li = "<li ";
        if (geolocation==null) {
            li += "onclick='noCatch()'>";
        } else {
            var distance = getDistance(geolocation.latitude,
                geolocation.longitude, sketch.latitude,
                sketch.longitude);
            if (distance > 1) {
                li += "onclick='noCatch()'>";
            } else {
                li += "onclick='doCatch(\"" + sketch.key + "\")'>";
            }
        }
        li += "<img src='" + sketch.image + "' width='100' height='100' alt='Sketch'>";
        if (geolocation==null) {
            li += "<p>We didn't locate you yet</p>";
        } else {
            li += "<p>" + distance.toFixed(1) + "km away</p>";
        }
        li += "</li>" 

        ul.innerHTML += li;
    });
}

function noCatch() {
    alert("You are too far away from the sketch to catch it. You need to be within 1km.");
}

function doCatch(key) {
    alert("Congratulations! You caught it!");
    firebase.database().ref("sketch").child(key).remove();
}

/* Calculate distance between two points in Earth in KM */
function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}