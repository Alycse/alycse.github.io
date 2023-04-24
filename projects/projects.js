addScript(declareProjects, initProjects, updateProject);

function declareProjects(){
    window.trampolineAir = null;
    window.projectPlatforms = new Array();
    window.projectPlatformGlows = new Array();
    window.projectLogos = new Array();

    window.glowDistanceFromPlatform = -0.05;

    window.steppedProjPlatformProjectId = -1;
    window.openedProjectId = -1;
    window.previousProjPlatform = null;
    window.PLATFORM_GLOW_ANIM_INTERVAL = 0.25;
    window.platformGlowAnimTime = 0;
    window.platformGlowAnimState = true;

    window.exited = false;

    if(isMobile){
        if(landscape){
            window.logoDistanceFromPlatform = -0.125;
            window.logoSize = 0.62;
            window.platformSize = browserScreen.width/3000;
        }else{
            window.logoDistanceFromPlatform = -0.09;
            window.logoSize = 0.8;
            window.platformSize = 0;
        }
    }else{
        window.logoDistanceFromPlatform = -0.095;
        window.logoSize = 0.52;
        window.platformSize = 0.4;
    }

    window.projectSets = [];
}

function initProjects(){
    joshuaRespawnEnabled = false;

    var videos = document.getElementsByTagName("video");
    for(var i in videos){
        if(landscape){
            videos[i].height = browserScreen.height * 0.35;
        }else{
            videos[i].height = browserScreen.width * 0.35;
        }
    }

    ////

    if(landscape){
        if(!isMobile){
            var marginLeft = -0.05;
            var marginTop = 0.4;

            joshua = createWorldObject("Joshua", {name: "image", 
            images: {default: "/assets/img/platformer/joshua.png"}, opacities: {default: 1}}, 
            -0.7 + marginLeft, -1.25 + marginTop, 0, 0.9, 1, "joshua");

            joshua.SPAWN_POSITION = {x: joshua.position.x, y: joshua.position.y};
            joshua.fallSpeed = 0.5;
            joshua.MOVE_SPEED = 0.18;
            joshua.WEIGHT = 3;
            joshua.JUMP_POWER = 1.5;
            joshua.walkAnimationTime = 0;
            joshua.WALK_ANIMATION_INTERVAL = 0.1;
            joshua.walkAnimationState = 0;
            spawnWorldObject(joshua);
            
            var platformStart = createWorldObject("Platform Start", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
                -0.7 + marginLeft, -0.91 + marginTop, 0, 0.55, 1, "platform");
            spawnWorldObject(platformStart);

            //createProjectCategoryText({x: -0.7 + marginLeft, y: -0.81 + marginTop}, "Featured");
            //createProjectCategoryText({x: -0.7 + marginLeft, y: -0.48 + marginTop}, "Old Personal/School Projects");

            var tvwcpPlatform = createProjectPlatform({x: -0.645 + marginLeft, y: -0.35 + marginTop}, "/assets/img/projects/youtube-enhanced-extension.png", 13);
            createProjectPlatform({x: -0.755 + marginLeft, y: -0.35 + marginTop}, "/assets/img/projects/pepega-catch.png", 7);

            createProjectPlatform({x: -0.645 + marginLeft, y: -0.6 + marginTop}, "/assets/img/projects/coronavirus.png", 14);

            createProjectPlatform({x: -0.87 + marginLeft, y: -0.6 + marginTop}, "/assets/img/projects/suzys-trial.png", 1);
            createProjectPlatform({x: -0.53 + marginLeft, y: -0.6 + marginTop}, "/assets/img/projects/colour-shapes.png", 2);
            
            createProjectPlatform({x: -0.53 + marginLeft, y: -0.09 + marginTop}, "/assets/img/projects/drop-matrix.png", 5);
            createProjectPlatform({x: -0.755 + marginLeft, y: -0.09 + marginTop}, "/assets/img/projects/orb-it.png", 6);
            
            createProjectPlatform({x: -0.53 + marginLeft, y: 0.18 + marginTop}, "/assets/img/projects/browserfarm.png", 10);

            var tkPlatform = createProjectPlatform({x: -0.755 + marginLeft, y: -0.6 + marginTop}, "/assets/img/projects/they-know.png", 3);

            createProjectPlatform({x: -0.645 + marginLeft, y: -0.09 + marginTop}, "/assets/img/projects/lettersnake.png", 4);
            createProjectPlatform({x: -0.87 + marginLeft, y: -0.09 + marginTop}, "/assets/img/projects/art-of-peril.png", 9);

            createProjectPlatform({x: -0.755 + marginLeft, y: 0.18 + marginTop}, "/assets/img/projects/aldens-challenge.png", 8);
            createProjectPlatform({x: -0.87 + marginLeft, y: 0.18 + marginTop}, "/assets/img/projects/website.png", 11);
            createProjectPlatform({x: -0.645 + marginLeft, y: 0.18 + marginTop}, "/assets/img/projects/game-crunch.png", 12);

            createProjectPlatform({x: -0.87 + marginLeft, y: -0.35 + marginTop}, "/assets/img/projects/tvwcp.png", 0);

            createProjectPlatform({x: -0.53 + marginLeft, y: -0.35 + marginTop}, "/assets/img/projects/tty-mania.png", 15);

            var tkPlatformRightPoint = 
                getExactModifiedNormalizedPosition(tkPlatform, {x: (tkPlatform.width/1.5), y: 0}).x;

            var elevatorPlatform = createWorldObject("Elevator Platform", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
                tkPlatformRightPoint + 0.25, -0.6 + marginTop, 0, 1.0, 1, "platform");
            initializeMovingPlatform(elevatorPlatform, 1, {a: -0.6 + marginTop, b: 0.5 + marginTop}, 0.3, true);
            spawnWorldObject(elevatorPlatform);

            tutPos = getModifiedNormalizedPosition(joshua, {x:2.4, y:0});
            platformerTutorial = createWorldObject("Platformer Tutorial", {name: "image", 
                images: {default: "/assets/img/platformer/platformer-tutorial-2.png"}, opacities: {default: 0.9}},
                tutPos.x, -1.03 + marginTop, 0, 0.6, 1);
            spawnWorldObject(platformerTutorial);
            
            document.body.style.minHeight = "1000px";
            document.getElementById("intro").style.display = "block";
        }else{
            addCss("/projects/projectsVertical.css");

            joshua = createWorldObject("Joshua", {name: "image", 
            images: {default: "/assets/img/platformer/joshua.png"}, opacities: {default: 1}}, 
            -0.91, -1.0, 0, 0.9, 1, "joshua");

            joshua.SPAWN_POSITION = {x: joshua.position.x, y: joshua.position.y};
            joshua.fallSpeed = 0.5;
            joshua.MOVE_SPEED = 0.18;
            joshua.WEIGHT = 3;
            joshua.JUMP_POWER = 0.8;
            joshua.walkAnimationTime = 0;
            joshua.WALK_ANIMATION_INTERVAL = 0.1;
            joshua.walkAnimationState = 0;
            spawnWorldObject(joshua);
            
            var platformStart = createWorldObject("Platform Start", {name: "image", 
            images: {default: "/assets/img/platformer/platform-1.png"}, opacities: {default: 1}}, 
                -0.91, -0.28, 0, 0.8, 1, "platform");
            spawnWorldObject(platformStart);

            var platformY = -0.24;
            var startingPlatformX = -0.7;

            var tvwcpPlatform = createProjectPlatform({x: startingPlatformX, y: platformY}, "/assets/img/projects/tvwcp.png", 0);

            var tvwcpPlatformRightPoint = 
                getExactModifiedNormalizedPosition(tvwcpPlatform, {x: (tvwcpPlatform.width/1.7), y: 0}).x;

            var tvwcpPlatformLeftPoint = 
                getExactModifiedNormalizedPosition(tvwcpPlatform, {x: -(tvwcpPlatform.width/1.7), y: 0}).x;

            platformStart.position.x = tvwcpPlatformLeftPoint;
            joshua.position.x = tvwcpPlatformLeftPoint;

            var tkPlatform = createProjectPlatform({x: tvwcpPlatformRightPoint, y: platformY}, "/assets/img/projects/suzys-trial.png", 1);

            var platformXDistance = tkPlatform.position.x - tvwcpPlatform.position.x;

            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance), y: platformY}, "/assets/img/projects/colour-shapes.png", 2);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 2), y: platformY}, "/assets/img/projects/they-know.png", 3);

            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 3), y: platformY}, "/assets/img/projects/lettersnake.png", 4);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 4), y: platformY}, "/assets/img/projects/drop-matrix.png", 5);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 5), y: platformY}, "/assets/img/projects/orb-it.png", 6);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 6), y: platformY}, "/assets/img/projects/pepega-catch.png", 7);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 7), y: platformY}, "/assets/img/projects/aldens-challenge.png", 8);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 8), y: platformY}, "/assets/img/projects/art-of-peril.png", 9);

            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 9), y: platformY}, "/assets/img/projects/browserfarm.png", 10);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 10), y: platformY}, "/assets/img/projects/website.png", 11);
            createProjectPlatform({x: tvwcpPlatformRightPoint + (platformXDistance * 11), y: platformY}, "/assets/img/projects/game-crunch.png", 12);
        
            activateMobileLandscapeButtons();
        }
    }else{
        addCss("/projects/projectsVerticalPortrait.css");

        var platformY = -0.48;
        var platformY2 = -0.27;
        var platformY3 = -0.06;
        var startingPlatformX = -0.6;
        var startingPlatformX3Offset = -0.15;
        var platformXDistance = 0.385;

        createProjectPlatform({x: startingPlatformX, y: platformY}, "/assets/img/projects/tvwcp.png", 0);

        createProjectPlatform({x: startingPlatformX + platformXDistance, y: platformY}, "/assets/img/projects/suzys-trial.png", 1);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 2), y: platformY}, "/assets/img/projects/colour-shapes.png", 2);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 3), y: platformY}, "/assets/img/projects/they-know.png", 3);
        
        createProjectPlatform({x: startingPlatformX, y: platformY2}, "/assets/img/projects/lettersnake.png", 4);
        createProjectPlatform({x: startingPlatformX + platformXDistance, y: platformY2}, "/assets/img/projects/drop-matrix.png", 5);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 2), y: platformY2}, "/assets/img/projects/orb-it.png", 6);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 3), y: platformY2}, "/assets/img/projects/pepega-catch.png", 7);
        
        createProjectPlatform({x: startingPlatformX + startingPlatformX3Offset, y: platformY3}, "/assets/img/projects/aldens-challenge.png", 8);
        createProjectPlatform({x: startingPlatformX + platformXDistance + startingPlatformX3Offset, y: platformY3}, "/assets/img/projects/art-of-peril.png", 9);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 2) + startingPlatformX3Offset, y: platformY3}, "/assets/img/projects/browserfarm.png", 10);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 3) + startingPlatformX3Offset, y: platformY3}, "/assets/img/projects/website.png", 11);
        createProjectPlatform({x: startingPlatformX + (platformXDistance * 4) + startingPlatformX3Offset, y: platformY3}, "/assets/img/projects/game-crunch.png", 12);
    }

    document.getElementById("projects").style.display = "block";

    document.body.style.minHeight = "1000px";
    finishLoading();
    fadeIn();
}

