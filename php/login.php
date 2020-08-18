<?php
include "connect.php";

//检测用户名和密码
if(isset($_POST['username'])&&isset($_POST['pasw'])){
    $name = $_POST['username'];
    $pass = sha1($_POST['pasw']);

    $result=$conn->query("SELECT * FROM registry2020 WHERE username='$name' AND password='$pass'");
    
    if($result->fetch_assoc()){//登录成功
        echo true;//1
    }else{//登录失败
        echo false;//空
    }
}

// header('location:http://localhost/HTML5/wnshop/firstpage.html');