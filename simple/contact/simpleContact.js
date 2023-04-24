
if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1){
    document.getElementById("emailSection").style.display = "none";
    document.getElementById("socialGreeting").style.display = "none";
}else{
    var url = new URL(window.location.href);
    var isSuccess = url.searchParams.get("success");
    var fromAdvanced = url.searchParams.get("fromAdvanced");
}

if(fromAdvanced == "1"){
    document.getElementById("fromAdvanced").checked = true;
    document.getElementById("homeText").setAttribute( "onClick", "loadPage('/');" );
}

if(isSuccess){
    showSuccess();
}else{
    var error = url.searchParams.get("error");
    if(error != null){
        var errors = [false, false, false, false, false];
        errors[error] = true;
        showErrors(errors);
    }
}

function showSuccess(){
    document.getElementById("result").style.color = "lightgreen";
    document.getElementById("result").innerHTML = "Message successfully sent!<br>I'll get back to you as soon as I can!";
}

function showSentError(){
    document.getElementById("result").style.color = "red";
    document.getElementById("result").innerHTML = "There was an error in sending the message :(";
}
function showLongError(){
    document.getElementById("result").style.color = "red";
    document.getElementById("result").innerHTML = "Your input was too long!";
}
function hideResult(){
    document.getElementById("result").innerHTML = "";
}

function showErrors(errorCodes){
    var usedResult = false;
    for(var i = 0; i < errorCodes.length; i++){
        if(errorCodes[i]){
            if(i == 0){
                showSentError();
                usedResult = true;
            }else if(i == 1){
                showLongError();
                usedResult = true;
            }else if(i == 2){
                document.getElementById("nameError").style.visibility = "visible";
            }else if(i == 3){
                document.getElementById("emailError").style.visibility = "visible";
            }else if(i == 4){
                document.getElementById("messageError").style.visibility = "visible";
            }
        }else{
            if(i == 0 && !usedResult){
                hideResult();
            }else if(i == 1 && !usedResult){
                hideResult();
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

var exited = false;

function sendMessage(){
    if(!exited){
        var errors = [false, false, false, false, false];
        var containsErrors = false;
        if(document.getElementById("name").value.length == 0){
            errors[2] = true;
            containsErrors = true;
        }
        if(document.getElementById("email").value.length == 0){
            errors[3] = true;
            containsErrors = true;
        }
        if(document.getElementById("message").value.length == 0){
            errors[4] = true;
            containsErrors = true;
        }
        
        if(!containsErrors){
            document.getElementById("result").style.color = "rgb(200, 200, 200)";
            document.getElementById("result").innerHTML = "Sorry, this doesn't work anymore :(";
            grecaptcha.execute();
            exited = true;
        }else{
            showErrors(errors);
        }
    }
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if (document.activeElement && 'textarea'.indexOf(document.activeElement.tagName.toLowerCase()) === -1) {
            event.preventDefault();
            document.getElementById("sendButton").click();
        }
    }
});