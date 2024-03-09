<?php



include("db.php");
$customer_id=$_GET['id'];
$mydb = new DB();
$data= $mydb->query(" SELECT orders.id , order_product.* ,product.img
    from orders 
    JOIN order_product 
    ON orders.id = order_product.order_id
    JOIN product
    ON order_product.product_id = product.id
    WHERE orders.id = '$customer_id';
");
$orderDetails = $data->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($orderDetails);

