(function(){
    "user strict";

    var menuOpen = false;

    $(".content-container").click(function() {
        if (menuOpen) {
            toggleMenu();
        }
    });

    $(".popup").popup({ boundary: ".segment" });

    $("#expand-item").click(function() {
        toggleMenu();
    });

    $("#about-item").click(function() {
        hideAllSections();
        $("#about").css("height", "100%");
        $("#about-item").addClass("active");
        showID("#about");
    });

    $("#projects-item").click(function() {
        hideAllSections();
        $("#projects").css("height", "100%");
        $("#projects-item").addClass("active");
        showID("#projects");
    });

    $("#resume-item").click(function() {
        hideAllSections();
        $("#resume").css("height", "100%");
        $("#resume-item").addClass("active");
        showID("#resume");
    });

    $("#courses-item").click(function() {
        hideAllSections();
        $("#courses").css("height", "100%");
        $("#courses-item").addClass("active");
        showID("#courses");
    });

    function hideAllSections() {
        $(".nav-item").removeClass("active");
        $(".content-item").css("height", "0%");
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
            menuOpen = false;
            $(".nav-item-text").fadeOut(150);
            $(".nav").css("width", "50px");
            $(".title").css("margin-top", "0px");
            $(".title").css("margin-left", "0px");
            $(".title").rotate({
                duration:300,
                angle:0,
                center: ["50%", "50%"],
                animateTo:-90
            });
            $("#expand-item .icon").rotate({
                duration:500,
                angle:180,
                animateTo:0
            });
        }
        else {
            menuOpen = true;
            $(".nav-item-text").fadeIn(200);
            $(".nav").css("width", "180px");
            $(".title").css("margin-top", "10px");
            $(".title").css("margin-left", "5px");
            $(".nav-item-text").removeClass("hide");
            $(".title").rotate({
                duration:300,
                angle:-90,
                center: ["50%", "50%"],
                animateTo:0
            });
            $("#expand-item .icon").rotate({
                duration:500,
                angle:0,
                animateTo:180
            });
        }
    }

}());