<?php

session_start();
// if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$mydb = new DB();

$id = $_POST['id'];
$category_id = $_POST['category_id'];
$name = $_POST['name'];
$price = $_POST['price'];


try{


if(isset($_FILES["img"]["tmp_name"])){
move_uploaded_file($_FILES["img"]["tmp_name"],"../images/products/$id.jpg");}


$mydb->update_data("product","name= '$name', price='$price', category_id=$category_id", "id = $id");

$response = [
    'status' => 'success',
    'message' => 'update done successfully.'
];




}catch(Exception $e){
    $response = [ 'status' => 'failed',
    'message' => $e->getMessage() ];
    
}




// header('Content-Type: application/json');
echo json_encode($response);


// }

?>