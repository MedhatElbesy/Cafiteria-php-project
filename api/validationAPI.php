<?php
class Validation{
    public $erros=[];

    static function safeInput($input){
        $input=trim($input);
        $input=addslashes($input);
        $input=HTMLspecialchars($input);
        return $input;
    
    }

    
    function name($name){
        $name= Validation::safeInput($name);
        if(strlen($name)<3){
            $this->erros['name']='Name lower than 3 chars';
        
        }
        return $name;
    }

    function number($num){
        $num= Validation::safeInput($num);
        if((!is_numeric($num)) || $num<=0){
            $this->erros['Num']='invalid Number';
        }
        
            return $num;
        
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
            $this->erros['why']=$fileExtension;

        }
        return $src;
         
    }



 }

 ?>