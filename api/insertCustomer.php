<?php

session_start();
if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");


$mydb = new DB();


$fname = $_POST['fname'];
$id = $_POST['id'];
$lname = $_POST['lname'];
$email = $_POST['email'];
$password = $_POST['password'];
$room = $_POST['room'];
$src="./images/customers/$id.jpg";


try{

move_uploaded_file($_FILES["img"]["tmp_name"],"./images/customers/$id.jpg");

$mydb->insert_data("customers","id, fname, lname, email, password ,img, room" , "$id,'$fname','$lname','$email','$password','$src','$room'");


$response = [
    'status' => 'success',
    'message' => 'Insert done successfully.'
];




}catch(Exception $e){
    $response = [ 'status' => 'failed',
    'message' => $e->getMessage() ];
    
}




header('Content-Type: application/json');
echo json_encode($response);


}

?>