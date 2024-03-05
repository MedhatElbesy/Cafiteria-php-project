<?php



    include("db.php");

    $mydb = new DB();
    // enter date_from and date_to with ''

    // for test enter this data
    // $date_from = '2024-03-04';
    // $date_to ='2024-03-06';
    $data =$mydb->get_orders_from_to($date_from , $date_to);
    $all_orders_in_specific_date = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($all_orders_in_specific_date );



?>