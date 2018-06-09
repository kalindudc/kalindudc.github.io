(function(){
    "user strict";

    init();

    var menuOpen = false;
    var disableNavPopup = false;

    $(".title").rotate({
        angle: -90,
        center: ["15%", "50%"],
    });


    parseURL();

    $(".content-container").click(function() {
        if (menuOpen) {
            toggleMenu();
        }
    });

    $(".popup").popup({
        boundary: ".segment",
        lastResort: "top center"
    });

    $("#projects .popup").popup({
        boundary: ".segment",
        lastResort: "bottom center"
    });

    $(".expand-item").click(function() {
        toggleMenu();
    });

    $(".about-item").click(function() {
        hideAllSections();
        $("#about").css("height", "100%");
        $(".about-item").addClass("active");
        showID("#about");
    });

    $(".projects-item").click(function() {
        hideAllSections();
        $("#projects").css("height", "100%");
        $(".projects-item").addClass("active");
        showID("#projects");
    });

    $(".resume-item").click(function() {
        hideAllSections();
        $("#resume").css("height", "100%");
        $(".resume-item").addClass("active");
        showID("#resume");
    });

    $(".contact-item").click(function() {
        hideAllSections();
        $("#contact").css("height", "100%");
        $(".contact-item").addClass("active");
        showID("#contact");
    });

    $(".projects-nav-item").click(function() {
        $(".projects-nav .popup").removeClass("active");
        $(this).parent().addClass("active");
        $(".project-item").fadeOut(0);
        $("#project-" + $(this).attr("id")).fadeIn(0);
    });

    function init() {
        hideAllSections();
        $("#about").css("height", "100%");
        $(".about-item").addClass("active");
        showID("#about");
    }

    function hideAllSections() {
        $(".nav-item").removeClass("active");
        $(".content-item").css("height", "0%");
        //$(".content-item").children().css("display", "none");
        hideID("#about");
        hideID("#projects");
        hideID("#resume");
        hideID("#courses");
    }

    function hideID(id) {
        $(id + " .content-sub-item").fadeOut(400);
    }

    function showID(id) {
        $(id + " .content-sub-item").fadeIn(0);
    }

    function toggleMenu() {
        if (menuOpen) {
            if ($(".mobile").css("display") !== "none") {
                $(".nav-item").css("display", "none");
                $(".nav .title").css("display", "none");
                $(".nav").css("height", "50px");
            }

            menuOpen = false;
            $(".nav-item-text").fadeOut(150);
            $(".nav").css("width", "50px");
            $(".title").css("margin-top", "0px");
            $(".title").css("margin-left", "0px");
            $(".title").rotate({
                duration:300,
                angle:0,
                center: ["15%", "50%"],
                animateTo:-90
            });
            $(".expand-item .icon").rotate({
                duration:500,
                angle:180,
                animateTo:0
            });
        }
        else {
            if ($(".mobile").css("display") !== "none") {
                $(".nav-item").css("display", "flex");
                $(".nav .title").css("display", "flex");
                $(".nav").css("height", "100%");
            }

            menuOpen = true;
            $(".nav-item-text").fadeIn(200);
            $(".nav").css("width", "180px");
            $(".title").css("margin-top", "10px !important");
            $(".title").css("margin-left", "5px");
            $(".nav-item-text").removeClass("hide");
            $(".title").rotate({
                duration:300,
                angle:-90,
                center: ["15%", "50%"],
                animateTo:0
            });
            $(".expand-item .icon").rotate({
                duration:500,
                angle:0,
                animateTo:180
            });
        }
    }

    function parseURL() {
        var urlSplit = window.location.href.split("?");
        if (urlSplit.length == 1) {
           return;
        }
        else if (urlSplit.length != 2) {
            window.location = urlSplit[0]+"404.html"
        }
        else {
            if (urlSplit[1] == "courses") {
                hideAllSections();
                $("#courses").css("height", "100%");
                $("#courses-item").addClass("active");
                showID("#courses")
            }
            else if (urlSplit[1] == "projects") {
                hideAllSections();
                $("#projects").css("height", "100%");
                $("#projects-item").addClass("active");
                showID("#projects");
            }
            else if (urlSplit[1] == "about") {
                hideAllSections();
                $("#about").css("height", "100%");
                $("#about-item").addClass("active");
                showID("#about");
            }
            else if (urlSplit[1] == "resume") {
                hideAllSections();
                $("#resume").css("height", "100%");
                $("#resume-item").addClass("active");
                showID("#resume");
            }
        }
        
    }

    $('.disabled').click(function(e){
        e.preventDefault();
    });

}());