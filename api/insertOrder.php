<?php

session_start();
// if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

$data= json_decode(file_get_contents("php://input"),true);

$mydb = new DB();



$id = $data['id'];
$customers_id = $data['customers_id'];
$status = $data['status'];
$productions = $data['productions'];





try{

    $mydb->beginTransaction();

$mydb->insert_data("orders","id, customers_id, status" , "$id,'$customers_id','$status'");

foreach ($data["productions"] as $production) {   
    $mydb->insert_data("order_product","order_id, product_id, quantity, price_unit" , " $id,'{$production['product_id']}' ,'{$production['quantity']}','{$production['price']}'");
  }
  

$response = [
    'status' => 'success',
    'message' => 'Insert done successfully.'
];


    $mydb->commit();

}catch(Exception $e){
    $response = [ 'status' => 'failed',
    'message' => $e->getMessage() ];
    
}




header('Content-Type: application/json');


echo json_encode($response);


// }

?>