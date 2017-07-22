var restaurantName = "Indian Heaven";
var order = [];

window.addEventListener("DOMContentLoaded", function(){
    // alert("Welcome to " + restaurantName);
    updateCart();
    // listening for the cancel link event
    var linkCancel = document.querySelector("#lnkStartOver");
    // alert(linkCancel);
    linkCancel.addEventListener("click", function() {
        var areYouSure = confirm("Are you sure you wish to cancel the order?");
        if (areYouSure) {
            order = [];
            updateCart();
            // alert("order canceled");
        };
    });
    // listening for the meals click
    var meals = document.querySelectorAll(".meal");
    for (var meal of meals) {
        meal.addEventListener("click", function() {
            // alert("I'm a meal");
            var title = this.dataset.title;
            order.push(title);
            updateCart();
            // alert(title);
        });
    }
});

function updateCart() {
    var html = "";
    for (var meal of order) {
        html += "<li>" + meal + "</li>";
    }
    var ul = document.querySelector("#cart ul");
    ul.innerHTML = html;

    var cart = document.querySelector("#cart");
    if (order.length==0) {
        cart.style.backgroundColor = "gray";
    } else {
        cart.style.backgroundColor = "#006";
    };
};

