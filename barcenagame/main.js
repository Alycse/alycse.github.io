var browserScreen = {width: getBrowserScreenWidth(), height: getBrowserScreenHeight()};
var windowWidth = window.width;

function getBrowserScreenWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}
  
function getBrowserScreenHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}

var canvas = document.getElementById('gameCanvas');
canvas.setAttribute("width", browserScreen.width * 2);
canvas.setAttribute("height", browserScreen.height * 2);
var context = canvas.getContext('2d');
context.globalCompositeOperation = 'destination-over';

var worldObjects = new Array();
var updates = new Array();
var declares = new Array();
var inits = new Array();

var landscape = browserScreen.width >= browserScreen.height;

var isMobile = navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i);

if(isMobile){
    addCss("/mobile.css")
}

var locationPathname = window.location.pathname;

var shooterPreloadImages = [
    "/assets/img/shooter/spacecraft.png", 
    "/assets/img/shooter/bullet.png", 
    "/assets/img/shooter/explosion.png", 
    "/assets/img/shooter/rubble.png",
    "/assets/img/button.png", 
    "/assets/img/button-break-1.png", 
    "/assets/img/button-break-2.png", 
    "/assets/img/button-break-3.png",
    "/assets/img/home/crescent-moon.png",
    "/assets/img/home/saturn.png",
    "/assets/img/mobile/mbutton-fire.png",
    "/assets/img/mobile/mbutton-left.png",
    "/assets/img/mobile/mbutton-right.png",
];
var platformerPreloadImages = [
    "/assets/img/platformer/tall-tree.png",
    "/assets/img/platformer/joshua.png", 
    "/assets/img/platformer/joshua-2.png",
    "/assets/img/platformer/platform-1.png",
    "/assets/img/platformer/platform-2.png",
    "/assets/img/platformer/platform-3.png",
    "/assets/img/platformer/special-platform-1.png",
    "/assets/img/platformer/special-platform-2.png",
    "/assets/img/platformer/special-platform-glow.png",
    "/assets/img/platformer/special-platform-glow-2.png",
    "/assets/img/platformer/special-platform-collider.png",
    "/assets/img/platformer/trampoline.png",
    "/assets/img/platformer/trampoline-air-1.png",
    "/assets/img/platformer/trampoline-air-2.png",
    "/assets/img/platformer/teleporter-1.png",
    "/assets/img/platformer/teleporter-2.png",
    "/assets/img/platformer/platformer-tutorial.png",
    "/assets/img/platformer/platformer-tutorial-2.png",
    "/assets/img/platformer/coin-1.png",
    "/assets/img/platformer/coin-2.png",
    "/assets/img/about/speechBubble.png", 
    "/assets/img/projects/aldens-challenge.png", 
    "/assets/img/projects/art-of-peril.png", 
    "/assets/img/projects/tty-mania.png", 
    "/assets/img/projects/browserfarm.png", 
    "/assets/img/projects/colour-shapes.png", 
    "/assets/img/projects/drop-matrix.png", 
    "/assets/img/projects/game-crunch.png", 
    "/assets/img/projects/orb-it.png", 
    "/assets/img/projects/pepega-catch.png", 
    "/assets/img/projects/coronavirus.png", 
    "/assets/img/projects/suzys-trial.png", 
    "/assets/img/projects/lettersnake.png", 
    "/assets/img/projects/they-know.png", 
    "/assets/img/projects/tvwcp.png", 
    "/assets/img/projects/youtube-enhanced-extension.png", 
    "/assets/img/projects/website.png",
    "/assets/img/mobile/mbutton-left.png",
    "/assets/img/mobile/mbutton-right.png",
    "/assets/img/mobile/mbutton-jump.png",
    "/assets/img/mobile/mbutton-drop.png"
];
var carPreloadImages = [
    "/assets/img/car/car.png",
    "/assets/img/car/road.png",
    "/assets/img/car/road-fence.png",
    "/assets/img/car/fence.png",
    "/assets/img/car/car-tutorial.png",
    "/assets/img/car/road-vertical.png",
    "/assets/img/skills/cloud.png",
    "/assets/img/skills/building-collider.png",
    "/assets/img/skills/csharp.png", 
    "/assets/img/skills/javascript.png", 
    "/assets/img/skills/java.png", 
    "/assets/img/skills/python.png", 
    "/assets/img/skills/cplusplus.png", 
    "/assets/img/skills/html5.png", 
    "/assets/img/skills/2/jupyter.png", 
    "/assets/img/skills/2/netbeans.png", 
    "/assets/img/skills/2/pycharm.png", 
    "/assets/img/skills/2/unity.png", 
    "/assets/img/skills/2/visualStudio.png", 
    "/assets/img/skills/2/vscode.png", 
    "/assets/img/skills/construction.png", 
    "/assets/img/skills/page1-sign.png", 
    "/assets/img/skills/page2-sign.png", 
    "/assets/img/skills/exit1-sign.png", 
    "/assets/img/skills/exit2-sign.png", 
    "/assets/img/contact/send-button.png",
    "/assets/img/contact/send-button-break.png",
    "/assets/img/contact/sending.png",
    "/assets/img/contact/sent-success.png",
    "/assets/img/contact/sent-failed.png",
    "/assets/img/contact/sent-failed-too-long.png",
    "/assets/img/contact/tree.png",
    "/assets/img/contact/tree-collider.png",
    "/assets/img/contact/contact-tutorial.png",
    "/assets/img/contact/contact-exit-sign.png",
    "/assets/img/contact/contact-send-sign.png",
    "/assets/img/contact/sending.png",
    "/assets/img/mobile/mbutton-steer-left.png",
    "/assets/img/mobile/mbutton-steer-right.png",
    "/assets/img/mobile/mbutton-forward.png",
    "/assets/img/mobile/mbutton-reverse.png"
];

