addScript(declareHome, initHome, updateHome);

function declareHome(){
    window.crescentMoon = null;
    window.saturn = null;

    window.greetingsText = null;
    window.nameText = null;
    window.infoText = null;
    
    window.aboutMeButton = null;
    window.contactButton = null;
    window.skillsButton = null;
    window.projectsButton = null;
}

function initHome(){
    if(landscape){
        crescentMoon = createWorldObject("Crescent Moon", {name: "image", images: {default: "/assets/img/home/crescent-moon.png"}}, -0.9, -0.5, 0, 0.5, 0);
        saturn = createWorldObject("Saturn", {name: "image", images: {default: "/assets/img/home/saturn.png"}}, 0.8, -0.75, 0, 0.4, 0);
    }else{   
        crescentMoon = createWorldObject("Crescent Moon", {name: "image", images: {default: "/assets/img/home/crescent-moon.png"}}, -0.95, -0.7, 0, 0.4, 0);
        saturn = createWorldObject("Saturn", {name: "image", images: {default: "/assets/img/home/saturn.png"}}, 0.85, -0.75, 0, 0.3, 0);
    }

    spawnWorldObject(crescentMoon);
    spawnWorldObject(saturn);

    if(landscape){
        greetingsText = createWorldObject("Greetings", {name: "text", font: "VCR_OSD_MONO", content: "Hello! My name is", colors: {default: "white"}, 
            opacities: {default: 1}}, 0, -0.54, 0, 0.6);
        nameText = createWorldObject("Name", {name: "text", font: "VCR_OSD_MONO", content: "Joshua Philip Barcena", colors: {default: "white"}, 
            opacities: {default: 1}}, 0, -0.425, 0, 0.8) 
        infoText = createWorldObject("Info", {name: "text", font: "VCR_OSD_MONO", content: "I'm a software developer!", colors: {default: "lightgray"}, 
            opacities: {default: 1}}, 0, -0.315, 0, 0.425);
        
        aboutMeButton = createWorldObject("About Me Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, -0.545, -0.325, 0, 0.95, 1, "button");
        aboutMeButton.health = 3;
        aboutMeText = createWorldObject("About Me Text", {name: "text", font: "VCR_OSD_MONO", content: "ABOUT ME", colors: {default: "white"}, 
            opacities: {default: 1, hover: 0.5}}, -0.545, -0.325, 0, 0.6);
        aboutMeButton.children.push(aboutMeText);
        
        contactButton = createWorldObject("Contact Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, 0.545, -0.325, 0, 0.95, 1, "button");
        contactButton.health = 3;
        contactText = createWorldObject("Contact Text", {name: "text", font: "VCR_OSD_MONO", content: "CONTACT", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, 0.545, -0.325, 0, 0.6);
        contactButton.children.push(contactText);
     
        skillsButton = createWorldObject("Skills Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, -0.175, 0.0, 0, 0.95, 1, "button");
        skillsButton.health = 3;
        skillsText = createWorldObject("Skills Text", {name: "text", font: "VCR_OSD_MONO", content: "SKILLS", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, -0.175, 0.0, 0, 0.6);
        skillsButton.children.push(skillsText);

        projectsButton = createWorldObject("Projects Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, 0.175, 0.0, 0, 0.95, 1, "button");
        projectsButton.health = 3;
        projectsText = createWorldObject("Projects Text", {name: "text", font: "VCR_OSD_MONO", content: "PROJECTS", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, 0.175, 0.0, 0, 0.6);
        projectsButton.children.push(projectsText);
    }else{
        greetingsText = createWorldObject("Greetings", {name: "text", font: "VCR_OSD_MONO", content: "Hello! My name is", colors: {default: "white"}, opacities: {default: 1}}, 0, -0.6, 0, 0.5);
        nameText = createWorldObject("Name", {name: "text", font: "VCR_OSD_MONO", content: "Joshua Philip Barcena", colors: {default: "white"}, opacities: {default: 1}}, 0, -0.5, 0, 0.675) 
        infoText = createWorldObject("Info", {name: "text", font: "VCR_OSD_MONO", content: "Note: This site is best viewed on PC!", colors: {default: "lightgray"}, opacities: {default: 1}}, 0, -0.4, 0, 0.475);

        aboutMeButton = createWorldObject("About Me Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, -0.35, -0.15, 0, 0.675, 1, "button");
        aboutMeButton.health = 3;
        aboutMeText = createWorldObject("About Me Text", {name: "text", font: "VCR_OSD_MONO", content: "ABOUT ME", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, -0.35, -0.15, 0, 0.45);
        aboutMeButton.children.push(aboutMeText);
        
        contactButton = createWorldObject("Contact Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, 0.35, -0.15, 0, 0.675, 1, "button");
        contactButton.health = 3;
        contactText = createWorldObject("Contact Text", {name: "text", font: "VCR_OSD_MONO", content: "CONTACT", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, 0.35, -0.15, 0, 0.45);
        contactButton.children.push(contactText);
     
        skillsButton = createWorldObject("Skills Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, -0.625, 0.1, 0, 0.675, 1, "button");
        skillsButton.health = 3;
        skillsText = createWorldObject("Skills Text", {name: "text", font: "VCR_OSD_MONO", content: "SKILLS", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, -0.625, 0.1, 0, 0.45);
        skillsButton.children.push(skillsText);

        projectsButton = createWorldObject("Projects Button", {name: "image", images: {default: "/assets/img/button.png"}, opacities: {default: 1, hover: 0.5}}, 0.625, 0.1, 0, 0.675, 1, "button");
        projectsButton.health = 3;
        projectsText = createWorldObject("Projects Text", {name: "text", font: "VCR_OSD_MONO", content: "PROJECTS", colors: {default: "white"}, opacities: {default: 1, hover: 0.5}}, 0.625, 0.1, 0, 0.45);
        projectsButton.children.push(projectsText);
    }

    spawnWorldObject(greetingsText);
    spawnWorldObject(nameText);
    spawnWorldObject(infoText);

    spawnWorldObject(aboutMeButton);
    spawnWorldObject(contactButton);
    spawnWorldObject(skillsButton);
    spawnWorldObject(projectsButton);

    finishLoading();
    fadeIn();
}
function updateHome(){
    if(isMouseClickedOnce(aboutMeButton)){
        aboutMeButton.component.images.default = "./assets/img/button-break-3.png";
        despawnWorldObject(aboutMeButton.children[0]);
        aboutMeButton.isHovered = true;
        fadeOut("/about");
    }else if(isMouseClickedOnce(skillsButton)){
        skillsButton.component.images.default = "./assets/img/button-break-3.png";
        despawnWorldObject(skillsButton.children[0]);
        skillsButton.isHovered = true;
        fadeOut("/skills");
    }else if(isMouseClickedOnce(contactButton)){
        contactButton.component.images.default = "./assets/img/button-break-3.png";
        despawnWorldObject(contactButton.children[0]);
        contactButton.isHovered = true;
        if(!isMobile){
            fadeOut("/contact");
        }else{
            fadeOut("/simple/contact/?fromAdvanced=1");
        }
    }else if(isMouseClickedOnce(projectsButton)){
        projectsButton.component.images.default = "./assets/img/button-break-3.png";
        despawnWorldObject(projectsButton.children[0]);
        projectsButton.isHovered = true;
        fadeOut("/projects");
    }

    for(var i in bullets){
        bullets[i].position.y -= bullets[i].speed * deltaTime;
        var button = isCollidedTag(bullets[i], "button");
        if(button != null || bullets[i].position.y <= -0.99){
            if(button != null){
                button.health--;
                if(button.health == 2){
                    button.component.images.default = "./assets/img/button-break-1.png";
                    demolish(bullets[i].position);
                }else if(button.health == 1){
                    button.component.images.default = "./assets/img/button-break-2.png";
                    demolish(bullets[i].position, 1);
                }else{
                    button.component.images.default = "./assets/img/button-break-3.png";
                    despawnWorldObject(button.children[0]);
                    demolish(bullets[i].position, 2);
                    if(button.name == "About Me Button"){
                        fadeOut("/about");
                    }else if(button.name == "Skills Button"){
                        fadeOut("/skills");
                    }else if(button.name == "Projects Button"){
                        fadeOut("/projects");
                    }else if(button.name == "Contact Button"){
                        if(!isMobile){
                            fadeOut("/contact");
                        }else{
                            fadeOut("/simple/contact/?fromAdvanced=1");
                        }
                    }
                }
            }
            explode(bullets[i].position);
            despawnWorldObject(bullets[i]);
            bullets.splice(i, 1);
        }
    }
}