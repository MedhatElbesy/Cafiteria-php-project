<?php
session_start();
function loginApi()
{
   // catch data from XMLHttpRequest
    $logindata= json_decode(file_get_contents("php://input"),true);
    include("db.php");
    $email=safeInput($logindata['email']);
    $password=safeInput($logindata['password']);
 // create database conection object  
    $dataConectionObject = new DB();
     // postion(admin :user) check  
    if ($logindata['postion']=='admin')
    {
        try{
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
            $_SESSION["password"]=$password;
            return 1;

        }
        else{
             
            return 0;
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
            $_SESSION["password"]=$password;
            return 1;

        }
        else{
            return 0;
        }
    }

}
// create function to clean input from spaces and avoid bad inputs like special characters and html tags
function safeInput($input){
    $input=trim($input);
    $input=addslashes($input);
    $input=HTMLspecialchars($input);
    return $input;

};
 
  
$result=loginApi();
 echo  $result ; 
 
 

?>  

 