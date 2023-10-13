addScript(declareSkills, initSkills, updateSkills);

function declareSkills(){
    if(landscape){
        window.carSize = 0.2;
        window.buildingSize = 0.95;
    }else{
        window.carSize = 0.2 * (browserScreen.width/browserScreen.height);
        window.buildingSize = 0.95 * (browserScreen.width/browserScreen.height);
    }
    
    if(isMobile){
        window.signSize = 0.9 * buildingSize;
        window.signColliderSize = 0.15 * buildingSize;
    }else{
        window.signSize = 0.7 * buildingSize;
        window.signColliderSize = 0.15 * buildingSize;
    }
    
    window.clouds = new Array();

    window.exited = false;
}

function initSkills(){
    car = createWorldObject("Car", {name: "image", 
    images: {default: "/assets/img/car/car.png"}, opacities: {default: 1}}, 0.0, 0.85, 0, carSize,  3, "car");
    car.spawnPosition = {x: car.position.x, y: car.position.y};
    car.ACCELERATION = 1.2;
    car.MAX_SPEED = 0.8;
    car.FRICTION = 1.6;
    car.STEERING_SPEED = 120;
    car.velocity = 0;
    spawnWorldObject(car);

    var url = new URL(window.location.href);
    var carY = url.searchParams.get("carY");
    var carR = url.searchParams.get("carR");
    if(carY != null && carR != null){
        car.position.x = -0.925 - (car.size * 500);
        car.position.y = parseFloat(carY);
        car.rotation = parseFloat(carR);
    }

    if(landscape){
        var buildingPosY = -0.2;
        var programmingBuildingInitialPosX = -0.75;
        var programmingBuildingPosXDiff = 0.3;
        
        createCloud({x: -0.85, y: -0.47}, 0.6, 0.018);
        
        createCloud({x: -1.0, y: -0.6}, 0.55, 0.02);

        createCloud({x: -0.3, y: -0.62}, 0.7, 0.02);

        createCloud({x: 0.3, y: -0.42}, 0.6, 0.019);
            
        createCloud({x: 0.82, y: -0.49}, 0.65, 0.02);

        fence = createWorldObject("Fence", {name: "image", 
            images: {default: "/assets/img/car/fence.png"}, opacities: {default: 0.4}}, 
            0, -buildingPosY * 2, 0, 1.5, 3);
            //spawnWorldObject(fence);

        roadFence = createWorldObject("Road Fence", {name: "image", 
            images: {default: "/assets/img/car/road-fence.png"}, opacities: {default: 0.85}}, 
            0, 0.55, 0, 1.5, 3);
            spawnWorldObject(roadFence);
        
        road = createWorldObject("Road", {name: "image", 
            images: {default: "/assets/img/car/road.png"}, opacities: {default: 1.0}}, 
            0, 0.78, 0, 1.5, 3);
            spawnWorldObject(road);
    }else{
        var buildingPosY = -0.17;
        var programmingBuildingInitialPosX = -0.825;
        var programmingBuildingPosXDiff = 0.33;

        createCloud({x: -0.85, y: -0.27}, 0.3, 0.018);
        
        createCloud({x: -1.0, y: -0.4}, 0.25, 0.02);

        createCloud({x: -0.3, y: -0.42}, 0.35, 0.02);

        createCloud({x: 0.3, y: -0.22}, 0.3, 0.019);
            
        createCloud({x: 0.82, y: -0.29}, 0.32, 0.02);

        fence = createWorldObject("Fence", {name: "image", 
            images: {default: "/assets/img/car/fence.png"}, opacities: {default: 0.4}}, 
            0, -buildingPosY, 0, 0.75, 3);
            //spawnWorldObject(fence);

        roadFence = createWorldObject("Road Fence", {name: "image", 
            images: {default: "/assets/img/car/road-fence.png"}, opacities: {default: 0.85}}, 
            0, 0.55, 0, 0.75, 3);
            spawnWorldObject(roadFence);
        
        road = createWorldObject("Road", {name: "image", 
            images: {default: "/assets/img/car/road.png"}, opacities: {default: 1.0}}, 
            0, 0.78, 0, 0.75, 3);
            spawnWorldObject(road);
    }

    if(isMobile){
        activateMobileButtons(0);
    }

    ///

    createSkillBuilding("NetBeans", {x: programmingBuildingInitialPosX, y: buildingPosY},
        "/assets/img/skills/2/netbeans.png");

    createSkillBuilding("VSCode", {x: programmingBuildingInitialPosX + programmingBuildingPosXDiff, y: buildingPosY},
        "/assets/img/skills/2/vscode.png");

    createSkillBuilding("Visual Studio", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 2), y: buildingPosY},
        "/assets/img/skills/2/visualStudio.png");

    createSkillBuilding("Unity", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 3), y: buildingPosY},
        "/assets/img/skills/2/unity.png");

    createSkillBuilding("jupyter", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 4), y: buildingPosY},
        "/assets/img/skills/2/jupyter.png");

    createSkillBuilding("PyCharm", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 5), y: buildingPosY},
        "/assets/img/skills/2/pycharm.png");

    ///

    exitSign = createWorldObject("Exit Sign", {name: "image", 
        images: {default: "/assets/img/skills/exit2-sign.png"}, opacities: {default: 1, hover: 0.5}}, 
        0.0, 0.35, 0, signSize, 0);
        spawnWorldObject(exitSign);
        
    exitSign.position.x = getRightMostPosition(exitSign) * 0.98;

    var exitSignBottomPosition = getExactModifiedNormalizedPosition(exitSign, {x: 0, y: exitSign.height/4});

    exitSignCollider = createWorldObject("Exit Sign Collider", {name: "image", 
        images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}},
        exitSign.position.x, exitSignBottomPosition.y, 0, signColliderSize, 0, "wall");
        spawnWorldObject(exitSignCollider);

    page1Sign = createWorldObject("Page 1 Sign", {name: "image", 
        images: {default: "/assets/img/skills/page1-sign.png"}, opacities: {default: 1, hover: 0.5}}, 
        0.0, 0.35, 0, signSize, 0);
        spawnWorldObject(page1Sign);
        
    page1Sign.position.x = getLeftMostPosition(page1Sign) * 0.98;

    var page1SignBottomPosition = getExactModifiedNormalizedPosition(page1Sign, {x: 0, y: page1Sign.height/4});

    page1SignCollider = createWorldObject("Page 1 Sign Collider", {name: "image", 
        images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}},
        page1Sign.position.x, page1SignBottomPosition.y, 0, signColliderSize, 0, "wall");
        spawnWorldObject(page1SignCollider);

    var wall = isCollidedComplexTag({position: {x: car.position.x, y: car.position.y}, 
        rotation: car.rotation, width: car.width, height: car.height}, "wall");
    if(wall){
        car.position.x = -0.5;
        car.rotation = 90;
    }

    finishLoading();
    fadeIn();
}

