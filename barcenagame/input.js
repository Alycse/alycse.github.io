addScript(declareInput, initInput);

function declareInput(){
    window.keysPressed = new Array();
    window.keysPressedOnce = new Array();
    window.previousKeysPressedOnce = new Array();
    
    window.mousePosition = null;

    if(isMobile){
        window.isMouseDown = true;
    }else{
        window.isMouseDown = false;
    }

    window.touchPositions = null;
    
    window.inputs = {
        moveLeft: [65, 37],
        moveRight: [68, 39],
        moveUp: [87, 38],
        moveDown: [83, 40],
        shoot: [32],
        jump: [32]
    }
    
    window.canMouseDownOnce = true;
    window.isMouseDownOnce = false;
}

function initInput(){
    if(!isMobile){
        document.addEventListener('mousemove', function(evt) {
            mousePosition = getMousePosition(evt);
        }, false);
        document.addEventListener('mousedown', function(evt) {
            isMouseDown = true;
            if(canMouseDownOnce){
                isMouseDownOnce = true;
                canMouseDownOnce = false;
            }
        }, false);
        document.addEventListener('mouseup', function(evt) {
            isMouseDown = false;
            isMouseDownOnce = false;
            canMouseDownOnce = true;
        }, false);
    }else{
        document.addEventListener('touchstart', function(evt) {
            touchPositions = getTouchPositions(evt);
            isMouseDownOnce = true;
        }, false);

        document.addEventListener('touchmove', function(evt) {
            touchPositions = getTouchPositions(evt);
        }, false);

        document.addEventListener('touchend', function(evt) {
            touchPositions = getTouchPositions(evt);
            isMouseDownOnce = false;
        }, false);
    }

    document.addEventListener('keydown', function(event) {
        if(!(document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA")){
            if(!keysPressed.includes(event.keyCode)){
                keysPressed.unshift(event.keyCode);
            }
            if(!previousKeysPressedOnce.includes(event.keyCode) && !keysPressedOnce.includes(event.keyCode)){
                previousKeysPressedOnce.unshift(event.keyCode);
                keysPressedOnce.unshift(event.keyCode);
            } 
        }
    });

    document.addEventListener('keyup', function(event) {
        keysPressed = keysPressed.filter(function(key) {
            return key != event.keyCode;
        })
        previousKeysPressedOnce = previousKeysPressedOnce.filter(function(key) {
            return key != event.keyCode;
        })
    });
}

function isInputPressed(input, keyPressed){
    return inputs[input].includes(keyPressed);
}
function isInputPressedOnce(input, keyPressed){
    if(inputs[input].includes(keyPressed)){
        for(var i = keysPressedOnce.length - 1; i >= 0; i--) {
            if(keysPressedOnce[i] === keyPressed) {
                keysPressedOnce.splice(i, 1);
            }
        }
        return true;
    }
    return false;
}

function isPositionOver(position, worldObject){
    var worldObjectRealPosition = {};
    worldObjectRealPosition.x = browserScreen.width * worldObject.position.x;
    worldObjectRealPosition.y = browserScreen.height * worldObject.position.y;
    if(worldObject.component.name == "image"){
        var worldObjectWidth = worldObject.component.image.naturalWidth * worldObject.size * browserScreen.height;
        var worldObjectHeight = worldObject.component.image.naturalHeight * worldObject.size * browserScreen.height;
    }else if(worldObject.component.name == "text"){
        context.font = worldObject.component.font;
        var worldObjectWidth = context.measureText(worldObject.component.content).width * worldObject.size * browserScreen.height;
        var worldObjectHeight = context.measureText(worldObject.component.content).height * worldObjectA.size * browserScreen.height;
    }
    var worldObjectTopEdge = worldObjectRealPosition.y - (worldObjectHeight/2);
    var worldObjectBottomEdge = worldObjectRealPosition.y + (worldObjectHeight/2);
    var worldObjectLeftEdge = worldObjectRealPosition.x - (worldObjectWidth/2);
    var worldObjectRightEdge = worldObjectRealPosition.x + (worldObjectWidth/2);

    return !(position.x < worldObjectLeftEdge || position.x > worldObjectRightEdge ||
        position.y > worldObjectBottomEdge || position.y < worldObjectTopEdge);
}

var touchCount = 0;
function isMouseOver(worldObject){
    if(!isMobile){
        if(mousePosition != null){
            return isPositionOver(mousePosition, worldObject);
        }else{
            return null;
        }
    }else{
        if(touchPositions != null){
            for(var i = 0; i < touchPositions.length; i++){
                if(isPositionOver(touchPositions[i], worldObject)){
                    return true;
                }
            }
            return false;
        }else{
            return null;
        }
    }
}

function isMouseClicked(worldObject){
    return isMouseDown && isMouseOver(worldObject);
}
function isMouseClickedOnce(worldObject){
    if(isMouseDownOnce && isMouseOver(worldObject)){
        isMouseDownOnce = false;
        return true;
    }
    return false;
}

function getMousePosition(event) {
    var rect = canvas.getBoundingClientRect()
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: (x*2) - browserScreen.width, y: (y*2) - browserScreen.height};
}

function getTouchPositions(event) {
    var rect = canvas.getBoundingClientRect()
    var touches = [];
    for(var i in event.touches){
        if(event.touches[i].clientX != undefined){
            var x = event.touches[i].clientX - rect.left;
            var y = event.touches[i].clientY - rect.top;
            touches.push({x: (x*2) - browserScreen.width, y: (y*2) - browserScreen.height});
        }
    }
    return touches;
}