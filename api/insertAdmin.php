<?php

include("db.php");


$mydb = new DB();

// session_start();
// if(isset($_SESSION["admin"])){
  

$data= file_get_contents("php://input");
$data= json_decode(file_get_contents("php://input"),true);



$fname = $_POST['fname'];
$id = $_POST['id'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$password = $_POST['password'];

$src="./images/$id.jpg";

move_uploaded_file($_FILES["img"]["tmp_name"],"./images/$id.jpg");

$mydb->insert_data("admin","id, fname, lname, email, password ,img" , "$id,'$fname','$lname','$email','$password','$src'");





// }

?>