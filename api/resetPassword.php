<?php
 
session_start();

include("db.php");


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
 

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
 

$length = 10; 
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
  
 
  $mail = new PHPMailer(true);
 
    //Server settings
    $mail->isSMTP();                           
    $mail->Host       = 'smtp.gmail.com';     
    $mail->SMTPAuth   = true;            
    $mail->Username   = 'amr.abdullah.elrefaey@gmail.com'; 
    $mail->Password   = 'cflz damj inrm odgx';     
    $mail->SMTPSecure = 'ssl';         
    $mail->Port       = 465;                                    
 
  
    $mail->addAddress($_POST["email"]);    
    $mail->addReplyTo($_POST["email"], "Customer");
 
    
    $mail->isHTML(true);              
    $mail->Subject = "Reset Your account password in cafeteria.com";   
    $mail->Body    = "Your link to forget password : <a href='http://localhost/Cafiteria-php-project/html/confirmCode.html?code=$forgetCode'>Click here to reset your password</a>"; //email message
      
    $mail->send();




}else{
  $response = [
    'status' => 'failed',
    'message' => 'Email not found'];
}

header('Content-Type: application/json');
echo json_encode($response);

?>