<?php

  session_start();
  include("db.php");
  if(isset($_SESSION['code']) && $_SESSION['code']==$_POST["code"]){

    $mydb = new DB();
    $email=$_SESSION['email'];
    $password=md5($_POST['password']);
    $mydb->update_data('customers',"password = '$password'","email='{$email}'");
    
    $response = [
      'status' => 'success',
      'message' => 'Password changed'];
      session_destroy();

}else{
  $response = [
    'status' => 'failed',
    'message' => 'Failed changing password'];

}



echo json_encode($response);


?>