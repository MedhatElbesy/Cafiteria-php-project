<?php

include("db.php");
$mydb= new DB();
$data =$mydb->ordersStatusForAdmin();
$status = $data->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($status);

