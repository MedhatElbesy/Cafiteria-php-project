<?php
    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin"){
        include("db.php");
        $mydb = new DB();

        $data =$mydb->get_data("customers");
        $data =$mydb->query(" SELECT customers.* , rooms.extNumber 
        FROM customers 
        JOIN rooms
        where customers.room=rooms.id
        ");

        $fullrows = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($fullrows);
    }


?>