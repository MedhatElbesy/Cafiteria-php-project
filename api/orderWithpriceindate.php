<?php

    include("db.php");

    $mydb = new DB();
    $data= $mydb->query(" SELECT *
        FROM orders 
    ");
    $orderWithAmountInSpecificDate = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orderWithAmountInSpecificDate);




    
    // enter date_from and date_to with ''
    // for test enter this data
    // $customer_id=null;
    // $customer_id='1';  
    // $date_from = null;
    // $date_from = '2024-03-04';
    // $date_to =null;
    // $date_to ='2024-03-06';

    // function getOrdersPriceWithDate($customer_id=null,$date_from=null,$date_to=null){
    //     $query = "SELECT * FROM orders ";
    //     if($customer_id){
    //         $query = $query . " WHERE customers_id='$customer_id'";
    //     }
    //     if($customer_id){
    //         $query = $query . " WHERE customers_id=$customer_id"
    //         ."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_from){
    //         $query = $query." WHERE order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_to){
    //         $query = $query."WHERE order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($date_from && $date_to){
    //         $query = $query."WHERE order_date BETWEEN '$date_from' AND '$date_to'";
    //     }elseif($customer_id && $date_from && $date_to){
    //         $query = $query . "WHERE customers.id = '$customer_id'"
    //         ."AND order_date BETWEEN '$date_from' AND '$date_to'";
    //     }
    //         return $this->connection->query($query);
    // }


?>