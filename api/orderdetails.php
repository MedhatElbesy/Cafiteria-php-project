<?php
    include("db.php");
    // $customer_id=$_GET['id'];
    $order_id = $_GET['id'];
    $mydb = new DB();
    $data= $mydb->query(" SELECT orders.total_price ,orders.id , order_product.* ,product.img, product.name 
        from orders 
        JOIN order_product 
        ON orders.id = order_product.order_id
        JOIN product
        ON order_product.product_id = product.id
        WHERE orders.id = '$order_id';

    ");
    $orderDetails = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orderDetails);