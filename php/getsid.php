<?php

include "connect.php";

if (isset($_POST['sid'])) {
    $sid = $_POST['sid']; //接收前端传入的sid
    $result = $conn->query("select * from woniulist where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
