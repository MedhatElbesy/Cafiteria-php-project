<?php

session_start();
if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){

    include("db.php");
    include("validation.php");
    $mydb = new DB();
    $validationObject = new Validation();
 
    $fname =$validationObject->fnames($validationObject->safeInput($_POST['fname']));
    $lname =$validationObject->lnames($validationObject->safeInput($_POST['lname']));
    $email =$validationObject->email($validationObject->safeInput($_POST['email']));
    $password =$validationObject->password($validationObject->safeInput($_POST['password']));
    $room =$validationObject->room($validationObject->safeInput($_POST['room']));
    $src =$validationObject->imeg($_FILES["img"]['name']);
   // checking of validation result before insert
    if(count($validationObject->erros)>0)
    {
        $response = [
            'status' => 'failed',
            'message' => 'update failed validation case.',
            'errors'=> $validationObject->erros,
        ];
    }
    else
    {

 
try{

move_uploaded_file($_FILES["img"]["tmp_name"],"./images/customers/$id.jpg");

 $mydb->insert_data("customers","id, fname, lname, email, password ,img, room" , "$id,'$fname','$lname','$email','$password','$src','$room'");
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
}

?>