<?php
include "connect.php";//引入数据库连接。

$pagesize = 9; //声明一个变量，单个页面展示的数据条数。

$result = $conn->query("select * from woniulist"); //获取所有的数据的结果集(记录集)   22条数据

$num = $result->num_rows; //记录集的总条数  22

$pagenum = ceil($num / $pagesize); //获取页数  3页


//获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//获取前端传来的页码
    $pagevalue = $_GET['page'];//将页面赋值给$pagevalue
} else {//前端没有传入页面 赋值1
    $pagevalue = 1;
}


//计算limit第一个参数的结果。返回数据的偏移值。
$page = ($pagevalue - 1) * $pagesize;
//第一页：  $page=0
//第二页：  $page=10
//第三页：  $page=20

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目(条数)。
//select * from taobaogoods limit 0,10
//获取表中的数据，从第1条开始取10条

//select * from taobaogoods limit 10,10
//获取表中的数据，从第11条开始取10条

//select * from taobaogoods limit 20,10
//获取表中的数据，从第21条开始取10条


//根据limit获取对应的条数的数据。
//$res:获取的结果集(输出json即可)
$res = $conn->query("select * from woniulist limit $page,$pagesize");


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口

// class pagedata{

// }

// $page1 = new pagedata();
// $page1->pageno=$pagenum;
// $page1->pagedate=$arr;
// echo json_encode($page1);