function createProjectCategoryText(position, content){
    var categoryText = createWorldObject(content + " Text", {name: "text", font: "VCR_OSD_MONO",
        content: content, 
        colors: {default: "rgb(240, 240, 240)"}, opacities: {default: 1}},
        position.x, position.y, 0, 0.4);
    spawnWorldObject(categoryText);
}

function createProjectPlatform(position, logoSrc, projectId){
    var platform = createWorldObject("Platform " + projectId, {name: "image", 
        images: {default: "/assets/img/platformer/special-platform-1.png"}, opacities: {default: 1}}, 
        position.x, position.y, 0, platformSize, 1, "platform");
    spawnWorldObject(platform);
    platform.projectId = projectId;
    projectPlatforms.push(platform);

    var platformGlow = createWorldObject("Platform " + projectId + " Glow", {name: "image", 
        images: {default: "/assets/img/platformer/special-platform-glow.png"}, opacities: {default: 0}}, 
        platform.position.x, platform.position.y + glowDistanceFromPlatform, 0, platformSize, 2);
    platformGlow.shown = false;
    platformGlow.projectId = projectId;
    spawnWorldObject(platformGlow);
    projectPlatformGlows.push(platformGlow);

    var platformLogo = createWorldObject("Platform " + projectId + " Logo", {name: "image", 
        images: {default: logoSrc}, opacities: {default: 0.6, hover: 0.3}}, 
        platform.position.x, platform.position.y + logoDistanceFromPlatform, 0, logoSize, 1);
    spawnWorldObject(platformLogo);
    platformLogo.projectId = projectId;
    projectLogos.push(platformLogo);

    projectSets[projectId] = {platform: platform, platformGlow: platformGlow, platformLogo: platformLogo};

    return platform;
}