var images = new Array();

if(locationPathname == "/skills/" || locationPathname == "/skills/2/" || locationPathname == "/contact/"){
    preloadImages(carPreloadImages);
}else if(locationPathname == "/about/" || locationPathname == "/projects/"){
    preloadImages(platformerPreloadImages);
}else{
    preloadImages(shooterPreloadImages);
}

var imagesLength;
var progress = 0;
var loaded = false;
function preloadImages(imagesToPreload){
    for(var i in imagesToPreload){
        images[imagesToPreload[i]] = new Image();
        images[imagesToPreload[i]].src = imagesToPreload[i];
    }
    imagesLength = Object.keys(images).length;
    for(var i in images){
        images[i].onload = imageLoadCheck;
    }
}
function imageLoadCheck() {
    if(!loaded){
        if (progress == imagesLength-1) {
            init();
            loaded = true;

            if(locationPathname == "/"){
                preloadImages(platformerPreloadImages);
                preloadImages(carPreloadImages);
            }
        }else{
            progress++;
        }
    }
}

function addCss(cssSrc){
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssSrc;
    document.getElementsByTagName('head')[0].appendChild(link);
}

if(!isMobile){
    window.addEventListener('resize', function() {
        document.body.style.visibility = "hidden";
        location.reload();
    });
}else{
    window.addEventListener("orientationchange", function() {
        document.body.style.visibility = "hidden";
        location.reload();
    }, false);
}

function addScript(scriptDeclare, scriptInit, scriptUpdate = null){
    if(loaded){
        scriptDeclare();
        scriptInit();
    }else{
        inits.push(scriptInit);
        declares.push(scriptDeclare);
    }
    if(scriptUpdate != null){
        updates.push(scriptUpdate);
    }
}

function init() {
    document.getElementById("gameContent").style.opacity = 0;
    for(var i in declares){
        declares[i]();
    }
    for(var i in inits){
        inits[i]();
    }
    window.requestAnimationFrame(update);
}

document.addEventListener('visibilitychange', function(e) {
    previousTime = new Date().getTime();
});

