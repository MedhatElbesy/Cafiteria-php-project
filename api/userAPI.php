<?php
    session_start();
        // if(isset($_SESSION["admin"])){


            
        include("db.php");

        $mydb = new DB();

        $data =$mydb->get_data("customers");
        $data =$mydb->query(" SELECT customers.* , rooms.extNumber 
        FROM customers 
        JOIN rooms
        ON customers.id = rooms.id
        ");

        $fullrows = $data->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($fullrows);





    // }


?>