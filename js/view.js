var viewModule = (function() {

var getByClassName = function(name){
    return document.getElementsByClassName(name);
}

var innerText = function(element, text){
    element.innerHTML = text;
}

var getById = function(id){
    return document.getElementById(id);
}

var textContent = function(element){
    return element.textContent;
}

var popup = function (text) {
    var width = 380,
        height = 180,
        left = undefined,
        top = undefined,
        link = 'popup.html',
        name = 'name',
        conf = undefined,
        newwindow = undefined;
    left = (screen.width / 2) - (width / 2);
    top = (screen.height / 2) - height;
    conf = 'height=' + height + ',width=' + width + ', top=' + top + ', left=' + left;
    console.log(text);
    sessionStorage.setItem("text", text);
    console.log(sessionStorage.getItem("text"));
    newwindow = window.open(link, name, conf);
    
    if (window.focus) {
        newwindow.focus()
    }
    return newwindow;
}; 

return{
    getByClassName: getByClassName,
    innerText: innerText,
    getById: getById,
    textContent: textContent,
    popup: popup
}

})();