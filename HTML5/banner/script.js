document.addEventListener("DOMContentLoaded", function() {
    var banner = document.querySelector("main");
    var logo = document.querySelector("#logo");
    // var ud = document.querySelector("upsidedown");
    setTimeout(function() {
        var banner = document.querySelector("main");
        banner.style.display 
        banner.className = "visible";
    }, 300);

    banner.addEventListener("mouseover", function(){
        banner.className = "over";
        // logo.className = "upsidedown";
    });
    banner.addEventListener("mouseout", function(){
        banner.className = "visible";
    });
    logo.addEventListener("mouseover", function(){
        logo.className = "overLogo";
    });
    logo.addEventListener("mouseout", function(){
        logo.className = "visible";
    });
    // ud.addEventListener("mouseover", function(){
    //     ud.className = "overLogo";
    // });
})