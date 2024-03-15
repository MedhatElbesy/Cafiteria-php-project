<?php
    include("db.php");
    $mydb = new DB();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="user" && $_SERVER['REQUEST_METHOD'] == 'POST'){
        
        $customer_id = $_POST['$customer_id'];

        $data=$mydb->query("SELECT product.img , product.name , order_product.quantity , order_product.price_unit ,orders.total_price 
            FROM product 
            JOIN order_product 
            ON product.id = order_product.product_id 
            JOIN orders ON order_product.order_id = orders.id 
            JOIN customers ON orders.customers_id = customers.id 
            WHERE customers.id = '$customer_id'
            ORDER BY customers.id DESC LIMIT 1
            ");
        $lastorder = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($lastorder);
    }

?>