<?php
session_start();
// if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin"){
include("db.php");

$mydb = new DB();
$orderId = $_GET['id'];
try{
  $affectedRows = $mydb-> delete_data("orders","id='$orderId'");
  $response = [
    'status' => 'success',
    'message' => $affectedRows,
  ];
}catch(Exception $e) {
  $response = [ 'status' => 'failed',
  'message' => $e->getMessage() ];
}
echo json_encode($response);
// }
?>