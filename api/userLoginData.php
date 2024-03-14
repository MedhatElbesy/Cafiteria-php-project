<?php

session_start();

if (isset($_SESSION["id"])) {

include("db.php");


$mydb = new DB();
$id = $_SESSION["id"];



if($_SESSION["postion"] == 'admin'){
    $data = $mydb->query("SELECT CONCAT(fname, ' ', lname) AS user_name, img
    FROM admin
    WHERE id = '$id';"
);
}elseif($_SESSION['postion'] == 'user'){
    $data = $mydb->query("SELECT id, CONCAT(fname, ' ', lname) AS user_name, img, room
    FROM customers
    WHERE id = '$id';"
);
}


$fullrows = $data->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($fullrows);
}