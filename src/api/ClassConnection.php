<?php
abstract class ClassConnection{
    // Database connection
    protected function connectDB() {
        try{
            $Con = new PDO("mysql:host=localhost:dbname=react","root","");
            return $Con;
        }catch(PDOException $Erro) {
            return $Erro->getMessage();
        }
    }
}