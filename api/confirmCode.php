<?php
 


  session_start();

  if(isset($_SESSION['code']) && $_SESSION['code']==$_POST["code"]){
  
  include("db.php");

  $mydb = new DB();

  $email=$_SESSION['email'];
  

  $mydb->update_data('customers',"password = '{$_POST['password']}'","email='{$email}'");


  session_destroy();



}



?>