var previousTime = new Date().getTime();
var deltaTime = 0;
function update(){
    deltaTime = Math.min((new Date().getTime() - previousTime)/1000, 0.05);
    previousTime = new Date().getTime();

    for(var i in updates){
        updates[i]();
    }
    if(fadeOutPage != null){
        if(globalAlpha > 0){
            globalAlpha -= fadeOutSpeed * deltaTime;
        }else{
            globalAlpha = 0;
            window.location.href = fadeOutPage;
            fadeOutPage = null;
        }
    }
    if(fadingIn){
        if(globalAlpha < 1){
            globalAlpha += 4 * deltaTime;
        }else{
            globalAlpha = 1;
            fadingIn = false;
        }
    }

    draw();

    window.requestAnimationFrame(update);
}

var fadeOutPage = null;
var DEFAULT_FADE_OUT_SPEED = 3;
var fadeOutSpeed = DEFAULT_FADE_OUT_SPEED;
function fadeOut(page, speed){
    if(fadeOutPage == null){
        fadeOutPage = page;
        if(speed != null){
            fadeOutSpeed = speed;
        }else{
            fadeOutSpeed = DEFAULT_FADE_OUT_SPEED;
        }
    }
}
var fadingIn = false;
function fadeIn(){
    resetDeltaTime();
    
    globalAlpha = 0;
    fadingIn = true;
}

function resetDeltaTime(){
    previousTime = new Date().getTime();
    deltaTime = 0;
}

function getRealPosition(normalizedPosition){
    return {x: (browserScreen.width/2) + (normalizedPosition.x * (browserScreen.width/2)), 
        y: (browserScreen.height/2) + (normalizedPosition.y * (browserScreen.height/2))};
}
function getNormalizedPosition(realPosition){
    return {x: (realPosition.x - (browserScreen.width/2))/(browserScreen.width/2),
        y: (realPosition.y - (browserScreen.height/2))/(browserScreen.height/2)};
}
function getModifiedNormalizedPosition(worldObject, positionModification){
    var realPosition = getRealPosition(worldObject.position);
    realPosition.x += positionModification.x * worldObject.width;
    realPosition.y += positionModification.y * worldObject.height;
    return getNormalizedPosition(realPosition);
}
function getLeftMostPosition(worldObject){
    return -(browserScreen.width/2)/(browserScreen.width/2) + ((worldObject.width/2)/(browserScreen.width));
}
function getRightMostPosition(worldObject){
    return (browserScreen.width/2)/(browserScreen.width/2) - ((worldObject.width/2)/(browserScreen.width));
}
function getBottomMostPosition(worldObject){
    return (browserScreen.width/2)/(browserScreen.width/2) - ((worldObject.height/2)/(browserScreen.height));
}
function getTopMostPosition(worldObject){
    return -(browserScreen.width/2)/(browserScreen.width/2) + ((worldObject.height/2)/(browserScreen.height));
}
function getExactModifiedNormalizedPosition(worldObject, positionModification){
    var realPosition = getRealPosition(worldObject.position);
    realPosition.x += positionModification.x;
    realPosition.y += positionModification.y;
    return getNormalizedPosition(realPosition);
}
function getExactModifiedRealPosition(worldObject, positionModification){
    var realPosition = getRealPosition(worldObject.position);
    realPosition.x += positionModification.x;
    realPosition.y += positionModification.y;
    return realPosition;
}

