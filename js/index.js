(function(){
    "user strict";

    $(".about-item").click(function() {
      enableItem(".about-item");
    });

    $(".projects-item").click(function() {
        enableItem(".projects-item");
    });

    $(".csca08").click(function() {
        enableItem(".courses-item");
    });

    $(".csca48").click(function() {
        enableItem(".courses-item");
    });

    function enableItem(item) {
        $(".item").removeClass("active");
        $(item).addClass("active");
    }

}());