<?php

    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

        include("db.php");
        include("validationAPI.php");

        $validationObject = new Validation();
        $mydb = new DB();

        $id = $validationObject->number($_POST['id']);
        $category_id = $validationObject->number($_POST['category_id']);
        $name = $validationObject->name($_POST['name']);
        $price = $validationObject->number($_POST['price']);

        if(isset($_FILES["img"]["tmp_name"])){
                $validationObject->imeg($_FILES["img"]['name']);
                move_uploaded_file($_FILES["img"]["tmp_name"],"../images/products/$id.jpg");}
            if(count($validationObject->erros)==0){
                try{
                    $mydb->update_data("product","name= '$name', price='$price', category_id=$category_id", "id = $id");
                    $response = [
                        'status' => 'success',
                        'message' => 'update done successfully.'
                    ];
                }catch(Exception $e){
                    $response = [ 'status' => 'failed',
                    'message' => $e->getMessage() ];
                }
        }else{
            $response = [
                'status' => 'failed',
                'message' => $validationObject->erros,
            ];
        }
        // header('Content-Type: application/json');
        echo json_encode($response);
    }

