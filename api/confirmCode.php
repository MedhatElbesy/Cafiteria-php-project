<?php

  session_start();
  if(isset($_SESSION['code']) && $_SESSION['code']==$_POST["code"]){
  
    include("db.php");
    $mydb = new DB();
    $email=$_SESSION['email'];
    $password=md5($_POST['password']);
    $mydb->update_data('customers',"password = '$password'","email='{$email}'");
    session_destroy();


}



?>