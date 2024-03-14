<?php

include("db.php");

$mydb = new DB();
// $customers_id=$_GET['id'];
$customers_id = 1;
$data = $mydb->query("SELECT * 
    FROM customers
    WHERE id='$customers_id'");

$fullrows = $data->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($fullrows);
