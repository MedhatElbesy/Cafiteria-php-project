 
<?php
 
    session_start();
    if(isset($_SESSION["position"]) && $_SESSION["position"]=="admin" && $_SERVER['REQUEST_METHOD'] == 'POST'){
        $response;
        deleteUser();
        // header('Content-Type: application/json');
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
            $dataConectionObject->beginTransaction();
             $dataConectionObject->delete_data("order_product","order_id in( select id from orders where customers_id ='$id')");
             $dataConectionObject->delete_data("orders","customers_id ='$id'");
            $result=$dataConectionObject->delete_data("customers","id ='$id'");
            $dataConectionObject->commit();
            if($result!=0)
            {
            $response = [
                'status' => 'success',
                'message' => 'delete done successfully.'
            ];
            }
            else{
                $response = [
                    'status' => 'failed2',
                    'message' => 'No match in database',
                     
                ];
            }
        }
        catch(Exception $e){
            $response = [ 'status' => 'failed1',
            'message' => $e->getMessage() ];
        }

        

   
    }

?>

 
 

 