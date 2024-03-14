<?php
 
session_start();

include("db.php");

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 
//required files
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
 

$length = 10; // Change this to your desired length
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$randomString = substr(str_shuffle($characters), 0, $length);

$forgetCode = $randomString;




try{
  
    $mydb = new DB();
    $data = $mydb->query("SELECT * FROM customers where email = '{$_POST["email"]}'")->fetchAll(PDO::FETCH_ASSOC);
   
    $response = [
      'status' => 'success',
      'message' => 'Send Code to email Done.'];

}catch(Exception $e){
  $response = [
    'status' => 'failed'];
}


if($data){
  $_SESSION['code'] = $forgetCode;
  $_SESSION['email'] = $_POST["email"];
  



//Create an instance; passing `true` enables exceptions
if (isset($_POST["send"])) {
 
  $mail = new PHPMailer(true);
 
    //Server settings
    $mail->isSMTP();                              //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';       //Set the SMTP server to send through
    $mail->SMTPAuth   = true;             //Enable SMTP authentication
    $mail->Username   = 'amr.abdullah.elrefaey@gmail.com';   //SMTP write your email
    $mail->Password   = 'cflz damj inrm odgx';      //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit SSL encryption
    $mail->Port       = 465;                                    
 
    //Recipients
    // $mail->setFrom( "admin@cafeteria.com", "admin"); // Sender Email and name
    $mail->addAddress($_POST["email"]);     //Add a recipient email  
    $mail->addReplyTo($_POST["email"], "Customer"); // reply to sender email
 
    //Content
    $mail->isHTML(true);               //Set email format to HTML
    $mail->Subject = "Reset Your account password in cafeteria.com";   // email subject headings
    $mail->Body    = "Your link to forget password : <a href='http://localhost/Cafiteria-php-project/api/confirmCode.html?code=$forgetCode'>Click here to reset your password</a>"; //email message
      
    // Success sent message alert
    $mail->send();

    // if ($mail->send()) {
    //     echo 'Email sent successfully.';
    // } else {
    //     echo 'Email could not be sent. Error: ' . $mail->ErrorInfo;
    // }


    
}

}else{
  $response = [
    'status' => 'failed',
    'message' => 'Email not found'];
}

header('Content-Type: application/json');
echo json_encode($response);

?>