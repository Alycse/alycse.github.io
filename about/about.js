addScript(declareAbout, initAbout, updateAbout);

function declareAbout(){
    window.coins = new Array();
    
    window.bouncePower = 3;
    window.COIN_ANIM_INTERVAL = 0.3;
    window.coinAnimTime = 0;
    window.coinAnimState = 0;

    window.trampolineAir = null;

    window.exited = false;
}

function initAbout(){
    if(landscape){
        joshua = createWorldObject("Joshua", {name: "image", 
            images: {default: "/assets/img/platformer/joshua.png"}, opacities: {default: 1}}, -0.35, -0.8, 0, 0.95, 1, "joshua");
        joshua.SPAWN_POSITION = {x: joshua.position.x, y: joshua.position.y};
        joshua.fallSpeed = 0.5;
        joshua.MOVE_SPEED = 0.25;
        joshua.WEIGHT = 3;
        joshua.JUMP_POWER = 1.4;
        joshua.walkAnimationTime = 0;
        joshua.WALK_ANIMATION_INTERVAL = 0.1;
        joshua.walkAnimationState = 0;
        spawnWorldObject(joshua);

        var joshuaRightPosition = getExactModifiedNormalizedPosition(joshua, {x: joshua.width/2.5, y: 0});

        speechBubble = createWorldObject("Speech Bubble", {name: "image", 
        images: {default: "/assets/img/about/speechBubble.png"}, opacities: {default: 1}}, 
        joshuaRightPosition.x, -0.68, 0, joshua.width/120, 1);
        spawnWorldObject(speechBubble);
        
        var speechBubbleRightPosition = getExactModifiedRealPosition(speechBubble, {x: speechBubble.width/4, y: 0});
        
        document.getElementById("about").style.left = speechBubbleRightPosition.x + "px";

        teleporter = createWorldObject("Teleport", {name: "image", images: {default: "/assets/img/platformer/teleporter-1.png"}, 
            opacities: {default: 1, hover: 0.5}}, 0.65, -0.65, 0, 0.7, 1, "button");
        teleporter.walkAnimationTime = 0;
        teleporter.WALK_ANIMATION_INTERVAL = 0.15;
        teleporter.walkAnimationState = 0;
        teleporterText = createWorldObject("Teleporter Text", {name: "text", font: "VCR_OSD_MONO", content: "TELEPORT BACK HOME!", colors: {default: "#d0b4cf"}, 
            opacities: {default: 1, hover: 0.5}}, 0.65, -0.85, 0, 0.4);
        teleporter.children.push(teleporterText);
        spawnWorldObject(teleporter);

        var platformA = createWorldObject("Platform A", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, -0.35, -0.5, 0, 0.95, 1, "platform");
        spawnWorldObject(platformA);

        var platformB = createWorldObject("Platform B", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, -0.45, -0.17, 0, 0.95, 1, "platform");
        spawnWorldObject(platformB);

        var coin4 = createWorldObject("Coin 4", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            -0.45, -0.3, 0, 0.4, 1);
        spawnWorldObject(coin4, "coin");
        coins.push(coin4);

        var platformC = createWorldObject("Platform C", {name: "image", 
            images: {default: "/assets/img/platformer/platform-2.png"}, opacities: {default: 1}}, -0.6, -0.17, 0, 0.95, 1, "platform");
        initializeMovingPlatform(platformC, 1, {a: -0.07, b: 0.8}, 0.25, true);
        spawnWorldObject(platformC);

        
        var trampoline = createWorldObject("Trampoline", {name: "image", 
            images: {default: "/assets/img/platformer/trampoline.png"}, opacities: {default: 1}}, 
            -0.79, 0.9, 0, 0.95, 1, "platform");
        spawnWorldObject(trampoline);

        trampolineAir = createWorldObject("Trampoline Air", {name: "image", 
        images: {default: "/assets/img/platformer/trampoline-air-1.png"}, opacities: {default: 1}}, 
            -0.79, 0.83, 0, 0.95, 1);
        spawnWorldObject(trampolineAir);
        trampolineAir.animationTime = 0;
        trampolineAir.ANIMATION_INTERVAL = 0.15;
        trampolineAir.animationState = 0;


        var coin1 = createWorldObject("Coin 1", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            -0.77, -0.19, 0, 0.4, 1, "coin");
        spawnWorldObject(coin1);
        coins.push(coin1);

        var coin2 = createWorldObject("Coin 2", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            -0.77, -0.06, 0, 0.4, 1, "coin");
        spawnWorldObject(coin2);
        coins.push(coin2);

        var coin3 = createWorldObject("Coin 3", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            -0.77, 0.07, 0, 0.4, 1, "coin");
        spawnWorldObject(coin3);
        coins.push(coin3);


        var platformH = createWorldObject("Platform H", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, -0.45, 0.9, 0, 0.95, 1, "platform");
        spawnWorldObject(platformH);

        var platformI = createWorldObject("Platform I", {name: "image", 
            images: {default: "/assets/img/platformer/platform-2.png"}, opacities: {default: 1}}, 0.0, 0.9, 0, 0.95, 1, "platform");
        initializeMovingPlatform(platformI, -1, {a: -0.31, b: 0.31}, 0.11);
        spawnWorldObject(platformI);

        
        var platformM = createWorldObject("Platform M", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
            0.45, 0.9, 0, 0.95, 1, "platform");
        spawnWorldObject(platformM);

        var coin5 = createWorldObject("Coin 5", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            0.45, 0.77, 0, 0.4, 1, "coin");
        spawnWorldObject(coin5);
        coins.push(coin5);

        var platformN = createWorldObject("Platform N", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
            0.62, 0.66, 0, 0.95, 1, "platform");
        spawnWorldObject(platformN);

        var coin6 = createWorldObject("Coin 6", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            0.62, 0.53, 0, 0.4, 1, "coin");
        spawnWorldObject(coin6);
        coins.push(coin6);

        var platform1 = createWorldObject("Platform 1", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
            0.62, 0.9, 0, 0.95, 1, "platform");
        spawnWorldObject(platform1);

        var coin7 = createWorldObject("Coin 7", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            0.62, 0.77, 0, 0.4, 1, "coin");
        spawnWorldObject(coin7);
        coins.push(coin7);

        var platform2 = createWorldObject("Platform 2", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
            0.79, 0.9, 0, 0.95, 1, "platform");
        spawnWorldObject(platform2);

        var coin8 = createWorldObject("Coin 8", {name: "image", 
            images: {default: "/assets/img/platformer/coin-1.png"}, opacities: {default: 1}}, 
            0.79, 0.77, 0, 0.4, 1, "coin");
        spawnWorldObject(coin8);
        coins.push(coin8);


        var platformO = createWorldObject("Platform O", {name: "image", 
            images: {default: "/assets/img/platformer/platform-3.png"}, opacities: {default: 1}}, 
            0.625, 0.39, 0, 0.95, 1, "platform");
        spawnWorldObject(platformO);

        var tree = createWorldObject("Tree", {name: "image", 
            images: {default: "/assets/img/platformer/tall-tree.png"}, opacities: {default: 0.4}}, 
            0.625, 0.18, 0, 1.2, 6);
        spawnWorldObject(tree);

        var platformP = createWorldObject("Platform P", {name: "image", 
            images: {default: "/assets/img/platformer/platform-2.png"}, opacities: {default: 1}}, 
            0.72, 0.14, 0, 0.95, 1, "platform");
        initializeMovingPlatform(platformP, 1, {a: 0.52, b: 0.72}, 0.1);
        spawnWorldObject(platformP);

        var platformQ = createWorldObject("Platform Q", {name: "image", 
            images: {default: "/assets/img/platformer/platform-2.png"}, opacities: {default: 1}}, 
            0.52, -0.1, 0, 0.95, 1, "platform");
        initializeMovingPlatform(platformQ, -1, {a: 0.52, b: 0.72}, 0.1);
        spawnWorldObject(platformQ);

        if(isMobile){
            activateMobileButtons();
        }else{
            var platformerTutorial = createWorldObject("Platformer Tutorial", {name: "image", 
                images: {default: "/assets/img/platformer/platformer-tutorial.png"}, opacities: {default: 0.7}},
                -0.72, -0.6, 0, 0.85, 1);
            spawnWorldObject(platformerTutorial);
        }
    }else{
        teleporter = createWorldObject("Teleport", {name: "image", images: {default: "/assets/img/platformer/teleporter-1.png"}, 
            opacities: {default: 1, hover: 0.5}}, 0.0, 0.79, 0, 0.75, 1, "button");
        teleporter.walkAnimationTime = 0;
        teleporter.WALK_ANIMATION_INTERVAL = 0.15;
        teleporter.walkAnimationState = 0;
        teleporterText = createWorldObject("Teleporter Text", {name: "text", font: "VCR_OSD_MONO", content: "TELEPORT BACK HOME!", colors: {default: "#d0b4cf"}, 
            opacities: {default: 1, hover: 0.5}}, 0.0, 0.58, 0, 0.35);
        teleporter.children.push(teleporterText);
        spawnWorldObject(teleporter);
    }
    document.getElementById("about").style.visibility = "visible";

    finishLoading();
    fadeIn();
}

