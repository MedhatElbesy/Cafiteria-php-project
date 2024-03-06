<?php


    session_start();
    $customer_id = $_SESSION["user"];
    // when user login we must take it`s id
    include("db.php");
    $mydb = new DB();
    $data =$mydb->get_last_order($customer_id );
    $lastorder = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($lastorder);


?>