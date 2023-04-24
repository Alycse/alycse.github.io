addScript(declareCar, initCar, updateCar);

function declareCar(){
    window.car = null;
    window.bounce = 1;
    
    window.leftButton = null;
    window.rightButton = null;
    window.upButton = null;
    window.downButton = null;
}

function initCar(){
}

function activateMobileButtons(layout){
    var buttonSize = (browserScreen.width * 0.00024);

    if(layout == 0){
        leftButton = createWorldObject("Left Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-steer-left.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        leftButton.position.x = getLeftMostPosition(leftButton) * 0.97;

        rightButton = createWorldObject("Right Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-steer-right.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        rightButton.position.x = getModifiedNormalizedPosition(leftButton, {x: 0.5, y: 0}).x;

        upButton = createWorldObject("Up Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-forward.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        upButton.position.x = getRightMostPosition(upButton) * 0.97;

        downButton = createWorldObject("Down Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-reverse.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        downButton.position.x = getModifiedNormalizedPosition(upButton, {x: -0.5, y: 0}).x;
    }else{
        leftButton = createWorldObject("Left Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-steer-left.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        leftButton.position.x = getLeftMostPosition(leftButton) * 0.97;

        rightButton = createWorldObject("Right Button", {name: "image", 
        images: {default: "/assets/img/mobile/mbutton-steer-right.png"}, 
        opacities: {default: 0.6, hover: 0.3}}, 
        0, 0.8, 0, buttonSize, 0);
        rightButton.position.x = getModifiedNormalizedPosition(leftButton, {x: 0.5, y: 0}).x;

        if(landscape){
            downButton = createWorldObject("Down Button", {name: "image", 
            images: {default: "./assets/img/mobile/mbutton-reverse.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, 
            0, 0.53, 0, buttonSize, 0);
            downButton.position.x = getRightMostPosition(downButton) * 0.97;

            var downButtonTopPosition = getExactModifiedNormalizedPosition(downButton, {x: 0, y: -downButton.height/2});

            upButton = createWorldObject("Up Button", {name: "image", 
            images: {default: "./assets/img/mobile/mbutton-forward.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, 
            downButton.position.x, downButtonTopPosition.y, 0, buttonSize, 0);
        }else{
            downButton = createWorldObject("Down Button", {name: "image", 
            images: {default: "./assets/img/mobile/mbutton-reverse.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, 
            0, 0.75, 0, buttonSize, 0);
            downButton.position.x = getRightMostPosition(downButton) * 0.97;

            var downButtonTopPosition = getExactModifiedNormalizedPosition(downButton, {x: 0, y: -downButton.height/2});

            upButton = createWorldObject("Up Button", {name: "image", 
            images: {default: "./assets/img/mobile/mbutton-forward.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, 
            downButton.position.x, downButtonTopPosition.y, 0, buttonSize, 0);

        }
    }

    spawnWorldObject(leftButton);
    spawnWorldObject(rightButton);
    spawnWorldObject(upButton);
    spawnWorldObject(downButton);

}

function moveUp(){
    if(car.velocity > -car.MAX_SPEED){
        car.velocity -= car.ACCELERATION * deltaTime;
    }else{
        car.velocity = -car.MAX_SPEED;
    }
}

function moveDown(){
    if(car.velocity < car.MAX_SPEED){
        car.velocity += car.ACCELERATION * deltaTime;
    }else{
        car.velocity = car.MAX_SPEED;
    }
}

function rotateLeft(){
    car.rotationDelta = -car.STEERING_SPEED * deltaTime;
}

function rotateRight(){
    car.rotationDelta = car.STEERING_SPEED * deltaTime;
}

function getAngleDistance(alpha, beta) {
    var phi = Math.abs(beta - alpha) % 360;       // This is either the distance or 360 - distance
    var distance = phi > 180 ? 360 - phi : phi;
    return distance;
}

function setCarRotation(rotationDelta){
    car.rotation = (car.rotation + rotationDelta) % 360;
}

function updateCar(){
    if(car != null){
        var moved = false;
        car.rotationDelta = 0;
        if(isMobile){
            if(isMouseDown){
                if(isMouseClicked(leftButton)){
                    rotateLeft();
                }
                if(isMouseClicked(rightButton)){
                    rotateRight();
                }
                if(isMouseClicked(upButton)){
                    moveUp();
                    moved = true;
                }
                if(isMouseClicked(downButton)){
                    moveDown();
                    moved = true;
                }
            }
        }
        for(var i = 0; i < keysPressed.length; i++){
            if(isInputPressed("moveUp", keysPressed[i])){
                moveUp();
                moved = true;
                break;
            }else if(isInputPressed("moveDown", keysPressed[i])){
                moveDown();
                moved = true;
                break;
            }
        }
        for(var i = 0; i < keysPressed.length; i++){
            if(isInputPressed("moveLeft", keysPressed[i])){
                rotateLeft();
                break;
            }else if(isInputPressed("moveRight", keysPressed[i])){
                rotateRight();
                break;
            }
        }
        
        if(!moved){
            if(car.velocity > 0){
                car.velocity = Math.max(car.velocity - (car.FRICTION * deltaTime), 0) * bounce;
            }else if(car.velocity < 0){
                car.velocity = Math.min(car.velocity + (car.FRICTION * deltaTime), 0) * bounce;
            }
        }

        if(bounce < 1){
            bounce += deltaTime;
        }
    
        var carDeltaX = -Math.sin((car.rotation) * Math.PI / 180) * (car.velocity / browserScreen.width) * 1100 * deltaTime;
        var carDeltaY = Math.cos((car.rotation) * Math.PI  / 180) * (car.velocity / browserScreen.height) * 1100 * deltaTime;

        car.position.x += carDeltaX;
        car.position.y += carDeltaY;
        setCarRotation(car.rotationDelta);

        var wall = isCollidedComplexTag({position: {x: car.position.x, y: car.position.y}, rotation: car.rotation, width: car.width, height: car.height}, "wall");
        
        if(wall != null){
            wall.lineBIntersection[0].x = (wall.lineBIntersection[0].x + browserScreen.width)/2;
            wall.lineBIntersection[0].y = (wall.lineBIntersection[0].y + browserScreen.height)/2;
            wall.lineBIntersection[0] = getNormalizedPosition(wall.lineBIntersection[0]);
            wall.lineBIntersection[1].x = (wall.lineBIntersection[1].x + browserScreen.width)/2;
            wall.lineBIntersection[1].y = (wall.lineBIntersection[1].y + browserScreen.height)/2;
            wall.lineBIntersection[1] = getNormalizedPosition(wall.lineBIntersection[1]);
            
            var angleBetweenCarAndWallLinePointA = Math.atan2(wall.lineBIntersection[0].y-car.position.y, wall.lineBIntersection[0].x-car.position.x) * (180 / Math.PI);
            var angleBetweenCarAndWallLinePointB = Math.atan2(wall.lineBIntersection[1].y-car.position.y, wall.lineBIntersection[1].x-car.position.x) * (180 / Math.PI);
            angleBetweenCarAndWallLinePointA += 90;
            angleBetweenCarAndWallLinePointB += 90;
            angleBetweenCarAndWallLinePointA = angleBetweenCarAndWallLinePointA % 360;
            angleBetweenCarAndWallLinePointB = angleBetweenCarAndWallLinePointB % 360;

            car.position.x -= carDeltaX;
            car.position.y -= carDeltaY;
            setCarRotation(-car.rotationDelta);

            if(getAngleDistance(car.rotation, angleBetweenCarAndWallLinePointA) < getAngleDistance(car.rotation, angleBetweenCarAndWallLinePointB)){
                var angleAdjustment = -car.velocity  * 1000 * deltaTime;
            }else{
                var angleAdjustment = -car.velocity * -1000 * deltaTime;
            }
            
            if(!isCollidedComplexTag({position: {x: car.position.x, y: car.position.y}, rotation: (car.rotation + angleAdjustment) % 360, 
                width: car.width, height: car.height}, "wall")){
                setCarRotation(angleAdjustment);
            }

            car.velocity = 0.0;

            car.collidingWall = wall;
        }else{
            car.collidingWall = null;
        }
    }
}