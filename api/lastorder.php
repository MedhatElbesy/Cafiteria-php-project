<?php

    include("db.php");

    $mydb = new DB();
    $data =$mydb->query("select * from order order by id desc limit 1");
    $lastorder = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($lastorder);


?>