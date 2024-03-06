<?php
////////////////////////////// ALL FORM INPUTS MUST FILL BEFOUR REQUEST  //////////////////

    session_start();
    if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $response;
        updateUserData();
        header('Content-Type: application/json');
        echo json_encode($response);
         
    }
    else{
        echo"unauthorized request";   
    }

    function updateUserData()
    {
        global $response;
        // creating instances of database class and validation class
        include("db.php");
        include("validation.php");
        $dataConectionObject = new DB();
        $validationObject = new Validation();


////////////////////////////// ID input MUST BE READONLY SO THIS ADMIN CAN'T CHANGE IT'S VALUE //////////////////


        $id= $_POST["id"];



           // applying validation methods on form data
        $fname =$validationObject->fnames($validationObject->safeInput($_POST['fname']));
        $lname =$validationObject->lnames($validationObject->safeInput($_POST['lname']));
        $email =$validationObject->email($validationObject->safeInput($_POST['email']));
        $password =$validationObject->password($validationObject->safeInput($_POST['password']));
        $room =$validationObject->room($validationObject->safeInput($_POST['room']));
        $src =$validationObject->imeg($_FILES["img"]['name']);
       // checking of validation result before update
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
            // checking of imeg existsing and uploading case before update
            if (! file_exists('http://localhost/Cafiteria/images/'.$_FILES["img"]['name']))
                {
                    if (move_uploaded_file($_FILES["img"]["tmp_name"],"../images/$id.jpg"))
                    {
                        try{
                            $result= $dataConectionObject->update_data("customers","fname = '$fname', lname = '$lname', email = '$email', password = '$password', img = '$src', room = '$room'","id='$id'");
                            if($result==true){
                                $response = [
                                    'status' => 'success',
                                    'message' => 'update done successfully.'
                                ];}
                                else{
                                    $response = [
                                        'status' => 'failed',
                                        'message' => 'No match in database'
                                    ];
                                }
                              
                        }catch(Exception $e){
                                $response = [ 'status' => 'failed',
                                'message' => $e->getMessage() ];
                            }
                    }
                    else
                    {
                        $response = [
                            'status' => 'failed',
                            'message' => 'update failed uploading imeg case.',
                            
                        ];
                        return;
                    }
                }
            else
            {
                try{
                    $result= $dataConectionObject->update_data("customers","fname = '$fname', lname = '$lname', email = '$email', password = '$password', img = '$src', room = '$room'","id='$id'");
                    if($result==true){
                        $response = [
                            'status' => 'success',
                            'message' => 'update done successfully.'
                        ];}
                        else{
                            $response = [
                                'status' => 'failed',
                                'message' => 'No match in database'
                            ];
                        }
                }catch(Exception $e){
                        $response = [ 'status' => 'failed',
                        'message' => $e->getMessage() ];
                    }
            }
           
        
        
        }
    }

?>

 
 

 