<?php

    include("db.php");

    $mydb = new DB();
    // enter date_from and date_to with ''
    // for test enter this data
    $date_from = $_GET['date_from'];
    $date_to = $_GET['date_to'];
    $customer_id='1';
    $data=$mydb->query(" SELECT *
        FROM orders 
        WHERE customers_id = '$customer_id' AND 
        order_date >= '$date_from' AND order_date < DATE_ADD('$date_to', INTERVAL 1 DAY) order by order_date desc ;
    ");
    $allOrdersInSpecificDate = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($allOrdersInSpecificDate );
?>