<?php
    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin"){
        include("db.php");
        $mydb = new DB();
        
        $customers_id=$_GET['id'];
        $data = $mydb->query("SELECT * 
            FROM customers
            WHERE id='$customers_id'");
        $fullrows = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($fullrows);
    }