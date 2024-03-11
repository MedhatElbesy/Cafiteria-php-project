<?php

session_start();
// if(isset($_SESSION["postion"]) && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$data= json_decode(file_get_contents("php://input"),true);

$mydb = new DB();

$customers_id = $data['customers_id'];
$status = "processing";
$products = $data['products'];

try{

    $mydb->beginTransaction();
$result=$mydb->insert_data("orders","customers_id, status, room" , "'$customers_id','$status',{$data['room']}");
$lastId= $mydb->query("SELECT MAX(ID) as max_id FROM orders")->fetch(PDO::FETCH_ASSOC);
$id = $lastId['max_id'];
if($result!=0  ){
 foreach ($data["products"] as $production) {   
     $price_unit=$mydb->query("SELECT price from product where id = '{$production['product_id']}'")->fetch(PDO::FETCH_ASSOC)["price"];


     $mydb->insert_data("order_product","order_id, product_id, quantity, price_unit" , "'$id','{$production['product_id']}' ,'{$production['quantity']}','$price_unit'");
    }
    $response = [
        'status' => 'success',
        'message' => 'Insert done successfully.'
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