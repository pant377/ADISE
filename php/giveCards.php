<?php
    $conn = mysqli_connect("localhost", "root", "", "uno");
    if($conn-> connect_error) {
        die("Connection Failed: ". $conn -> connect_error);
    }
    $sql = "SELECT * FROM carddeck order by RAND() LIMIT 7";
    $result = $conn -> query($sql);
    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            echo "<td>" . $row["cardCode"] ."</td>";
        }
    }
    else {
        echo "0 result";
    } 
    $conn -> close();
?>