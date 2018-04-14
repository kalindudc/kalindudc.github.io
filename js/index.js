(function(){
    "user strict";

    var lockCourses = true;
    var lockA08 = true;
    var lockA48 = true;
    var lockResume = true;

    parseURL();

    setLayoutPref();

    window.onresize = function() {setLayoutPref()};

    $(".about-item").click(function() {
        enableItem(".about-item");
        enableSection("#about");
    });

    $(".projects-item").click(function() {
        enableItem(".projects-item");
        enableSection("#projects");
    });

    $(".resume-item").click(function() {
        if (!lockResume) {
            enableItem(".resume-item");
            enableSection("#resume");
        }
    });

    $(".csca08").click(function() {
        if (!lockCourses && !lockA08) {
            enableItem(".courses-item");
            $(".csca08").addClass("custom-active");
        }
    });

    $(".csca48").click(function() {
        if (!lockCourses && !lockA48) {
            enableItem(".courses-item");
            $(".csca48").addClass("custom-active");
        }
    });

    $(".popup").popup({ boundary: ".segment" });

    $(".toggle-sidebar").click(function(){$(".custom-sidebar").sidebar("toggle");});

    function enableItem(item) {
        $(".item").removeClass("active");
        $(".item").removeClass("custom-active");
        $(item).addClass("active");
    }

    function enableSection(id) {
        $("#about").removeClass("shown");
        $("#projects").removeClass("shown");
        $(id).addClass("shown");
        if ($(".custom-sidebar").hasClass("sidebar")) $(".custom-sidebar").sidebar("toggle");
    }

    function setLayoutPref() {
        var width = $(window).width();
        if (width <= 800) {
            $(".custom-sidebar").addClass("sidebar");
        } 
        else {
            $(".custom-sidebar").remove("sidebar");
        }
    }

    function parseURL() {
        var contents = window.location.href.split("?");
        if (contents.length == 2) {
            if (contents[1] === "about") window.location = contents[0];
            else if (contents[1] == "projects") {
                enableItem(".projects-item");
                enableSection("#projects");
            }
            else if (contents[1] == "resume") {
                enableItem(".resume-item");
                enableSection("#resume");
            }
            else {
                var moreConts = contents[1].split("=");
                if (moreConts.length == 2 && moreConts[0] == "course") {
                    if(moreConts[1] === "csca08") {
                        if (!lockCourses && !lockA08) {
                            enableItem(".courses-item");
                            $(".csca08").addClass("custom-active");
                        }
                        else {
                            window.location = contents[0];
                        }
                    }
                    else if (moreConts[1] === "csca48") {
                        if (!lockCourses && !lockA48) {
                            enableItem(".courses-item");
                            $(".csca48").addClass("custom-active");
                        } else {
                            window.location = contents[0];
                        }
                    }
                }
                else {
                    window.location = contents[0] + "404.html";
                }
            }
        }
        else if (contents.length > 2) {
            window.location = contents[0]+"404.html";
        }
    }

}());