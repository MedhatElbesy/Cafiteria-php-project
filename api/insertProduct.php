<?php

session_start();
// if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");
include("validationAPI.php");

$validationObject = new Validation();
$mydb = new DB();



$category_id = $validationObject->number($_POST['category_id']);
$name = $validationObject->name($_POST['name']);
$price = $validationObject->number($_POST['price']);
$available = $validationObject->name($_POST['available']);
$validationObject->imeg($_FILES["img"]['name']);

if(count($validationObject->erros)==0){

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


}else{
    $response = [
        'status' => 'failed',
        'message' => $validationObject->erros,
    ];
}

// header('Content-Type: application/json');
echo json_encode($response);


// }

?>