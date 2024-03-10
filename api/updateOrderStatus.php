<?php
include("db.php");

// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     http_response_code(405);
//     echo json_encode(array('message' => 'Only POST requests are allowed'));
//     exit;
// }

$putData = file_get_contents('php://input');
$data = json_decode($putData, true);
header('Content-Type: application/json');
$res=['status'=>'success'];

    $orderId = $data['orderId'];
    $newStatus = $data['status'];
echo $putData;
// if(isset($putData['orderId']) && isset($putData['status'])) {
//     $orderId = $putData['orderId'];
//     $newStatus = $putData['status'];
//     echo  $orderId;
//     echo  $newStatus;
    // $allowedStatuses = array('processing', 'done', 'in delivery');
    // if (!in_array($newStatus, $allowedStatuses)) {
    //     http_response_code(400);
    //     echo json_encode(array('message' => 'Invalid status'));
    //     exit;
    // }

    $db = new DB();
            $query = 'UPDATE orders SET status = :status WHERE id = :orderId';
            $statement = $db->prepare($query);
            $statement->execute(array(
                ':id' => $orderId,
                ':status' => $status
            ));

    if($statement->execute()) {
        http_response_code(200);
        echo json_encode(array('message' => 'Status updated successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to update status'));
    }
// } else {
//     http_response_code(400);
//     echo json_encode(array('message' => 'Invalid request'));
// }
?>