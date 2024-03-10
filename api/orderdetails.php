<?php
    include("db.php");
    // $customer_id=$_GET['id'];
    $date_from = '2024-03-03';
    $date_to ='2024-03-07';
    $order_id = '1';
    // $date_from = $_GET['date_from'];
    // $date_to = $_GET['date_to'];
    // $order_id = $_GET['id'];
    $mydb = new DB();
    $data= $mydb->query(" SELECT orders.id , order_product.* ,product.img, product.name 
        from orders 
        JOIN order_product 
        ON orders.id = order_product.order_id
        JOIN product
        ON order_product.product_id = product.id
        WHERE orders.id = '$order_id'

    ");
    $orderDetails = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orderDetails);