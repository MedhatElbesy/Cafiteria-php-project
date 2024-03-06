<?php

session_start();
if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$mydb = new DB();

$id = $_POST['id'];
$category_id = $_POST['category_id'];
$name = $_POST['name'];
$price = $_POST['price'];
$available = $_POST['available'];
$src="./images/productions/$id.jpg";



try{

move_uploaded_file($_FILES["img"]["tmp_name"],"./images/productions/$id.jpg");

$mydb->insert_data("product","id, category_id, img, name, price ,available" , "$id,$category_id,'$src','$name',$price,'$available'");


$response = [
    'status' => 'success',
    'message' => 'Insert done successfully.'
];




}catch(Exception $e){
    $response = [ 'status' => 'failed',
    'message' => $e->getMessage() ];
    
}




// header('Content-Type: application/json');
echo json_encode($response);


}

?>