var globalAlpha = 1;
function draw() {
    context.clearRect(0, 0, browserScreen.width * 2, browserScreen.height * 2);

    var hovering = false;

    context.globalAlpha = globalAlpha;
    for(var i = 0; i < worldObjects.length; i++){
        for(var name in worldObjects[i]){
            if(worldObjects[i][name].component.name == "image"){
                context.translate(browserScreen.width + (browserScreen.width * worldObjects[i][name].position.x),
                browserScreen.height + (browserScreen.height * worldObjects[i][name].position.y));
                context.rotate(worldObjects[i][name].rotation * Math.PI / 180);
                context.translate(-worldObjects[i][name].width/2, -worldObjects[i][name].height/2);
            } else if(worldObjects[i][name].component.name == "text"){
                context.textAlign = "center";
                context.font = worldObjects[i][name].height + "px " + worldObjects[i][name].component.font;
            }
    
            if(worldObjects[i][name].alpha != null){
                context.globalAlpha = worldObjects[i][name].alpha * globalAlpha;
                document.getElementById("gameContent").style.opacity = globalAlpha;
            }

            if(worldObjects[i][name].component.name == "image"){
                if(isMouseOver(worldObjects[i][name]) || worldObjects[i][name].isHovered){
                    var hoverActivated = false;
                    if(worldObjects[i][name].component.images.hover != null){
                        worldObjects[i][name].changeWorldObjectImage(worldObjects[i][name].component.images.hover);
                        hoverActivated = true;
                    }else if(worldObjects[i][name].component.opacities != null && worldObjects[i][name].component.opacities.hover != null){
                        worldObjects[i][name].changeWorldObjectImage(worldObjects[i][name].component.images.default);
                        worldObjects[i][name].alpha = worldObjects[i][name].component.opacities.hover;
                        hoverActivated = true;
                    }else if(worldObjects[i][name].hoverOpacity != null){
                        worldObjects[i][name].alpha = worldObjects[i][name].hoverOpacity;
                        hoverActivated = true;
                    }else{
                        worldObjects[i][name].changeWorldObjectImage(worldObjects[i][name].component.images.default);
                    }
                    if(hoverActivated && fadeOutPage == null){
                        hovering = true;
                    }
                    for(var j in worldObjects[i][name].children){
                        worldObjects[i][name].children[j].isHovered = true;
                        if(worldObjects[i][name].component.opacities != null){
                            worldObjects[i][name].children[j].hoverOpacity = worldObjects[i][name].component.opacities.hover;
                        }
                    }
                }else{
                    worldObjects[i][name].changeWorldObjectImage(worldObjects[i][name].component.images.default);
                    if(worldObjects[i][name].component.opacities != null){
                        worldObjects[i][name].alpha = worldObjects[i][name].component.opacities.default;
                    }
                    for(var j in worldObjects[i][name].children){
                        worldObjects[i][name].children[j].isHovered = false;
                        if(worldObjects[i][name].component.opacities != null){
                            worldObjects[i][name].children[j].hoverOpacity = null;
                        }
                    }
                }
            } else if(worldObjects[i][name].component.name == "text"){
                if(worldObjects[i][name].isHovered){
                    if(context.fillStyle = worldObjects[i][name].component.colors.hover != null){
                        context.fillStyle = worldObjects[i][name].component.colors.hover;
                    }else if(worldObjects[i][name].component.opacities != null && worldObjects[i][name].component.opacities.hover != null){
                        worldObjects[i][name].alpha = worldObjects[i][name].component.opacities.hover;
                    }
                } else{
                    context.fillStyle = worldObjects[i][name].component.colors.default;
                    if(worldObjects[i][name].component.opacities != null){
                        worldObjects[i][name].alpha = worldObjects[i][name].component.opacities.default;
                    }
                }
            }

            if(worldObjects[i][name].component.name == "image"){
                context.drawImage(worldObjects[i][name].component.image, 0, 0, worldObjects[i][name].width, worldObjects[i][name].height);
            } else if(worldObjects[i][name].component.name == "text"){
                context.fillText(worldObjects[i][name].component.content, 
                    browserScreen.width + (browserScreen.width * worldObjects[i][name].position.x), 
                    browserScreen.height + (worldObjects[i][name].height * 0.4) + (browserScreen.height * worldObjects[i][name].position.y));
            }
            
            context.globalAlpha = globalAlpha;

            if(worldObjects[i][name].component.name == "image"){
                context.translate(worldObjects[i][name].width/2, worldObjects[i][name].height/2);
                context.rotate(-worldObjects[i][name].rotation * Math.PI / 180);
                context.translate(-(browserScreen.width + (browserScreen.width * worldObjects[i][name].position.x)),
                    -(browserScreen.height + (browserScreen.height * worldObjects[i][name].position.y)));
            }
        }
    }

    if(!hovering || fadeOutPage != null){
        document.body.style.cursor = "default";
    }else if (hovering && !isMobile) {
        document.body.style.cursor = "pointer";
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cname) {
    setCookie(cname, "", 0);
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getRandomInteger(min, max) {
    return (Math.random() * (max - min)) + min;
}

document.firstElementChild.style.zoom = "reset";    