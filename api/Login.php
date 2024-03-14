<?php
session_start();
function loginApi()
{
   // catch data from XMLHttpRequest
    $logindata= json_decode(file_get_contents("php://input"),true);
    include("db.php");
    include("validation.php");
    $validationObject = new Validation();

    $email= $validationObject->safeInput($logindata['email']);
    $password=md5($validationObject->safeInput($logindata['password']));
 // create database conection object  
    $dataConectionObject = new DB();
     // postion(admin :user) check  
    if ($logindata['postion']=='admin')
    {
        try {
        $data =$dataConectionObject ->get_data("admin","email= '$email' and password='$password'");
        $dataarr=$data->fetch(MYSQLI_ASSOC);
    }
        catch(PDOException $e ){echo "".$e->getMessage()."";}
        if($dataarr!=NULL)
        {
             // set SESSION  with admin data
            

            $_SESSION["postion"]= 'admin' ;
            $_SESSION["email"]=$email;
            $_SESSION["id"]=$dataarr['id'];
            $_SESSION["img"]=$dataarr['img'];
            $_SESSION["password"]=$password;
            return $response = [ 'status' => 1,
            'id' => $dataarr['id'],
            'admin_name' => "{$dataarr['fname']} {$dataarr['lname']}",
            'email' => $_SESSION["email"],
            'postion' => $_SESSION["postion"],
            'img' => $_SESSION["img"]
            ];

        }
        else{
        
            return  $response = [ 'status' => 0];
        }
    }
    elseif ($logindata['postion']=='user')
    {
        try{
            $data =$dataConectionObject ->get_data("customers","email= '$email' and password='$password' ");
            $dataarr=$data->fetch(MYSQLI_ASSOC);}
            catch(PDOException $e ){echo "".$e->getMessage()."";}
            if($dataarr!=NULL)
            {
            // set SESSION  with user data

            // session_start();
            $_SESSION["postion"]= 'user' ;
            $_SESSION["email"]=$email;
            $_SESSION["id"]=$dataarr['id'];
            $_SESSION["img"]=$dataarr['img'];
            $_SESSION["password"]=$password;
            return $response = [ 'status' => 1,
            'id' => $dataarr['id'],
            'user_name' => "{$dataarr['fname']} {$dataarr['lname']}",
            'email' => $_SESSION["email"],
            'postion' => $_SESSION["postion"],
            'img' => $_SESSION["img"],
            'room' => $dataarr["room"]
            ];

        }
        else {
            return $response = [ 'status' => 0] ;
        }
    }

}
// create function to clean input from spaces and avoid bad inputs like special characters and html tags
 
  
$result=loginApi();
 echo json_encode($result);
 
 

?>  

 