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
    var email = document.querySelector("#email").value;
    var pass = document.querySelector("#pass").value;
    if (email.length<6 || pass.length <6) {
        alert("Invalid login data");
    } else {
        // We are ok to login the user
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
                    // User created
                    activateLoggedIn();
                    alert("OK")
                })
                .catch(function(error) {
                    alert("User can't be created: " + error.message);
                });
        }
    }
});
btnPostSelfie.addEventListener("click", function() {

});



// Post Selfie
var fileSelector = document.querySelector("input[type=file]");
var selfie = document.querySelector("#selfie");
var selfieImage = document.querySelector("#selfieImage");

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
});
