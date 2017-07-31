// Header Links
var lnkPost = document.querySelector("#lnkPost");
var lnkLogOut = document.querySelector("#lnkLogOut");
var lnkLogIn = document.querySelector("#lnkLogIn");
var lnkSignUp = document.querySelector("#lnkSignUp");

lnkLogIn.addEventListener("click", function() {
    clearSections();
    sectionLogIn.style.display = "block";
});
lnkLogOut.addEventListener("click", function() {
    firebase.auth().signOut();
    activateLoggedOut();
});
lnkSignUp.addEventListener("click", function() {
    clearSections();
    sectionSignUp.style.display = "block";
});
lnkPost.addEventListener("click", function() {
    clearSections();
    sectionPost.style.display = "block";
});

// Sections
var sectionSignUp = document.querySelector("#signup"); 
var sectionLogIn  = document.querySelector("#login"); 
var sectionPost   = document.querySelector("#post"); 

// Action Buttons
var btnLogIn = document.querySelector("#btnLogIn");
var btnSignUp = document.querySelector("#btnSignUp");
var btnPostSelfie = document.querySelector("#btnPostSelfie");

btnLogIn.addEventListener("click", function() {
    var email = document.querySelector("#emailLogin").value;
    var pass = document.querySelector("#passLogin").value;
    if (email.length<6 || pass.length <6) {
        alert("Invalid login data");
    } else {
        // We are ok to login the user
        loading(true);
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function() {
                activateLoggedIn();
                clearSections();
                loading(false);
            })
            .catch(function(error) {
                alert(error.message);
                loading(false);
            })
    }
});

btnSignUp.addEventListener("click", function() {
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var pass = document.querySelector("#pass").value;
    var pass2 = document.querySelector("#pass2").value;
    if (name.length<3 || email.length<6 || pass.length<6) {
        alert("You need to enter your Full Name, E-mail address and password -6 characters min-");
    } else {
        if (pass!=pass2) {
            alert("Passwords must match");
        } else {
            // We are ok to register the user
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(function() {
                    // The user was registered
                    alert("User registered");
                    clearSections();
                    activateLoggedIn();
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: name
                    });
                })
                .catch(function(error) {
                    alert("We couldn't register the user." + error.message);
                });
        }
    }
});

var selectedFile;

btnPostSelfie.addEventListener("click", function() {
    // Send the file to Firebase Storage
    var ref = firebase.storage().ref();
    var filename = Math.random().toString(36).substring(2);
    var imageRef = ref.child('photos/' + filename + '.jpg');
    loading(true);
    imageRef.put(selectedFile)
        .then(function(){
            // Save an object in Firebase Database
            // var filterValue = document.querySelector("#filter").value;
            // var rotateValue = document.querySelector("#rotate").value;
            var timeStampValue = 0 - Date.now();
            var db = firebase.database().ref("phoodos");
            var object = db.push();
            object.setWithPriority({
                path: 'photos/' + filename + ".jpg",
                user: firebase.auth().currentUser.displayName,
                timeStamp: timeStampValue,
                                // createdAt: firebase.database.ServerValue.TIMESTAMP,
                // filter: filterValue,
                // rotate: rotateValue
            }, 0 - Date.now());

            alert("Phoodo posted!");
            clearSections();
            loading(false);
        })
        .catch(function(){
            alert("Error uploading the phoodo");
            loading(false);
        })
});

// Post Selfie
var fileSelector = document.querySelector("input[type=file]");
var selfie = document.querySelector("#selfie");
var selfieImage = document.querySelector("#selfieImage");

// var filter = document.querySelector("#filter");
// filter.addEventListener("change", function() {
//     selfieImage.style.filter = filter.value;
// });

// var rotate = document.querySelector("#rotate");
// rotate.addEventListener("change", function() {
//     selfieImage.style.transform = rotate.value;
// });

// Functions
function clearSections() {
    var sections = document.querySelectorAll("main>section");
    for (var section of sections) {
        section.style.display = "none";
    }
    var timeline = document.querySelector("#timeline");
    timeline.style.display = "block";
}

function activateLoggedIn() {
   document.querySelector("#loggedIn").style.display = "block";
   document.querySelector("#loggedOut").style.display = "none"; 

   updateTimeline();

    document.addEventListener("DOMContentLoaded", function(e) {
    sortList();
    });

}
function activateLoggedOut() {
   document.querySelector("#loggedIn").style.display = "none";
   document.querySelector("#loggedOut").style.display = "block"; 
}

function loading(on) {
    var loading = document.querySelector("#loading");
    if (on) {
        loading.style.display = "block";
    } else {
        loading.style.display = "none";
    }
}

// Event listener for File Picker
fileSelector.addEventListener("change", function() {
    var reader = new FileReader();
    reader.addEventListener("load", function(e) {
        selfie.style.display = "block";
        selfieImage.src = e.target.result;
    });
    console.log(fileSelector.files);
    reader.readAsDataURL(fileSelector.files[0]);
    selectedFile = fileSelector.files[0];
});

// If the user is logged in or not
var user = firebase.auth().currentUser;
if (user) {
    // logged in
    activateLoggedIn();
} else {
    // logged out
    activateLoggedOut();
}

function updateTimeline(){
    var ul = document.querySelector("#timeline ul");
    ul.innerHTML = "";
    var db = firebase.database().ref("phoodos/");
    // var list = db.limitToLast(100); // save timestamp and order by orderByChild("timeStamp)"
    var list = db.orderByChild("timeStamp").limitToFirst(100);
    list.on("child_added", function(child) {
        var selfie = child.val();

        // Retrieve the image file
        var storageRef = firebase.storage().ref();
        var imageRef = storageRef.child(selfie.path);
        
        var li = document.createElement("li");
        ul.appendChild(li); // this ensures the <li> is in the right order

        imageRef.getDownloadURL().then(function(url){
        


            var html = "<figure>";
            // li += "<img src='" + url + "' width='100%' alt='Phoodo' style='filter:" + 
            //     selfie.filter + "'>";
            html += "<img src='" + url + "' width='100%' alt='Phoodo'>";
            // li += "<img src='" + url + "' width='100%' alt='Phoodo' style='filter:" + 
            //     selfie.filter + "; transform:" + selfie.rotate + "'>";
            html += "<figcaption class='figcaptionClass'>By " + selfie.user + ": " + selfie.timeStamp + "</figcaption>";
            html += "</figure>";

            li.innerHTML = html;

        })
    console.log("after requesting download url");
    });
}

function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("timelineul");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    b = document.getElementsByClassName("figcaptionClass");
    //Loop through all list items:
    console.log(b);
    console.log(b.length);
    for (i = 0; i < b.length; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*check if the next item should
      switch place with the current item:*/
      console.log(b[i].innerHTML);
      console.log(b[i+1].innerHTML);
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /*if next item is alphabetically lower than current item,
        mark as a switch and break the loop:*/
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark the switch as done:*/
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}