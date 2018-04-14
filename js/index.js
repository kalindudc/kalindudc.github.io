(function(){
    "user strict";

    var lockCourses = true;
    var lockA08 = $(".csca08").hasClass("disabled");
    var lockA48 = $(".csca48").hasClass("disabled");

    $(".about-item").click(function() {
        enableItem(".about-item");
        enableSection("#about");
    });

    $(".projects-item").click(function() {
        enableItem(".projects-item");
        enableSection("#projects");
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

    function enableItem(item) {
        $(".item").removeClass("active");
        $(".item").removeClass("custom-active");
        $(item).addClass("active");
    }

    function enableSection(id) {
        $("#about").removeClass("shown");
        $("#projects").removeClass("shown");
        $(id).addClass("shown");
    }

    $(".popup").popup({
      boundary: ".segment"
    });

}());