function bounce(trampolinePlatform){
    joshua.fallSpeed = -bouncePower;
    joshua.position.y -= ((trampolinePlatform.component.image.naturalHeight * trampolinePlatform.size)/2);
}

function updateAbout(){
    if(landscape){
        if(isCollided(joshua, teleporter) && !window.exited){
            fadeOut("..", 2);
            window.exited = true;
        }

        if(trampolineAir.animationTime < trampolineAir.ANIMATION_INTERVAL){
            trampolineAir.animationTime += deltaTime;
        }else{
            trampolineAir.animationTime = 0;
            if(trampolineAir.animationState == 0){
                trampolineAir.animationState = 1;
                trampolineAir.component.images.default = "/assets/img/platformer/trampoline-air-1.png";
            }else{
                trampolineAir.animationState = 0;
                trampolineAir.component.images.default = "/assets/img/platformer/trampoline-air-2.png";
            }
        }

        if(coinAnimTime < COIN_ANIM_INTERVAL){
            coinAnimTime += deltaTime;
        }else{
            coinAnimTime = 0;
            if(coinAnimState == 0){
                coinAnimState = 1;
            }else{
                coinAnimState = 0;
            }
        }

        for(var i in coins){
            if(worldObjects[coins[i].layer][coins[i].name] != null){
                if(coinAnimState == 0){
                    coins[i].component.images.default = "/assets/img/platformer/coin-1.png";
                }else{
                    coins[i].component.images.default = "/assets/img/platformer/coin-2.png";
                }
                if(isCollided(joshua, coins[i])){
                    despawnWorldObject(coins[i]);
                }
            }
        }

        if(joshua.currentPlatform != null && joshua.currentPlatform.name == "Trampoline"){
            bounce(joshua.currentPlatform);
        }
    }
    if(!window.exited && isMouseClickedOnce(teleporter)){
        teleporter.isHovered = true;
        fadeOut("..", 1);
        window.exited = true;
    }
}