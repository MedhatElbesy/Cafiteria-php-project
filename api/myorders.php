<?php

    include("db.php");

    $mydb = new DB();
    // enter date_from and date_to with ''
    // for test enter this data
    $date_from = '2024-03-04';
    $date_to ='2024-03-07';
    $customer_id='1';
    $data=$mydb->query(" SELECT *
        FROM orders 
        WHERE customers_id = '$customer_id'
        AND order_date 
        BETWEEN '$date_from' AND '$date_to'
    ");
    $allOrdersInSpecificDate = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($allOrdersInSpecificDate );



?>