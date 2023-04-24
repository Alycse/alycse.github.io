<?php
    $mode = $_POST['mode'];
    $fromAdvanced = $_POST['fromAdvanced'];
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    $subject = "Received message from '$name' ( $email )";
    $to= "contact@jpbarcena.com";
    $headers = "MIME-VERSION: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From : <$email>" . "\r\n";

    $secretKey = "6LfXwLoUAAAAAAGObG2BGH8dJxqeL965RF15SlgB";
    $responseKey = $_POST['g-recaptcha-response'];
    $userIp = $_SERVER['REMOTE_ADDR'];

    $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIp";

    if(strcmp($mode, "advanced") === 0 || $fromAdvanced){
        if(empty($name)){
            header('Location: /contact/?error=2');
            exit;
        } else if(empty($email)){
            header('Location: /contact/?error=3');
            exit;
        } else if(empty($message)){
            header('Location: /contact/?error=4');
            exit;
        }
        if(strlen($name) > 60 || strlen($email) > 60 || strlen($message) > 1200){
            header('Location: /contact/?error=1');
            exit;
        }
    }else{
        if(empty($name)){
            header('Location: /simple/contact/?error=2');
            exit;
        } else if(empty($email)){
            header('Location: /simple/contact/?error=3');
            exit;
        } else if(empty($message)){
            header('Location: /simple/contact/?error=4');
            exit;
        }
        if(strlen($name) > 60 || strlen($email) > 60 || strlen($message) > 1200){
            header('Location: /simple/contact/?error=1');
            exit;
        }
    }

    $response = file_get_contents($url);
    $response = json_decode($response);
    
    if(strcmp($mode, "advanced") === 0){
        if($response -> success){
            if(mail($to, $subject, $message, $headers)){
                setcookie("messageSuccess", "1", time() + 86400, "/");
                header('Location: /contact/?success=true');
                exit;
            }else{
                header('Location: /contact/?error=0');
                exit;
            }
        }else{
            header('Location: /contact/?error=1');
            exit;
        }
    }else{
        if($response -> success){
            if(mail($to, $subject, $message, $headers)){
                header('Location: /simple/contact/?success=true');
                exit;
            }else{
                header('Location: /simple/contact/?error=0');
                exit;
            }
        }else{
            header('Location: /simple/contact/?error=1');
            exit;
        }
    }
?>