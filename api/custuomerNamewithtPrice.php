<?php

    include("db.php");

    $mydb = new DB();
    // for test enter this data
    // $customer_id=null;
    $customer_id='1';   
    
    $data =$mydb->getCustuomerNameWithTotalPrice($customer_id);
    $custuomer_name_with_total_price = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($custuomer_name_with_total_price);




?>