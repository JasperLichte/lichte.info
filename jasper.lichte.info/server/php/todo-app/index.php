<?php

require('./credentials.php');

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>

<div class="tasks">
<?php

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} else {    
    $res = $conn->query('SELECT * FROM tasks');
    
    while($row = $res->fetch_assoc()) {
        echo '<div class="res">' . $row['name'] . '</div>';
    }
}

?>
</div>
    
<div class="inputs">
    <input type="text" name="" id="">
    <button></button>
</div>

</body>
</html>