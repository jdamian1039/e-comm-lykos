<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "signup";

$message = '';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if(!$conn){
    die("No hay conexión: ".mysqli_connect_error());
}

$name = $_POST["name"];
$email = $_POST["email"];
$pass = $_POST["password"];

$query = mysqli_query($conn, "SELECT * FROM signup WHERE user = '".$nombre."' and password = '".$pass."');
$nr = mysqli_num_rows($query);

if($nr == 1){
    echo "Bienvenido:" .$name;
}else if($nr == 0){
    echo "no ingreso";
}

if(!empty($_POST['email']) && !empty($_POST['password'])){
    $sql = "INSERT INTO user (email, password) VALUES(:email, :password)"; 
    $stmt = $query->prepare($sql);
    $stmt = $bindParam->(':email',$_POST['email']);
    $password = password_hash($_POSTY['password'], PASSWORD_BCRYPT);
    $stmt = $bindParam->(':email',$_POST['email']);

    if($stmt->execute()){
        $message = 'Successfully';
    }else{
        $message = 'Failed';

    }
}

?>