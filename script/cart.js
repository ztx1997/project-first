! function($) {

    function runcart(sid, num) {
        $ajax({
            url: 'http://localhost/HTML5/wnshop/php/alldata.php'
        }).then((data) => {
            var jsondata = JSON.parse(data);

            // for (var value of jsondata) {
            $.each(jsondata, function(index, value) {
                if (value.sid == sid) {
                    let $clonebox = $('.trthree-probk-pro:hidden').clone(true, true);
                    $clonebox.find('.trthree-bk-pro2').find('img').attr('src', value.pic);
                    $clonebox.find('.trthree-bk-pro2').find('img').attr('sid', value.sid);
                    $clonebox.find('.trthree-bk-pro2').find('strong').html('九阴真经 - ' + value.title);
                    $clonebox.find('.trthree-bk-pro3').find('i').html(Number(value.price).toFixed(2));
                    $clonebox.find('.trthree-bk-pro4').find('input').val(num);

                    // 计算单价
                    $clonebox.find('.trthree-bk-pro5').find('em').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.trthree-probk').append($clonebox);

                    // 计算总价
                    calcprice();
                }

            })
        })
    }

    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let arrsid = $.cookie('cookiesid').split(',');
        let arrnum = $.cookie('cookienum').split(',');
        console.log(arrsid);
        console.log(arrnum);


        // for (var i = 0; i < arrsid.length; i++) {
        //     runcart(arrsid[i], arrnum[i]);
        // }

        $.each(arrsid, function(index, value) {
            runcart(arrsid[index], arrnum[index]);
        });

    }

    // 计算总价
    function calcprice() {
        let $sum = 0; //商品的件数
        let $count = 0; //商品的总价
        $('.trthree-probk-pro:visible').each(function(index, ele) {
            if ($(ele).find('.trthree-bk-pro1 input').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('.trthree-bk-pro4 input').val());
                $count += parseFloat($(ele).find('.trthree-bk-pro5 em').html());
            }
        });
        $('.trfour-num').html($sum);
        $('.trfour-price').html('￥' + $count.toFixed(2));
    }

    // 全选
    $('.checktwo').on('change', function() {
        $('.trthree-probk-pro').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.checktwo').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    let $inputs = $('.trthree-probk-pro').find(':checkbox');
    $('.trthree-probk').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.trthree-probk-pro:visible').find(':checkbox').length === $('.trthree-probk-pro').find('input:checked').size()) {
            $('.checktwo').prop('checked', true);
        } else {
            $('.checktwo').prop('checked', false);
        }
        calcprice(); //计算总价
    });

    console.log($('.trthree-probk-pro'));


    // 数量改变同时价格改变
    $('.addnum').on('click', function() {
        let $num = $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val();
        $num++;
        $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val($num);

        $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro5 em').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });


    $('.minu').on('click', function() {
        let $num = $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val($num);
        $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro5 em').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });


    $('.trthree-bk-pro4 input').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.trthree-probk-pro').find('.trthree-bk-pro5 em').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    // 计算单价
    function calcsingleprice(obj) { //obj元素对象
        let $dj = parseFloat(obj.parents('.trthree-probk-pro').find('.trthree-bk-pro3 i').html());
        let $num = parseInt(obj.parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val());
        return ($dj * $num).toFixed(2)
    }


    // 改变后的数量存在cookie中
    let arrsid2 = []; //存储商品的编号。
    let arrnum2 = []; //存储商品的数量。
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid2 = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum2 = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid2 = [];
            arrnum2 = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.trthree-probk-pro').find('img').attr('sid');
        arrnum2[$.inArray($sid, arrsid2)] = obj.parents('.trthree-probk-pro').find('.trthree-bk-pro4 input').val();
        $.cookie('cookienum', arrnum2, 10);
    }


    // 删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum2.splice($index, 1);

        $.cookie('cookiesid', arrsid, 10);
        $.cookie('cookienum', arrnum2, 10);
    }

    $('.trthree-bk-pro6-cancel').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.trthree-probk-pro').remove();
            delcookie($(this).parents('.trthree-probk-pro').find('img').attr('sid'), arrsid2);
            calcprice(); //计算总价
        }
    });

    $('.trfour-cancel').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.trthree-probk-pro:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid2);
                }
            });
            calcprice(); //计算总价
        }
    });
}(jQuery)