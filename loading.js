window.loadingFinished = false;
window.loadingElement = document.getElementById("loading");
window.loadingShown = false;

setInterval(
    function(){
        if(!window.loadingShown && !window.loadingFinished){
            window.loadingElement.style.display = "block";
            window.loadingElement.style.opacity = 0.0;
            window.loadingShown = true;
            checkIncompatibility();
        }
    },
    200
);

function checkIncompatibility(){
    if((navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1)){
        document.getElementById("homeText").style.display = "none";
        document.getElementById("loadingMessage").innerHTML = "Sorry, but your browser is currenlty incompatible!";
        document.getElementById("loadingMessage2").innerHTML = "You may <a href='/simple'>view the Simple version</a> of my site instead!";
    }else if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
        document.getElementById("homeText").style.display = "none";
        document.getElementById("loadingMessage").innerHTML = "Sorry, but your browser is currenlty incompatible!";
        document.getElementById("loadingMessage2").style.display = "none";
        document.getElementById("loading").style.position = "static";
    }
}

setInterval(
    function(){
        if(window.loadingShown){
            if(!window.loadingFinished){
                window.loadingElement.style.opacity = Math.min(parseFloat(window.loadingElement.style.opacity) + 0.05, 1);
            }else{
                if(parseFloat(window.loadingElement.style.opacity) > 0){
                    window.loadingElement.style.opacity = Math.max(parseFloat(window.loadingElement.style.opacity) - 0.05, 0);
                }else if(loadingShown){
                    window.loadingElement.style.display = "none";
                    window.loadingShown = false;
                }
            }
        }
    },
    10
);

function finishLoading(){
    document.getElementById("game").style.opacity = 1;
    loadingFinished = true;
}