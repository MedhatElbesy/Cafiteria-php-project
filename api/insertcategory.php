<?php

    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){
        include("db.php");
        $mydb = new DB();
        $name = $_POST['name'];
        try{

            $mydb->insert_data("category","name" , "'$name'");
            $id = $mydb->lastInsertId();
            $src="../images/categories/$id.jpg";
            move_uploaded_file($_FILES["img"]["tmp_name"],"../images/categories/$id.jpg");
            $mydb->update_data("category","img='$src'", "id = $id");

            $response = [
                'status' => 'success',
                'message' => 'Insert done successfully.'
            ];
        }catch(Exception $e){
            $response = [ 'status' => 'failed',
            'message' => $e->getMessage() ];
        }
    header('Content-Type: application/json');
    echo json_encode($response);
    }

?>