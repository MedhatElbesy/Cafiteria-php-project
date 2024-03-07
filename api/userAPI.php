<?php
    session_start();
        // if(isset($_SESSION["admin"])){


            
        include("db.php");

        $mydb = new DB();

        $data =$mydb->get_data("customers");

        $fullrows = $data->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($fullrows);





    // }


?>