function updateProject(){
    if(joshua != null){
        if(!window.exited && joshua.position.y > 1.1){
            fadeOut("/", 4);
            window.exited = true;
        }

        if(joshua.currentPlatform != null && joshua.currentPlatform.projectId != null){
            if(steppedProjPlatformProjectId != joshua.currentPlatform.projectId){
                steppedProjPlatformProjectId = joshua.currentPlatform.projectId;
                openProject(joshua.currentPlatform.projectId);
                previousProjPlatform = joshua.currentPlatform;
            }
        }else{
            if(steppedProjPlatformProjectId != -1){
                steppedProjPlatformProjectId = -1;
            }
            if(previousProjPlatform != null){
                previousProjPlatform = null;
            }
        }
    }
    
    if(isMouseDown){
        for(var i in projectLogos){
            if(isMouseClickedOnce(projectLogos[i])){
                openProject(projectLogos[i].projectId);
            }
        }
    }

    if(platformGlowAnimTime < PLATFORM_GLOW_ANIM_INTERVAL){
        platformGlowAnimTime += deltaTime;
    }else{
        platformGlowAnimTime = 0;
        platformGlowAnimState = !platformGlowAnimState;
    }
    for(var i in projectPlatformGlows){
        if(!projectPlatformGlows[i].shown && projectPlatformGlows[i].component.opacities.default > 0){
            projectPlatformGlows[i].component.opacities.default = 
                Math.max(projectPlatformGlows[i].component.opacities.default - (deltaTime * 2), 0);
        }else if(projectPlatformGlows[i].shown && projectPlatformGlows[i].component.opacities.default < 0.5){
            projectPlatformGlows[i].component.opacities.default = 
                Math.min(projectPlatformGlows[i].component.opacities.default + (deltaTime * 2), 0.5);
        }
        if(projectPlatformGlows[i].shown){ 
            if(platformGlowAnimState){
                projectPlatformGlows[i].component.images.default = "/assets/img/platformer/special-platform-glow.png";
            }else{
                projectPlatformGlows[i].component.images.default = "/assets/img/platformer/special-platform-glow-2.png";
            }
        }
    }
}

