addScript(declareContact, initContact, updateContact);

function declareContact(){
    if(landscape){
        window.carSize = 0.2;
    }else{
        window.carSize = 0.2 * (browserScreen.width/browserScreen.height);
    }

    window.nameInput = document.getElementById("name");
    window.emailInput = document.getElementById("email");
    window.messageInput = document.getElementById("message");

    window.sendButton = null;
    window.sentFailed = null;
    window.sentSuccess = null;
    window.sentLong = null;
    
    window.exited = false;

    window.exitSign = null;
}

function initContact(){
    if(landscape){
        car = createWorldObject("Car", {name: "image", 
        images: {default: "/assets/img/car/car.png"}, opacities: {default: 1}}, 0, 0.85, 0, carSize, 3, "car");
        car.spawnPosition = {x: car.position.x, y: car.position.y};
        car.ACCELERATION = 1.2;
        car.MAX_SPEED = 0.8;
        car.FRICTION = 1.6;
        car.STEERING_SPEED = 120;
        car.velocity = 0;

        var messageTextAreaCols = parseInt(browserScreen.width * 0.23);
        var messageTextAreaRows = parseInt(browserScreen.height * 0.12);
        document.getElementById("message").style.width = messageTextAreaCols;
        document.getElementById("message").style.height = messageTextAreaRows;
        
        var messageInputFieldCols = parseInt(browserScreen.width * 0.23);
        document.getElementById("email").style.width = messageInputFieldCols;
        document.getElementById("name").style.width = messageInputFieldCols;

        var messageRect = document.getElementById("message").getBoundingClientRect();
        var messageNormalizedPos = getNormalizedPosition({x: messageRect.left, y: messageRect.bottom});
  
        sendButton = createWorldObject("Send Button", {name: "image", images: {default: "/assets/img/contact/send-button.png"}, 
        opacities: {default: 1, hover: 0.5}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.5, 1, "wall");
        sendButton.position.y += (sendButton.height / (browserScreen.height * 2) * 2.2);
        sendButton.position.x += (sendButton.width / (browserScreen.width * 2));

        sentSuccess = createWorldObject("Sent Success", {name: "image", images: {default: "/assets/img/contact/sent-success.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.65, 1);
        sentSuccess.position.y += (sentSuccess.height / (browserScreen.height * 2) * 17.2);
        sentSuccess.position.x += (sentSuccess.width / (browserScreen.width * 2));

        sentFailed = createWorldObject("Sent Failed", {name: "image", images: {default: "/assets/img/contact/sent-failed.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.65, 1);
        sentFailed.position.y += (sentFailed.height / (browserScreen.height * 2) * 17.2);
        sentFailed.position.x += (sentFailed.width / (browserScreen.width * 2));

        sentLong = createWorldObject("Sent Long", {name: "image", images: {default: "/assets/img/contact/sent-failed-too-long.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.65, 1);
        sentLong.position.y += (sentLong.height / (browserScreen.height * 2) * 17.2);
        sentLong.position.x += (sentLong.width / (browserScreen.width * 2));

        sending = createWorldObject("Sending", {name: "image", images: {default: "/assets/img/contact/sending.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.65, 1);
        sending.position.y += (sending.height / (browserScreen.height * 2) * 14.2);
        sending.position.x += (sending.width / (browserScreen.width * 2));

        road = createWorldObject("Road", {name: "image", 
            images: {default: "/assets/img/car/road-vertical.png"}, opacities: {default: 1.0}}, 
            0, 0.78, 0, 1.0, 5);
            spawnWorldObject(road);

        createTree("Tree 1", {x: 0.9, y: 0.7}, 1.0, "/assets/img/contact/tree.png");
        createTree("Tree 2", {x: 0.9, y: -0.7}, 1.0, "/assets/img/contact/tree.png");
        createTree("Tree 3", {x: 0.9, y: -0.0}, 1.0, "/assets/img/contact/tree.png");
        createTree("Tree 4", {x: -0.9, y: 0.7}, 1.0, "/assets/img/contact/tree.png");
        createTree("Tree 5", {x: -0.9, y: -0.7}, 1.0, "/assets/img/contact/tree.png");
        createTree("Tree 6", {x: -0.9, y: -0.0}, 1.0, "/assets/img/contact/tree.png");

        ///

        var roadLeftPosition = getExactModifiedNormalizedPosition(road, {x: -road.width/3, y: 0});

        sendSign = createWorldObject("Send Sign", {name: "image", images: {default: "/assets/img/contact/contact-send-sign.png"}, 
        opacities: {default: 1}}, roadLeftPosition.x, 0.55, 0, 0.5, 1);
        spawnWorldObject(sendSign);
        
        sendSignCollider = createWorldObject("Send Sign Collider", {name: "image", 
        images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1.0}}, 
        sendSign.position.x, 0, 0, 0.3, 0, "wall");
        spawnWorldObject(sendSignCollider);


        var sendSignColliderNewPosY = 
            getExactModifiedNormalizedPosition(sendSign, 
                {x: 0, y: (sendSign.height/4) - (sendSignCollider.height/4)}).y;

        sendSignCollider.position.y = sendSignColliderNewPosY;

        ///

        var roadRightPosition = getExactModifiedNormalizedPosition(road, {x: road.width/3, y: 0});

        exitSign = createWorldObject("Exit Sign", {name: "image", images: {default: "/assets/img/contact/contact-exit-sign.png"}, 
        opacities: {default: 1, hover: 0.5}}, roadRightPosition.x, 0.55, 0, 0.5, 1);
        spawnWorldObject(exitSign);
        
        exitSignCollider = createWorldObject("Exit Sign Collider", {name: "image", 
        images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1.0}}, 
        exitSign.position.x, 0, 0, 0.3, 0, "wall");
        spawnWorldObject(exitSignCollider);

        var exitSignColliderNewPosY = 
            getExactModifiedNormalizedPosition(exitSign, 
                {x: 0, y: (exitSign.height/4) - (exitSignCollider.height/4)}).y;

        exitSignCollider.position.y = exitSignColliderNewPosY;
        
        if(!isMobile){
            contacTutorial = createWorldObject("Contact Tutorial", {name: "image", 
            images: {default: "/assets/img/contact/contact-tutorial.png"}, opacities: {default: 1.0}}, 
            0.5, 0.2, 0, 1.0, 1);
            spawnWorldObject(contacTutorial);

            contacTutorialCollider = createWorldObject("Contact Tutorial Collider", {name: "image", 
            images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1.0}}, 
            contacTutorial.position.x, 0, 0, 0.4, 0, "wall");
            spawnWorldObject(contacTutorialCollider);

            var contacTutorialColliderNewPosY = 
                getExactModifiedNormalizedPosition(contacTutorial, {x: 0, y: (contacTutorial.height/4) - (contacTutorialCollider.height/4)}).y;

            contacTutorialCollider.position.y = contacTutorialColliderNewPosY;
        }
    }else{
        car = createWorldObject("Car", {name: "image", 
        images: {default: "/assets/img/car/car.png"}, opacities: {default: 1}}, 0.46, 0.85, 0, carSize, 3, "car");
        car.spawnPosition = {x: car.position.x, y: car.position.y};
        car.ACCELERATION = 1.2;
        car.MAX_SPEED = 0.8;
        car.FRICTION = 1.6;
        car.STEERING_SPEED = 120;
        car.velocity = 0;

        var messageTextAreaCols = parseInt(browserScreen.width * 0.36);
        var messageTextAreaRows = parseInt(browserScreen.height * 0.07);
        document.getElementById("message").style.width = messageTextAreaCols;
        document.getElementById("message").style.height = messageTextAreaRows;
        
        var messageInputFieldCols = parseInt(browserScreen.width * 0.36);
        document.getElementById("email").style.width = messageInputFieldCols;
        document.getElementById("name").style.width = messageInputFieldCols;
        
        var messageRect = document.getElementById("message").getBoundingClientRect();
        var messageNormalizedPos = getNormalizedPosition({x: messageRect.left, y: messageRect.bottom});

        sendButton = createWorldObject("Send Button", {name: "image", images: {default: "/assets/img/contact/send-button.png"}, 
        opacities: {default: 1, hover: 0.5}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.25, 1, "wall");
        sendButton.position.y += (sendButton.height / (browserScreen.height * 2) * 2.2);
        sendButton.position.x += (sendButton.width / (browserScreen.width * 2));

        sentSuccess = createWorldObject("Sent Success", {name: "image", images: {default: "/assets/img/contact/sent-success.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.45, 1);
        sentSuccess.position.y += (sentSuccess.height / (browserScreen.height * 2) * 12.3);
        sentSuccess.position.x += (sentSuccess.width / (browserScreen.width * 2));

        sentFailed = createWorldObject("Sent Failed", {name: "image", images: {default: "/assets/img/contact/sent-failed.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.45, 1);
        sentFailed.position.y += (sentFailed.height / (browserScreen.height * 2) * 12.3);
        sentFailed.position.x += (sentFailed.width / (browserScreen.width * 2));

        sentLong = createWorldObject("Sent Long", {name: "image", images: {default: "/assets/img/contact/sent-failed-too-long.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.45, 1);
        sentLong.position.y += (sentLong.height / (browserScreen.height * 2) * 12.3);
        sentLong.position.x += (sentLong.width / (browserScreen.width * 2));

        sending = createWorldObject("Sending", {name: "image", images: {default: "/assets/img/contact/sending.png"}, 
        opacities: {default: 1}}, messageNormalizedPos.x, messageNormalizedPos.y, 0, 0.45, 1);
        sending.position.y += (sending.height / (browserScreen.height * 2) * 12.3);
        sending.position.x += (sending.width / (browserScreen.width * 2));

        road = createWorldObject("Road", {name: "image", 
            images: {default: "/assets/img/car/road-vertical.png"}, opacities: {default: 0.5}}, 
            0.46, 0.0, 0, 0.6, 5);
            spawnWorldObject(road);

        var roadLeftPosition = getExactModifiedNormalizedPosition(road, {x: -road.width/3, y: 0});

        exitSign = createWorldObject("Exit Sign", {name: "image", images: {default: "/assets/img/contact/contact-exit-sign.png"}, 
        opacities: {default: 1, hover: 0.5}}, roadLeftPosition.x, 0.4, 0, 0.5, 1);
        spawnWorldObject(exitSign);
        
        exitSignCollider = createWorldObject("Contact Tutorial Collider", {name: "image", 
        images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1.0}}, 
        exitSign.position.x, 0, 0, 0.6, 0, "wall");
        spawnWorldObject(exitSignCollider);

        var exitSignColliderNewPosY = 
            getExactModifiedNormalizedPosition(exitSign, 
                {x: 0, y: (exitSign.height/4) - (exitSignCollider.height/4)}).y;

        exitSignCollider.position.y = exitSignColliderNewPosY;

        if(!isMobile){
            contacTutorial = createWorldObject("Contact Tutorial", {name: "image", 
            images: {default: "/assets/img/contact/contact-tutorial.png"}, opacities: {default: 1.0}}, 
            -0.5, 0.7, 0, 0.8, 1);
            spawnWorldObject(contacTutorial);

            contacTutorialCollider = createWorldObject("Contact Tutorial Collider", {name: "image", 
            images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1.0}}, 
            contacTutorial.position.x, 0, 0, 0.6, 1, "wall");
            spawnWorldObject(contacTutorialCollider);

            var contacTutorialColliderNewPosY = 
                getExactModifiedNormalizedPosition(contacTutorial, {x: 0, y: (contacTutorial.height/4) - (contacTutorialCollider.height/4)}).y;

            contacTutorialCollider.position.y = contacTutorialColliderNewPosY;
        }
    }
    
    spawnWorldObject(car);
    spawnWorldObject(window.sendButton);

    var url = new URL(window.location.href);
    var isSuccess = url.searchParams.get("success");
    
    if(isSuccess){
        if(getCookie("messageSuccess") == 1){
            showSuccess();
            deleteCookie("messageSuccess");

            var contactCarX = parseFloat(getCookie("contactCarX"));
            var contactCarY = parseFloat(getCookie("contactCarY"));
            var contactCarRot = parseFloat(getCookie("contactCarRot"));

            if(!isNaN(contactCarX)){
                car.position.x = contactCarX;
            }
            if(!isNaN(contactCarY)){
                car.position.y = contactCarY;
            }
            if(!isNaN(contactCarRot)){
                car.rotation = contactCarRot;
            }

            deleteCookie("contactCarX");
            deleteCookie("contactCarY");
            deleteCookie("contactCarRot");

            deleteCookie("name");
            deleteCookie("email");
            deleteCookie("message");
        }
    }else{
        var error = url.searchParams.get("error");
        if(error != null){
            var errors = [false, false, false, false, false];
            errors[error] = true;
            showErrors(errors);
        }
    }

    if(isMobile){
        window.location.href = "/simple/contact/?fromAdvanced=1";
        activateMobileButtons(1);
    }

    loadFields();

    finishLoading();
    fadeIn();
}

function createTree(name, position, size, imgSrc){
    tree = createWorldObject(name, {name: "image", 
    images: {default: imgSrc}, opacities: {default: 1}}, 
    position.x, position.y, 0, size, 3);

    spawnWorldObject(tree);

    treeCollider = createWorldObject(name + " Collider", {name: "image", 
    images: {default: "/assets/img/contact/tree-collider.png"}, opacities: {default: 1}}, 
    position.x + 0.005, 0, 0, size, 3, "wall");

    var treeColliderNewPosY = 
        getExactModifiedNormalizedPosition(tree, {x: 0, y: (tree.height/4) - (treeCollider.height/4)}).y;

    treeCollider.position.y = treeColliderNewPosY;

    spawnWorldObject(treeCollider);
}

function loadFields(){
    var name = getCookie("name");
    var email = getCookie("email");
    var message = getCookie("message");

    document.getElementById("name").value = decodeURIComponent(name);
    document.getElementById("email").value = decodeURIComponent(email);
    document.getElementById("message").value = decodeURIComponent(message);
}
function deleteSavedFields(){
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("message");
}
function fieldChange(fieldElement){
    setCookie(fieldElement.name, encodeURIComponent(fieldElement.value), 0.043);
}

function showSuccess(){
    spawnWorldObject(sentSuccess);
}
function hideSuccess(){
    despawnWorldObject(sentSuccess);
}
function showSending(){
    spawnWorldObject(sending);
}

function showErrors(errorCodes){
    for(var i = 0; i < errorCodes.length; i++){
        if(errorCodes[i]){
            if(i == 0){
                spawnWorldObject(sentFailed);
            }else if(i == 1){
                spawnWorldObject(sentLong);
            }else if(i == 2){
                document.getElementById("nameError").style.visibility = "visible";
            }else if(i == 3){
                document.getElementById("emailError").style.visibility = "visible";
            }else if(i == 4){
                document.getElementById("messageError").style.visibility = "visible";
            }
        }else{
            if(i == 0){
                if(sentFailed != null && worldObjects[sentFailed.layer][sentFailed.name] != null){
                    despawnWorldObject(sentFailed);
                }
            }else if(i == 1){
                if(sentLong != null && worldObjects[sentLong.layer][sentLong.name] != null){
                    despawnWorldObject(sentLong);
                }
            }else if(i == 2){
                document.getElementById("nameError").style.visibility = "hidden";
            }else if(i == 3){
                document.getElementById("emailError").style.visibility = "hidden";
            }else if(i == 4){
                document.getElementById("messageError").style.visibility = "hidden";
            }
        }
    }
}

function updateContact(){
    if(!window.exited){
        if(car.position.x > 1 + (car.size * 1000) && !window.exited){
            car.position.x = -1 - (car.size * 1000);
        }else if(car.position.x < -1 - (car.size * 1000) && !window.exited){
            car.position.x = 1 + (car.size * 1000);
        }else if(car.position.y > 1 + (car.size * 1000)){
            fadeOut("/", 4);
            window.exited = true;
        }else if(car.position.y < -1 - (car.size * 1000)){
            fadeOut("/", 4);
            window.exited = true;
        }
    }

    if(exitSign != null){
        if(isMouseClickedOnce(exitSign)){
            fadeOut("/");
        }
    }
   
    var carCollidedWithSendButton = car.collidingWall != null && car.collidingWall.name == "Send Button";

    if(carCollidedWithSendButton || isMouseClickedOnce(window.sendButton)){
        sendMessage(carCollidedWithSendButton);
    }
}

function sendMessage(isCarCollidedWithSendButton){
    if(!window.exited){
        var errors = [false, false, false, false, false];
        var containsErrors = false;
        if(nameInput.value.length == 0){
            errors[2] = true;
            containsErrors = true;
        }
        if(emailInput.value.length == 0){
            errors[3] = true;
            containsErrors = true;
        }
        if(messageInput.value.length == 0){
            errors[4] = true;
            containsErrors = true;
        }
        
        if(!containsErrors){
            window.exited = true;

            if(isCarCollidedWithSendButton){
                demolish(car.position);
                window.sendButton.component.images.default = "/assets/img/contact/send-button-break.png";
            }

            hideSuccess();
            showSending();

            setCookie("contactCarX",  car.position.x, 1);
            setCookie("contactCarY",  car.position.y, 1);
            setCookie("contactCarRot",  car.rotation, 1);

            grecaptcha.execute();
        }else{
            showErrors(errors);
        }
    }
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (document.activeElement && 'textarea'.indexOf(document.activeElement.tagName.toLowerCase()) === -1) {
            event.preventDefault();
            sendMessage(false);
        }
    }
});