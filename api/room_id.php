<?php
  session_start();
  if(isset($_SESSION["position"])){
    include("db.php");
    $mydb = new DB();
    $data =$mydb->query("select id from rooms");
    $all_rooms_id = $data->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($all_rooms_id);
  }
?>