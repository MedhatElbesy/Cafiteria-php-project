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
    $password =md5($validationObject->password($validationObject->safeInput($_POST['password'])));
    $room =$validationObject->room($validationObject->safeInput($_POST['room']));
    $src =$validationObject->imeg($_FILES["img"]['name']);
   // checking of validation result before insert
    if(count($validationObject->erros)>0)
    {
        $response = [
        'status' => 'failed3',
        'message' => 'update failed validation case.',
        'errors'=> $validationObject->erros,
        ];
    }
    else
    {

        if (! file_exists('http://localhost/Cafiteria/images/'.$_FILES["img"]['name']))
        {
            if (move_uploaded_file($_FILES["img"]["tmp_name"],"../images/{$_FILES["img"]["name"]}"))
            {
                try
                {
                    $mydb->beginTransaction();
                    $result= $mydb->insert_data("customers"," fname, lname, email, password ,img, room" , "'$fname','$lname','$email','$password','$src','$room'");
                    if($result!=0)
                    {
                        $mydb->commit(); 
                        $response = [
                        'status' => 'success',
                        'message' => 'Insert done successfully.'
                        ];
                    }
                    else
                    {
                        
                        $response = [
                        'status' => 'failed2',
                        'message' => 'failed to insert in database'
                        ];
                    }
                }
                catch(Exception $e)
                {
                     
                    $response = [ 'status' => 'failed1',
                    'message' => $e->getMessage() ];

                }
            }   
            else
            {
                $response = [
                'status' => 'failed2',
                'message' => 'insert failed uploading imeg case.',

                ];
                 
            }

        }
        else
        {
            try
            {
                $mydb->beginTransaction();
                $result= $mydb->insert_data("customers"," fname, lname, email, password ,img, room" , "'$fname','$lname','$email','$password','$src','$room'");
                if($result!=0)
                {
                    $mydb->commit(); 
                    $response = [
                    'status' => 'success',
                    'message' => 'Insert done successfully.'
                    ];
                }
                else
                {
                     
                    $response = [
                    'status' => 'failed2',
                    'message' => 'failed to insert in database'
                    ];
                }
            }
            catch(Exception $e)
            {
                 
                $response = [ 'status' => 'failed1',
                'message' => $e->getMessage() ];

            }
        }


        
    }
    header('Content-Type: application/json');
        echo json_encode($response);
    }
else
{
    echo"unauthorized request";   
}
    ?>