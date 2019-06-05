<?php
include("ClassConnection.php");

class ClassCars extends ClassConnection{
    // Display cars in json format
    public function displayCars(){
        $BFetch=$this->connectDB()->prepare("select * from cars")->execute();;
        // $BFetch

        $J=[];
        $I=0;

        while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)) {
            $J[$I] = [
                "id"=>$Fetch["id"],
                "Brand"=>$Fetch["Brand"],
                "Model"=>$Fetch["Model"],
                "Year"=>$Fetch["Year"],
            ];

            $I++;
        }

        header("Acess-Control-Allow-Origin:*");
        header("Content-Type-application/json:*");
        echo json_encode($J);
    }
}
