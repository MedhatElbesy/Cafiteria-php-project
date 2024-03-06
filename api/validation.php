<?php
class Validation{
    public $erros=[];
    function fnames($name){
        if(strlen($name)<3){
            $this->erros['fname']='FName lower than 3 chars';
        
        }
        return $name;
    }
    function lnames($name){
        if(strlen($name)<3){
            $this->erros['lname']='LName lower than 3 chars';

        
        }
        return $name;
    }
    function email($email){
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $this->erros['email']='Email is not valid';

        
        }
        return $email;
    }
    function password($password){
        if ( strlen($password)<7){
            $this->erros['password']='password lower than 7 chars';
        }
        return $password;
    }
    function room($room){
        if (! is_numeric($room)){
            $this->erros['room']='invalid room input';
        }
        
            return $room;
        
    }
    function imeg($src){
        $fileExtension = strtolower(pathinfo( $src, PATHINFO_EXTENSION));
        $allowedImagExtension = array(
            "png",
            "jpg",
            "jpeg"
        );
        if (! in_array($fileExtension, $allowedImagExtension)){
            $this->erros['imeg']='invalid imeg file';

        }
        return $src;
         
    }
    function safeInput($input){
        $input=trim($input);
        $input=addslashes($input);
        $input=HTMLspecialchars($input);
        return $input;
    
    }


 }

 ?>