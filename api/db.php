<?php

class DB {

    private $host = "localhost";
    private $dbname="test1";
    private $user="root";
    private $connection="";
    private $pass="";
    
   
 
    function __construct(){

        $this->connection = new PDO("mysql:host={$this->host};port=3306;dbname={$this->dbname}", $this->user, $this->pass);
    }

    function get_connection(){
        return $this->connection;
    }

    function query($sql){
        return $this->connection->query($sql);
    }

    function get_data($table_name,$condition=1){
        return $this->connection->query("select * from $table_name where $condition");
    }
    function delete_data($table_name,$condition=1){
        $result=$this->connection->query("delete from $table_name where $condition");
        return $result->rowCount();
    }

    function insert_data($table_name,$columns_names,$values){
        $result =$this->connection->query("INSERT INTO $table_name ($columns_names) VALUES ($values)");
        return $result->rowCount();
    }
    function update_data($table_name,$columns_values,$condition=1){
        $result= $this->connection->query("UPDATE $table_name SET $columns_values WHERE $condition");
        return $result->rowCount();
    }
    
    function beginTransaction(){
        $this->connection->beginTransaction();
    }
    function commit(){
        $this->connection->commit();
    }


}

header('Content-Type: application/json; charset=utf-8');


?>