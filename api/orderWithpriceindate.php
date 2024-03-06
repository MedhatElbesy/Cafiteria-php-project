<?php

    include("db.php");

    $mydb = new DB();
    // enter date_from and date_to with ''

    // for test enter this data
    $date_from = '2024-03-04';
    $date_to ='2024-03-06';
    $customer_id= '1';
    
    $data =$mydb->getOrderWithAmountInSpecificDate($date_from , $date_to,$customer_id);
    $order_with_amount_in_specific_date = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($order_with_amount_in_specific_date);



?>