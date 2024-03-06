 
<?php
 
    session_start();
    if(isset($_SESSION["postion"]) && $_SESSION["postion"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $response;
        deleteUser();
        header('Content-Type: application/json');
        echo json_encode($response);
         
    }
    else{
        echo"unauthorized request";   
    }

    function deleteUser()
    {
        global $response;
        // creating instances of database class and validation class
        include("db.php");
        include("validation.php");
        $dataConectionObject = new DB();
        $id= $_POST["id"];
       
        try{ 
            $result=$dataConectionObject->delete_data("customers","id ='$id'");
            if($result==true){
            $response = [
                'status' => 'success',
                'message' => 'delete done successfully.'
            ];}
            else{
                $response = [
                    'status' => 'failed',
                    'message' => 'No match in database'
                ];
            }
        }
        catch(Exception $e){
            $response = [ 'status' => 'failed',
            'message' => $e->getMessage() ];
        }

        

   
    }

?>

 
 

 