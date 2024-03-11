<?php

include("db.php");

$mydb = new DB();
$id=$_GET['id'];

if(isset($_GET['status'])){
$status=$_GET['status'];

$data =$mydb->query("UPDATE product 
    SET available = '$status'
    WHERE id='$id'");

}else{

$data =$mydb->query("SELECT * 
    FROM product 
    WHERE id='$id'");

$fullrows = $data->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($fullrows);
}



?>