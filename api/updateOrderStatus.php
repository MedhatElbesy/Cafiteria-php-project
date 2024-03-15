<?php
    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

        include("db.php");
        $putData = file_get_contents('php://input');
        $data = json_decode($putData, true);

        if(isset($data['orderId']) && isset($data['status'])) {
            $orderId = $data['orderId'];
            $newStatus = $data['status'];

            $db = new DB();
            $query = 'UPDATE orders SET status = :status WHERE id = :orderId';
            $statement = $db->prepare($query);
            $result = $statement->execute(array(
                ':orderId' => $orderId,
                ':status' => $newStatus
            ));

            if($result) {
                http_response_code(200);
                echo json_encode(array('message' => 'Status updated successfully'));
            } else {
                http_response_code(500);
                echo json_encode(array('message' => 'Failed to update status'));
            }
        } else {
            http_response_code(400);
            echo json_encode(array('message' => 'Invalid request'));
        }
    }