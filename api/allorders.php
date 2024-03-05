<?php

    include("class.php");

    $mydb = new DB();
    $data =$mydb->query("select * from  orders ");
    $allorders = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($allorders);


?>