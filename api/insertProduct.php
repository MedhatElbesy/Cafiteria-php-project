<?php

session_start();
// if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$mydb = new DB();


$category_id = $_POST['category_id'];
$name = $_POST['name'];
$price = $_POST['price'];
$available = $_POST['available'];




try{


$mydb->insert_data("product","category_id, name, price ,available" , "$category_id,'$name',$price,'$available'");
$id = $mydb->lastInsertId();
$src="../images/products/$id.jpg";
move_uploaded_file($_FILES["img"]["tmp_name"],"../images/products/$id.jpg");
$mydb->update_data("product","img='$src'", "id = $id");

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


// }

?>