function createSkillBuilding(name, position, imgSrc){
    skillBuilding = createWorldObject(name, {name: "image", 
    images: {default: imgSrc}, opacities: {default: 1}}, 
    position.x, position.y, 0, buildingSize, 1);

    spawnWorldObject(skillBuilding);

    skillBuildingCollider = createWorldObject(name + " Collider", {name: "image", 
    images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}}, 
    position.x, 0, 0, buildingSize, 1, "wall");

    var skillBuildingColliderNewPosY = 
        getExactModifiedNormalizedPosition(skillBuilding, {x: 0, y: (skillBuilding.height/4) - (skillBuildingCollider.height/4)}).y;

    skillBuildingCollider.position.y = skillBuildingColliderNewPosY;

    spawnWorldObject(skillBuildingCollider);
}

function createCloud(position, size, speed){
    cloud = createWorldObject("Cloud " + clouds.length, {name: "image", 
        images: {default: "/assets/img/skills/cloud.png"}, opacities: {default: 0.5}}, 
        position.x, position.y, 0, size, 2);
        cloud.speed = speed;
        cloud.normalizedWidth = (cloud.width / (browserScreen.width * 2));
        spawnWorldObject(cloud);
        clouds.push(cloud);
}

function updateSkills(){
    for(var i in clouds){
        clouds[i].position.x += (deltaTime * clouds[i].speed);
        if(clouds[i].position.x > 1 + clouds[i].normalizedWidth){
            clouds[i].position.x = -1 - clouds[i].normalizedWidth;
        }
    }

    if(isMouseClickedOnce(exitSign)){
        fadeOut("/");
    }else if(isMouseClickedOnce(page1Sign)){
        fadeOut("/skills/");
    }

    if(car.position.x > 1 + (car.size * 1000) && !window.exited){
        fadeOut("/", 4);
        window.exited = true;
    }else if(car.position.x < -1 - (car.size * 1000) && !window.exited){
        fadeOut("/skills/?carY=" + parseFloat(car.position.y.toFixed(2)) + "&carR=" + parseFloat(car.rotation.toFixed(2)), 4);
        window.exited = true;
    }else if(car.position.y > 1 + (car.size * 1000)){
        car.position.y = -1;
    }else if(car.position.y < -1 - (car.size * 1000)){
        car.position.y = 1;
    }
}