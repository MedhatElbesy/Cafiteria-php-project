<?php

include("db.php");
$mydb= new DB();
$data =$mydb->query("SELECT orders.order_date , customers.fname , customers.lname , rooms.id ,rooms.extNumber 
        from orders 
        INNER JOIN customers 
        ON orders.customers_id = customers.id
        JOIN rooms 
        on customers.id = rooms.id 
        WHERE orders.status = 'processing'");
$status = $data->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($status);

