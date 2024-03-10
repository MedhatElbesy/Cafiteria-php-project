<?php
include("db.php");

$mydb = new DB();
$orderId = $_GET['id'];
try{
  $mydb-> delete_data("orders","'id=$orderId'");
  $response = [
    'status' => 'success',
    'message' => 'Delete done successfully.'
  ];
}catch(Exception $e){
  $response = [ 'status' => 'failed',
  'message' => $e->getMessage() ];
}
echo json_encode($response);
?>