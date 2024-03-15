<?php

session_start();
// if(isset($_SESSION["position"]) && $_SERVER['REQUEST_METHOD'] == 'POST'){

include("db.php");

// $data= json_decode(file_get_contents("php://input"),true);

$mydb = new DB();
 
// $customers_id = $_GET['customers_id'];
$status = "processing";
$productions = $_GET['productions'];

 
     $price_unit=$mydb->query("SELECT price from product where id = '$productions'")->fetch(PDO::FETCH_ASSOC);

     echo $price_unit["price"];
    //  var_dump($price_unit);

// header('Content-Type: application/json');
// echo json_encode($response);


// }

?>