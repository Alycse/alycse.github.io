addScript(declarePlatformer, initPlatformer, updatePlatformer);

window.onkeydown = function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
};

function declarePlatformer(){
    window.joshua = null;
    window.teleporter = null;
    window.joshuaRespawnEnabled = true;

    window.mobileButtonsActivated = false;
    window.mobileLandscapeButtonsActivated = false;
    
    window.movingPlatforms = new Array();
    window.teleporterPullPower = 0;
    window.previousPlatform = null;

    window.leftButton = null;
    window.rightButton = null;
    window.jumpButton = null;
    window.dropButton = null;
}

function initPlatformer(){

}

function activateMobileButtons(){
    leftButton = createWorldObject("Left Button", {name: "image", 
    images: {default: "./assets/img/mobile/mbutton-left.png"}, 
    opacities: {default: 0.6, hover: 0.3}}, 
    0, 0.8, 0, 0.325, 0);
    leftButton.position.x = getLeftMostPosition(leftButton) * 0.97;

    rightButton = createWorldObject("Right Button", {name: "image", 
    images: {default: "./assets/img/mobile/mbutton-right.png"}, 
    opacities: {default: 0.6, hover: 0.3}}, 
    0, 0.8, 0, 0.325, 0);
    rightButton.position.x = getModifiedNormalizedPosition(leftButton, {x: 0.5, y: 0}).x;

    dropButton = createWorldObject("Drop Button", {name: "image", 
    images: {default: "./assets/img/mobile/mbutton-drop.png"}, 
    opacities: {default: 0.6, hover: 0.3}}, 
    0, 0.8, 0, 0.325, 0);
    dropButton.position.x = getRightMostPosition(dropButton) * 0.97;

    jumpButton = createWorldObject("Jump Button", {name: "image", 
    images: {default: "./assets/img/mobile/mbutton-jump.png"}, 
    opacities: {default: 0.6, hover: 0.3}}, 
    dropButton.position.x, 0.49, 0, 0.325, 0);
    
    spawnWorldObject(leftButton);
    spawnWorldObject(rightButton);
    spawnWorldObject(dropButton);
    spawnWorldObject(jumpButton);

    mobileButtonsActivated = true;
}
function activateMobileLandscapeButtons(){
    leftButton = createWorldObject("Left Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-left.png"}, 
    opacities: {default: 0.5, hover: 0.2}}, -0.85, -0.65, 0, 0.3, 0);
    leftButton.position.x = getLeftMostPosition(leftButton) * 0.98;
    rightButton = createWorldObject("Right Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-right.png"}, 
    opacities: {default: 0.5, hover: 0.2}}, 0.85, -0.65, 0, 0.3, 0);
    rightButton.position.x = getRightMostPosition(rightButton) * 0.98;

    spawnWorldObject(leftButton);
    spawnWorldObject(rightButton);

    mobileLandscapeButtonsActivated = true;
    mobileButtonsActivated = true;
}

function move(direction){
    joshua.position.x += ((browserScreen.height/browserScreen.width) * (joshua.MOVE_SPEED*1.5)) * direction * deltaTime;
}

function jump(platform){
    joshua.fallSpeed = -joshua.JUMP_POWER;
    joshua.position.y -= ((platform.component.image.naturalHeight * platform.size)/2);
}

function drop(){
    joshua.position.y += (groundCollisionAllowance / (browserScreen.height * 0.5));
}

function initializeMovingPlatform(platformWorldObject, initialMoveDirection, points, moveSpeed, vertical = false){
    platformWorldObject.moveDirection = initialMoveDirection;
    platformWorldObject.points = points;
    platformWorldObject.moveSpeed = moveSpeed;
    platformWorldObject.vertical = vertical;
    
    movingPlatforms.push(platformWorldObject);
}

