! function($) {
    class Login {
        constructor() {
            this.$loginflag = true;
            this.$pasflag = true;
        }

        init() {
            this.effect();
            this.render();

        }

        effect() {
            $('.login-right .kk').on('click', function() {
                $(this).css({
                    border: '1px solid orange'
                }).siblings('.kk').css({
                    border: '1px solid #dedede'
                })

                $(this).find('input').attr('placeholder', '')
            });

            $('.login-yzm-pic').html(Math.random().toString(16).slice(-4))
            $('.login-yzm-pic').on('click', function() {
                $('.login-yzm-pic').html(Math.random().toString(16).slice(-4))
            })
        }

        render() {


            $('.login-right a').on('click', function() {
                if ($('.login-yzm-inp').val() != $('.login-yzm-pic').html()) {
                    $('.ero2').css({
                        display: 'block'
                    })

                } else {
                    $('.ero2').css({
                        display: 'none'
                    })

                    $ajax({
                        type: 'post',
                        url: 'http://localhost/HTML5/wnshop/php/login.php',
                        data: {
                            username: $('.username').val(),
                            pasw: $('.password').val()
                                //这里用attr拿不到标签的value值，value一般用val()来获取
                                //前端这里的名字，要和后端获取的名字一样
                        }
                    }).then((data) => {
                        console.log(data);

                        if (data == false) { //不存在，登录错误
                            $('.ero1').css({
                                display: 'block'
                            })
                        } else {
                            $('.ero1').css({
                                display: 'none'
                            })
                            location.href = 'firstpage.html';
                            // 用户名和密码错误也跳转,因为您不能在这里设置跳转到后端页面去，要是这样设置了，那么后端就算错误了后端的跳转页面也会执行，结果就是错误信息没办法及时反馈回来。
                            // 正确做法是就在js页面设置跳转页面到首页
                        }
                    })
                }

            })




        }
    }
    new Login().init()
}(jQuery)