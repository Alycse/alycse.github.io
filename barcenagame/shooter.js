addScript(declareShooter, initShooter, updateShooter);

function declareShooter(){
    window.bullets = new Array();
    window.bulletCount = 0;

    window.spacecraft = null;
}

function initShooter(){
    spacecraft = createWorldObject("Spacecraft", {name: "image", images: {default: "/assets/img/shooter/spacecraft.png"}}, 0, 0.8, 0, 0.25, 0);
    spacecraft.ACCELERATION = 2;
    spacecraft.FRICTION = 4;
    spacecraft.velocity = 0;
    spacecraft.SHOOT_COOLDOWN_TIME = 0.3;
    spacecraft.shootCooldown = 0;

    spawnWorldObject(spacecraft);

    if(isMobile){
        if(landscape){
            leftButton = createWorldObject("Left Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-left.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, -0.8, 0.8, 0, 0.35, 0);
            leftButton.position.x = getLeftMostPosition(leftButton) * 0.98;

            rightButton = createWorldObject("Right Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-right.png"}, 
                opacities: {default: 0.6, hover: 0.3}}, 0.8, 0.8, 0, 0.35, 0);
            rightButton.position.x = getRightMostPosition(rightButton) * 0.98;

            shootButton = createWorldObject("Shoot Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-fire.png"}, 
                opacities: {default: 0.6, hover: 0.3}}, rightButton.position.x, 0.45, 0, 0.35, 0);
        }else{
            leftButton = createWorldObject("Left Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-left.png"}, 
            opacities: {default: 0.6, hover: 0.3}}, -0.8, 0.82, 0, 0.27, 0);
            leftButton.position.x = getLeftMostPosition(leftButton) * 0.98;

            rightButton = createWorldObject("Right Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-right.png"}, 
                opacities: {default: 0.6, hover: 0.3}}, 0.8, 0.82, 0,  0.27, 0);
            rightButton.position.x = getRightMostPosition(rightButton) * 0.98;

            shootButton = createWorldObject("Shoot Button", {name: "image", images: {default: "/assets/img/mobile/mbutton-fire.png"}, 
                opacities: {default: 0.6, hover: 0.3}}, rightButton.position.x, 0.55, 0,  0.27, 0);
        }
        
        spawnWorldObject(leftButton);
        spawnWorldObject(rightButton);
        spawnWorldObject(shootButton);
    }else{
        ///

        leftTipText = createWorldObject("Left Tip Text", {name: "text", font: "VCR_OSD_MONO", content: "[A] or [LEFT ARROW] <<<", 
            colors: {default: "rgb(120, 120, 120)"}, opacities: {default: 1}}, 0, 0.8, 0, 0.4);
        leftTipText.shown = true;
        
        var spacecraftLeftPosition = 
            getExactModifiedNormalizedPosition(spacecraft, {x: (spacecraft.width/4) - (leftTipText.width/2.25), y: 0});    

        leftTipText.position.x = spacecraftLeftPosition.x;

        ///
        
        rightTipText = createWorldObject("Right Tip Text", {name: "text", font: "VCR_OSD_MONO", content: ">>> [D] or [RIGHT ARROW]", 
        colors: {default: "rgb(120, 120, 120)"}, opacities: {default: 1}}, 0, 0.8, 0, 0.4);
        rightTipText.shown = true;

        var spacecraftRightPosition = 
            getExactModifiedNormalizedPosition(spacecraft, {x: (spacecraft.width/4) + (rightTipText.width/3.85), y: 0});    

        rightTipText.position.x = spacecraftRightPosition.x;

        ///

        shootTipText = createWorldObject("Shoot Tip Text", {name: "text", font: "VCR_OSD_MONO", content: "[SPACE BAR]", 
            colors: {default: "rgb(120, 120, 120)"}, opacities: {default: 1}}, 0, 0, 0, 0.5);
        shootTipText.shown = true;

        var spacecraftTopPosition = 
            getExactModifiedNormalizedPosition(spacecraft, {x: 0, y: (spacecraft.height/4) - (shootTipText.height * 4.25)});    

        shootTipText.position.y = spacecraftTopPosition.y;

        ///

        spawnWorldObject(leftTipText);
        spawnWorldObject(rightTipText);
        spawnWorldObject(shootTipText);
    }
}

function updateShooter(){
    var moved = false;
    if(isMobile){
        if(isMouseDown){
            if(isMouseClicked(leftButton)){
                move(-1);
                moved = true;
            }
            if(isMouseClicked(rightButton)){
                move(1);
                moved = true;
            }
            if(isMouseClicked(shootButton)){
                shoot();
            }
        }
    }else{
        if(!leftTipText.shown){
            if(leftTipText.component.opacities.default > 0){
                leftTipText.component.opacities.default = Math.max(leftTipText.component.opacities.default - (5 * deltaTime), 0);
            }
        }
        if(!rightTipText.shown){
            if(rightTipText.component.opacities.default > 0){
                rightTipText.component.opacities.default = Math.max(rightTipText.component.opacities.default - (5 * deltaTime), 0);
            }
        }
        if(!shootTipText.shown){
            if(shootTipText.component.opacities.default > 0){
                shootTipText.component.opacities.default = Math.max(shootTipText.component.opacities.default - (5 * deltaTime), 0);
            }
        }

        shootTipText.position.x = spacecraft.position.x;
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
    for(var i = 0; i < keysPressed.length; i++){
        if(isInputPressed("shoot", keysPressed[i])){
            shoot();
        }
    }

    if(!moved){
        if(spacecraft.velocity > 0){
            spacecraft.velocity = Math.max(spacecraft.velocity - (spacecraft.FRICTION * deltaTime), 0);
        }else if(spacecraft.velocity < 0){
            spacecraft.velocity = Math.min(spacecraft.velocity + (spacecraft.FRICTION * deltaTime), 0);
        }
    }
    spacecraft.position.x += parseFloat(spacecraft.velocity.toFixed(3)) * deltaTime;

    if(spacecraft.position.x > 0.92){
        spacecraft.position.x = 0.92;
        spacecraft.velocity = 0;
    }else if(spacecraft.position.x < -0.92){
        spacecraft.position.x = -0.92;
        spacecraft.velocity = 0;
    }

    if(spacecraft.shootCooldown > 0){
        spacecraft.shootCooldown -= deltaTime;
    }
}

function move(direction){
    spacecraft.velocity += spacecraft.ACCELERATION * direction * deltaTime;
    if(!isMobile && leftTipText.shown){
        leftTipText.shown = false;
        rightTipText.shown = false;
    }
}

function shoot(){
    if(spacecraft.shootCooldown <= 0){
        var bullet = createWorldObject("Bullet " + (bulletCount++), {name: "image", images: {default: "/assets/img/shooter/bullet.png"}}, 
            spacecraft.position.x + 0.002, spacecraft.position.y - 0.1, 0, 0.3, 1);
        bullet.speed = 3;
        if(bulletCount > 100){
            bulletCount = 0;
        }
        spawnWorldObject(bullet);
        bullets.push(bullet);
        spacecraft.shootCooldown = spacecraft.SHOOT_COOLDOWN_TIME;
        if(!isMobile && shootTipText.shown){
            shootTipText.shown = false;
        }
    }
}