function updatePlatformer(){
    for(var i in movingPlatforms){
        if(!movingPlatforms[i].vertical){
            if(movingPlatforms[i].moveDirection == -1){
                if(movingPlatforms[i].position.x > movingPlatforms[i].points.a){
                    movingPlatforms[i].position.x -= movingPlatforms[i].moveSpeed * deltaTime;
                }else{
                    movingPlatforms[i].moveDirection = 1;
                }
            }else{
                if(movingPlatforms[i].position.x < movingPlatforms[i].points.b){
                    movingPlatforms[i].position.x += movingPlatforms[i].moveSpeed * deltaTime;
                }else{
                    movingPlatforms[i].moveDirection = -1;
                }
            }
        }else{
            if(movingPlatforms[i].moveDirection == -1){
                if(movingPlatforms[i].position.y > movingPlatforms[i].points.a){
                    movingPlatforms[i].position.y -= movingPlatforms[i].moveSpeed * deltaTime;
                }else{
                    movingPlatforms[i].moveDirection = 1;
                }
            }else{
                if(movingPlatforms[i].position.y < movingPlatforms[i].points.b){
                    movingPlatforms[i].position.y += movingPlatforms[i].moveSpeed * deltaTime;
                }else{
                    movingPlatforms[i].moveDirection = -1;
                }
            }
        }
    }

    if(joshua != null){
        if(fadeOutPage == null){
            var platformMovementDeltaY = 0;
            if(joshua.currentPlatform != null){
                if(previousPlatform != null && joshua.currentPlatform.name == previousPlatform.name){
                    joshua.position.x = joshua.position.x + (joshua.currentPlatform.position.x - previousPlatform.position.x);
                    joshua.position.y = joshua.position.y + (joshua.currentPlatform.position.y - previousPlatform.position.y);
                    
                    platformMovementDeltaY = (joshua.currentPlatform.position.y - previousPlatform.position.y);
                }
            }
            var platform = isCollidedGroundTag(joshua, "platform", (joshua.fallSpeed + platformMovementDeltaY) * deltaTime);
            joshua.currentPlatform = platform;
            if(platform == null){
                if(previousPlatform != null){
                    previousPlatform = null;
                }
                joshua.position.y += joshua.fallSpeed * deltaTime;
                joshua.fallSpeed += joshua.WEIGHT * deltaTime;
            }else if(joshua.fallSpeed > 0){
                joshua.fallSpeed = 0.2;
                joshua.position.y = platform.position.y -
                    ((platform.component.image.naturalHeight * platform.size)/2).toFixed(4) - ((joshua.component.image.naturalHeight * joshua.size)/2).toFixed(4);
                
                previousPlatform = {name: joshua.currentPlatform.name, 
                    position: {x: joshua.currentPlatform.position.x, y: joshua.currentPlatform.position.y}};
            }
        }else{
            if(teleporter != null){
                teleporterPullPower += deltaTime * 10;
                joshua.position.x -= (joshua.position.x - teleporter.position.x) * deltaTime * teleporterPullPower;
                joshua.position.y -= (joshua.position.y - teleporter.position.y) * deltaTime * teleporterPullPower;
                joshua.width *= 0.95;
                joshua.height *= 0.95;
            }
        }

        var moved = false;
        if(mobileButtonsActivated){
            if(isMouseDown){
                if(isMouseClicked(leftButton)){
                    move(-1);
                    moved = true;
                }else if(isMouseClicked(rightButton)){
                    move(1);
                    moved = true;
                }
                if(!mobileLandscapeButtonsActivated){
                    if(isMouseClickedOnce(jumpButton) && platform != null){
                        jump(platform);
                    }else if(isMouseClickedOnce(dropButton) && platform != null){
                        drop();
                    }
                }
            }
        }
        for(var i = 0; i < keysPressed.length; i++){
            if(isInputPressed("moveLeft", keysPressed[i])){
                move(-1);
                moved = true;
                break;
            }else if(isInputPressed("moveRight", keysPressed[i])){
                move(1);
                moved = true;
                break;
            }
        }
        for(var i = 0; i < keysPressedOnce.length; i++){
            if(isInputPressedOnce("jump", keysPressedOnce[i]) && platform != null){
                jump(platform);
                break;
            }else if(isInputPressedOnce("moveDown", keysPressedOnce[i]) && platform != null){
                drop();
                break;
            }
        }

        if(moved){
            joshua.walkAnimationTime += deltaTime;
            if(joshua.walkAnimationTime >= joshua.WALK_ANIMATION_INTERVAL){
                if(joshua.walkAnimationState == 0 && platform != null){
                    joshua.walkAnimationState = 1;
                    joshua.component.images.default = "/assets/img/platformer/joshua-2.png";
                }else{
                    joshua.walkAnimationState = 0;
                    joshua.component.images.default = "/assets/img/platformer/joshua.png";
                }
                joshua.walkAnimationTime = 0.0;
            }
        }else{
            joshua.walkAnimationTime = 0.0;
            joshua.walkAnimationState = 0;
            joshua.component.images.default = "/assets/img/platformer/joshua.png";
        }

        if(joshuaRespawnEnabled && joshua.position.y > 1){
            joshua.fallSpeed = 1;
            joshua.position.x = joshua.SPAWN_POSITION.x;
            joshua.position.y = joshua.SPAWN_POSITION.y;
        }
    }

    if(teleporter != null){
        teleporter.walkAnimationTime += deltaTime;
        if(teleporter.walkAnimationTime >= teleporter.WALK_ANIMATION_INTERVAL){
            if(teleporter.walkAnimationState == 0){
                teleporter.walkAnimationState = 1;
                teleporter.component.images.default = "/assets/img/platformer/teleporter-1.png";
            }else{
                teleporter.walkAnimationState = 0;
                teleporter.component.images.default = "/assets/img/platformer/teleporter-2.png";
            }
            teleporter.walkAnimationTime = 0.0;
        }
    }
}