function openProject(projectId){
    if(openedProjectId != -1){
        var projectElement = document.getElementById("project" + openedProjectId);
        projectElement.style.display = "block";
        projectElement.getElementsByClassName("projectVideo")[0].pause();
        projectSets[openedProjectId].platformGlow.shown = false;
        if(!isMobile){
            projectSets[openedProjectId].platformLogo.component.opacities.default = 0.5;
            projectSets[openedProjectId].platformLogo.component.opacities.hover = 0.2;
        }else{
            projectSets[openedProjectId].platformLogo.component.opacities.default = 0.5;
            projectSets[openedProjectId].platformLogo.component.opacities.hover = 0.5;
        }
        projectSets[openedProjectId].platform.component.images.default = "/assets/img/platformer/special-platform-1.png";
        document.getElementById("project" + openedProjectId).style.display = "none";
    }
    openedProjectId = projectId;
    var projectElement = document.getElementById("project" + openedProjectId);
    projectElement.style.display = "block";
    projectElement.getElementsByClassName("projectVideo")[0].play();
    projectSets[openedProjectId].platformGlow.shown = true;
    if(!isMobile){
        projectSets[openedProjectId].platformLogo.component.opacities.default = 1.0;
        projectSets[openedProjectId].platformLogo.component.opacities.hover = 0.7;
    }else{
        projectSets[openedProjectId].platformLogo.component.opacities.default = 1.0;
        projectSets[openedProjectId].platformLogo.component.opacities.hover = 1.0;
    }
    projectSets[openedProjectId].platform.component.images.default = "/assets/img/platformer/special-platform-2.png";
}