var popup = (function(){
    
    $("#return").click(function () {
        window.close();
    });

    $("#popup-text").text(sessionStorage.getItem("text"));

})();