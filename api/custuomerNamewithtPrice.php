<?php

    include("db.php");
    $mydb = new DB();
    
    
$response = [
    'status' => '0',
    'message' => ''
];

    $data=$mydb->query("SELECT customers.fname , customers.lname , customers.id , orders.order_date , SUM(orders.total_price) AS Total_Amount
        FROM customers
        INNER JOIN orders
        ON customers.id = orders.customers_id
        GROUP BY customers.id
    ");
    $custuomer_name_with_total_price = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($custuomer_name_with_total_price);




    // for test enter this data
    // $customer_id=null;
    // $customer_id='1';  
    // $date_from = null;
    // $date_from = '2024-03-04';
    // $date_to =null;
    // $date_to ='2024-03-06';

    // $data =$mydb-> get_connection();
    // function getCustuomerNameWithTotalPrice($customer_id=null,$date_from=null,$date_to=null){
    //     $query = "SELECT customers.fname , customers.lname , customers.id , orders.order_date , SUM(orders.total_price) AS Total_Amount
    //     FROM customers
    //     INNER JOIN orders
    //     ON customers.id = orders.customers_id
    //     GROUP BY customers.id
    //     ";
    
    //     if($customer_id){
    //         $query = $query . "HAVING customers.id = '$customer_id'"
    //         ."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_from){
    //         $query = $query."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_to){
    //         $query = $query."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_from && $date_to){
    //         $query = $query."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($customer_id && $date_from && $date_to){
    //         $query = $query . "HAVING customers.id = '$customer_id'"
    //         ."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }
    //     return $query;
    // }

    // $dddd=$data->query(getCustuomerNameWithTotalPrice($customer_id , $date_from , $date_to));
    // $custuomer_name_with_total_price = $dddd->fetchAll(PDO::FETCH_ASSOC);

?>