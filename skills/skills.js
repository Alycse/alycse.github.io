addScript(declareSkills, initSkills, updateSkills);

function declareSkills(){
    if(landscape){
        window.carSize = 0.2;
        window.buildingSize = 1.0;
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
    images: {default: "/assets/img/car/car.png"}, opacities: {default: 1}}, 0, 0.85, 0, carSize, 3, "car");
    car.spawnPosition = {x: car.position.x, y: car.position.y};
    car.ACCELERATION = 1.2;
    car.MAX_SPEED = 0.8;
    car.FRICTION = 1.6;
    car.STEERING_SPEED = 120;
    car.velocity = 0;
    car.layer = 0;
    spawnWorldObject(car);

    var url = new URL(window.location.href);
    var carY = url.searchParams.get("carY");
    var carR = url.searchParams.get("carR");
    if(carY != null && carR != null){
        car.position.x = 0.925 + (car.size * 500);
        car.position.y = parseFloat(carY);
        car.rotation = parseFloat(carR);
    }

    if(landscape){
        var buildingPosY = -0.24;
        var programmingBuildingInitialPosX = -0.75;
        var programmingBuildingPosXDiff = 0.3;
        
        if(!isMobile){
            createCloud({x: -0.57, y: -0.76}, 0.8, 0.006, true);
        }

        createCloud({x: -0.85, y: -0.47}, 0.6, 0.018);
        
        createCloud({x: -1.0, y: -0.6}, 0.55, 0.02);

        createCloud({x: -0.1, y: -0.62}, 0.7, 0.02);

        createCloud({x: 0.3, y: -0.42}, 0.6, 0.019);
            
        createCloud({x: 0.82, y: -0.49}, 0.65, 0.02);

        fence = createWorldObject("Fence", {name: "image", 
            images: {default: "/assets/img/car/fence.png"}, opacities: {default: 0.4}},
            0, -buildingPosY * 1.7, 0, 1.5, 3, "fence");

        roadFence = createWorldObject("Road Fence", {name: "image", 
            images: {default: "/assets/img/car/road-fence.png"}, opacities: {default: 0.85}}, 
            0, 0.55, 0, 1.5, 3, "fence");
        
        road = createWorldObject("Road", {name: "image", 
            images: {default: "/assets/img/car/road.png"}, opacities: {default: 1.0}}, 
            0, 0.78, 0, 1.5, 3, "fence");

        //spawnWorldObject(fence);
        spawnWorldObject(roadFence);
        spawnWorldObject(road);
    }else{
        var buildingPosY = -0.1;
        var programmingBuildingInitialPosX = -0.825;
        var programmingBuildingPosXDiff = 0.33;

        if(!isMobile){
            createCloud({x: -0.57, y: -0.55}, 0.45, 0.008, true);
        }

        createCloud({x: -0.85, y: -0.27}, 0.3, 0.018);
        
        createCloud({x: -1.0, y: -0.4}, 0.25, 0.02);

        createCloud({x: -0.3, y: -0.42}, 0.35, 0.02);

        createCloud({x: 0.3, y: -0.22}, 0.3, 0.019);
            
        createCloud({x: 0.82, y: -0.29}, 0.32, 0.02);

        fence = createWorldObject("Fence", {name: "image", 
            images: {default: "/assets/img/car/fence.png"}, opacities: {default: 0.4}}, 
            0, -buildingPosY, 0, 0.75, 3);
            spawnWorldObject(fence);

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

    createSkillBuilding("Java", {x: programmingBuildingInitialPosX, y: buildingPosY},
        "/assets/img/skills/java.png");

    createSkillBuilding("Python", {x: programmingBuildingInitialPosX + programmingBuildingPosXDiff, y: buildingPosY},
        "/assets/img/skills/python.png");

    createSkillBuilding("CSharp", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 2), y: buildingPosY},
        "/assets/img/skills/csharp.png");

    createSkillBuilding("CPlusPlus", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 3), y: buildingPosY},
        "/assets/img/skills/cplusplus.png");

    createSkillBuilding("Javascript", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 4), y: buildingPosY},
        "/assets/img/skills/javascript.png");

    createSkillBuilding("HTML5", {x: programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 5), y: buildingPosY},
        "/assets/img/skills/html5.png");
        
    ///

    if(landscape){ 
        construction = createWorldObject("Construction", {name: "image", 
        images: {default: "/assets/img/skills/construction.png"}, opacities: {default: 1}}, 
        programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 6), 0.45, 0, 0.38, 1);
        spawnWorldObject(construction);

        constructionCollider = createWorldObject("Construction Collider", {name: "image", 
        images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}}, 
        programmingBuildingInitialPosX + (programmingBuildingPosXDiff * 6), 0.46, 0, 0.6, 1, "wall");
        spawnWorldObject(constructionCollider);
    }

    //

    exitSign = createWorldObject("Exit Sign", {name: "image", 
        images: {default: "/assets/img/skills/exit1-sign.png"}, opacities: {default: 1, hover: 0.5}}, 
        0, 0.35, 0, signSize, 0);
        spawnWorldObject(exitSign);

    exitSign.position.x = getLeftMostPosition(exitSign) * 0.98;

    var exitSignBottomPosition = getExactModifiedNormalizedPosition(exitSign, {x: 0, y: exitSign.height/4});

    exitSignCollider = createWorldObject("Exit Sign Collider", {name: "image", 
        images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}},
        exitSign.position.x, exitSignBottomPosition.y, 0, signColliderSize, 0, "wall");
        spawnWorldObject(exitSignCollider);
    
    page2Sign = createWorldObject("Page 2 Sign", {name: "image", 
        images: {default: "/assets/img/skills/page2-sign.png"}, opacities: {default: 1, hover: 0.5}}, 
        0, 0.35, 0, signSize, 0);
        spawnWorldObject(page2Sign);

    page2Sign.position.x = getRightMostPosition(page2Sign) * 0.98;
        
    var page2SignBottomPosition = getExactModifiedNormalizedPosition(page2Sign, {x: 0, y: page2Sign.height/4});

    page2SignCollider = createWorldObject("Page 2 Sign Collider", {name: "image", 
        images: {default: "/assets/img/skills/building-collider.png"}, opacities: {default: 1}},
        page2Sign.position.x, page2SignBottomPosition.y, 0, signColliderSize, 0, "wall");
        spawnWorldObject(page2SignCollider);

    var wall = isCollidedComplexTag({position: {x: car.position.x, y: car.position.y}, 
        rotation: car.rotation, width: car.width, height: car.height}, "wall");
    if(wall){
        car.position.x = 0.5;
        car.rotation = -90;
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

function createCloud(position, size, speed, tutorialCloud = false){
    var cloudSrc = "/assets/img/skills/cloud.png";
    var cloudOpacity = 0.5;
    if(tutorialCloud){
        cloudSrc = "/assets/img/car/car-tutorial.png";
        cloudOpacity = 1.0;
    }
    var cloud = createWorldObject("Cloud " + clouds.length, {name: "image", 
        images: {default: cloudSrc}, opacities: {default: cloudOpacity}}, 
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
    }else if(isMouseClickedOnce(page2Sign)){
        fadeOut("/skills/2/");
    }

    if(car.position.x > 1 + (car.size * 1000) && !window.exited){
        fadeOut("/skills/2/?carY=" + parseFloat(car.position.y.toFixed(2)) + "&carR=" + parseFloat(car.rotation.toFixed(2)), 4);
        window.exited = true;
    }else if(car.position.x < -1 - (car.size * 1000) && !window.exited){
        fadeOut("/", 4);
        window.exited = true;
    }else if(car.position.y > 1 + (car.size * 1000)){
        car.position.y = -1 - (car.size * 1000);
    }else if(car.position.y < -1 - (car.size * 1000)){
        car.position.y = 1 + (car.size * 1000);
    }
}