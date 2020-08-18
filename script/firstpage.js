! function($) {
    let timer = null;
    let $lis = $('.list-two-title li');
    let $tline = $('.two-line');


    // banner的侧边栏弹出框
    $('.banner-menu-pro').hover(function() {
        $(this).css({
            backgroundColor: '#fff',
        })
        $(this).find('i').css({
            color: '#000'
        })
        $(this).find('.ban-menu-subnav').css({
            display: 'block'
        })
    }, function() {
        $(this).css({
            backgroundColor: '#323436'
        })
        $(this).find('i').css({
            color: '#fff'
        })
        $(this).find('.ban-menu-subnav').css({
            display: 'none'
        })

    })

    // banner轮播图效果
    let $lunb = $('.lunb');
    let $listul = $('.lunb ul');
    let $listli = $('.lunb ul li');
    let $left = $('.lunb-left');
    let $right = $('.lunb-right');
    let $btnlist = $('.lunb-bot a');
    let $num = 0;
    let timer2 = null; //timer发生冲突

    let $liwidth = $listli.eq(0).width(); //eq(0)：随便找一个元素
    $listul.width($listli * $listli.length);


    $right.on('click', function() {
        lunbo();
    })

    $left.on('click', function() {
        $num -= 2;
        lunbo();
    })
    console.log($listli.length);


    function lunbo() {
        $num++;

        if ($num === $btnlist.length + 1) {
            $listul.css({
                left: 0
            });
            $num = 1;
        }

        if ($num === -1) { //后面多了一个li
            $listul.css({
                left: -$btnlist.length * $liwidth
            });
            $num = $listli.length - 1; //索引是正常的。
        }

        $listul.stop(true).animate({
            left: -$num * $liwidth
        })

        if ($num === $listli.length - 1) {
            $btnlist.eq(0).addClass('active').siblings().removeClass('active');
        } else {
            $btnlist.eq($num).addClass('active').siblings().removeClass('active');
        }

    }
    timer2 = setInterval(function() {
        lunbo();
    }, 3000)

    // 游戏道具渲染

    // $lis.hover(function() {
    //     if (!$(this).$tline.find('line1')) {
    //         $tline.eq($(this).index()).addClass('line1');
    //     }
    // }, function() {
    //     // if (!$(this).find('line1')) {
    //     $tline.eq($(this).index()).removeClass('line1');
    //     // }
    // })
    // 悬停效果没实现
    $lis.on('click', function() {
        $tline.removeClass('line1');
        $tline.eq($(this).index()).addClass('line1');
    })

    $ajax({
        url: 'http://localhost/HTML5/wnshop/php/firstpage.php'
    }).then((data) => {
        let jsondata = JSON.parse(data);
        console.log(jsondata);

        let str = '';
        for (let value of jsondata) {
            str += `
        <li>
            <a href="list.html">
                <p>${value.title}</p>
                <span>${value.price}元</span>
                <div class="list-two-imgbox">
                    <img class="lazy" data-original="${value.pic}" alt="">
                </div>
            </a>
        </li>
                `
        }

        $('.list-two-product ul').html(str);
        $(function() { //和拼接的元素放在一起。
            $("img.lazy").lazyload({
                effect: "fadeIn" //图片显示方式 谈入
            });
        });
    })

    //一键返回顶部
    let $sidebtn = $('.side4');

    $sidebtn.on('click', function() {
            $('html').stop(true).animate({
                scrollTop: 0
            })
        })
        //$(window)的动画里面没有scrollTop这个效果
}(jQuery)