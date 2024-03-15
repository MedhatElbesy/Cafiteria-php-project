<?php

session_start();
// if(isset($_SESSION["position"]) && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$data= json_decode(file_get_contents("php://input"),true);

$mydb = new DB();

$customers_id = $data['customers_id'];
$status = "processing";
$products = $data['products'];
$room = $data['room'];

try{
    $mydb->beginTransaction();
    $result = $mydb->insert_data("orders","customers_id, status, room" , "'$customers_id','$status','$room'");
    $id = $mydb->lastInsertId();
if($result !=0 ){
    foreach ($data["products"] as $product) {   
        $price_unit = $mydb->query("SELECT price from product where id = '{$product['product_id']}'")->fetch(PDO::FETCH_ASSOC)["price"];
        $result = $mydb->insert_data("order_product","order_id, product_id, quantity, price_unit" , "'$id','{$product['product_id']}' ,'{$product['quantity']}','$price_unit'");
    }
    $response = [
        'status' => 'success',
        'message' => $result
    ];
}
else{
    $response = [
        'status' => 'failed',
        'message' => 'Insert data into "orders" failed So we denied insert data into order_product.'
    ];
}
$mydb->commit();

}catch(Exception $e){
    $response = [ 'status' => 'failed',
    'message' => $e->getMessage() ];
}

header('Content-Type: application/json');
echo json_encode($response);


// }

?>