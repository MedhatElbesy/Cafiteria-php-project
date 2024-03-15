<?php
        // header('Location: http://www.Cafiteria-php-project/html/indexx.html');

    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="user"){
        include("db.php");
        $mydb = new DB();
        $date_from = $_GET['date_from'];
        $date_to = $_GET['date_to'];
        $customer_id = $_SESSION['id'];
        $data=$mydb->query(" SELECT *
                FROM orders 
                WHERE customers_id = '$customer_id' AND 
                order_date >= '$date_from' AND order_date < DATE_ADD('$date_to', INTERVAL 1 DAY) order by order_date desc ;
        ");
        $allOrdersInSpecificDate = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($allOrdersInSpecificDate );
    }
