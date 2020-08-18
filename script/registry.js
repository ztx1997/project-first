! function($) {
    let $usernameflag = true;
    let $passwordflag = true;
    let $sureposflag = true;
    let $phoneflag = true;
    let $yzmflag = true;
    let $agreeflag = true;

    $('.registpos input').hover(function() {
        $(this).css({
            border: '1px solid #999',
            color: '#333'
        })
    }, function() {
        $(this).css({
            border: '1px solid #e5e5e5',
            color: '#999',
            cursor: 'text'
        })
    })


    //用户名验证
    $('.username2').on('click', function() {
        $(this).css({
            display: 'none'
        })
        $('.username').css({
            display: 'block'

        }).focus()
    })

    $('.username').blur(function() {
        if ($('.username').val() == '') {
            $('.username').css({
                display: 'none'
            })
            $('.username2').val('用户名不能为空').css({
                border: '1px solid red',
                color: 'red',
                display: 'block'
            })
            $('.username2').parent().find('.con').css({
                display: 'block'
            })
            $('.username2').unbind('mouseenter').unbind('mouseleave');
            $usernameflag = false;



        } else {
            let $reg = /^\w{6,25}$/;

            if (!$reg.test($('.username').val())) {
                $('.username').css({
                    display: 'none'
                })
                $('.username2').val('账号至少为6位，且为字母数字和下划线').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                });
                $('.username2').unbind('mouseenter').unbind('mouseleave'); //取消hover事件
                $usernameflag = false;

            } else {
                $('.username').css({
                    display: 'block'
                })
                $('.username').parent().find('.con').css({
                    display: 'none'
                });
                $('.username').unbind('click');

                $ajax({
                    type: 'post',
                    url: 'http://localhost/HTML5/wnshop/php/reg.php',
                    data: {
                        name: $('.username').val()
                            //这里用attr拿不到标签的value值，value一般用val()来获取
                    }
                }).then((data) => {
                    console.log(data);

                    if (data) { //存在，不可以注册
                        $('.username2').val('该用户名已被注册').css({
                            border: '1px solid red',
                            color: 'red',
                            display: 'block'

                        });

                        $('.username').css({
                            display: 'none'
                        })
                        $usernameflag = false;
                    } else {
                        $usernameflag = true;
                    }
                })



            }
        }
    })

    // 密码验证
    $('.password2').on('click', function() {
        $(this).css({
            display: 'none'
        })
        $('.password').css({
            display: 'block'

        }).focus()
    })


    $('.password').blur(function() {
        if ($(this).val() == '') {
            $('.password').css({
                display: 'none'
            })
            $('.password2').val('密码不能为空').css({
                border: '1px solid red',
                color: 'red',
                display: 'block'
            })

            $('.password2').parent().find('.con').css({
                display: 'block'
            })
            $(this).unbind('mouseenter').unbind('mouseleave');
            $passwordflag = false;

        } else {
            let $reg = /^\w{6,20}$/;
            if (!$reg.test($(this).val())) {
                $('.password').css({
                    display: 'none'
                })
                $('.password2').val('密码至少为6位').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                });
                $('.password2').parent().find('.con').css({
                    display: 'block'
                });
                $('.password2').unbind('mouseenter').unbind('mouseleave'); //取消hover事件
                $passwordflag = false;

            } else {
                $('.password').css({
                    display: 'block'
                })

                $(this).parent().find('.con').css({
                    display: 'none'
                });
                $(this).unbind('click');
                $passwordflag = true;
            }
        }
    })

    // 确认密码
    $('.surepos2').on('click', function() {
        $(this).css({
            display: 'none'
        })
        $('.surepos').css({
            display: 'block'

        }).focus()
    })

    $('.surepos').blur(function() {
        if ($(this).val() == '') {
            $('.surepos').css({
                display: 'none'
            })
            $('.surepos2').val('请再次输入您设置的密码').css({
                border: '1px solid red',
                color: 'red',
                display: 'block'
            })
            $('.surepos2').parent().find('.con').css({
                display: 'block'
            })
            $('.surepos2').unbind('mouseenter').unbind('mouseleave');
            $sureposflag = false;

        } else {
            if (!($('.password').val() == $('.surepos').val())) {
                $('.surepos').css({
                    display: 'none'
                })
                $('.surepos2').val('两次输入密码不一致').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                })
                $sureposflag = false;

            } else {
                $('.surepos').css({
                    display: 'block'
                })
                $(this).parent().find('.con').css({
                    display: 'none'
                });
                $(this).unbind('click');
                $sureposflag = true;
            }
        }
    })


    // 手机号码验证
    $('.phone2').on('click', function() {
        $(this).css({
            display: 'none'
        })
        $('.phone').css({
            display: 'block'

        }).focus()
    })

    $('.phone').blur(function() {
        if ($(this).val() == '') {
            $('.phone').css({
                display: 'none'
            })
            $('.phone2').val('手机号码不能为空').css({
                border: '1px solid red',
                color: 'red',
                display: 'block'
            })
            $('.phone2').parent().find('.con').css({
                display: 'block'
            })
            $('.phone2').unbind('mouseenter').unbind('mouseleave');
            $phoneflag = false;

        } else {
            let $reg = /^[1]([3-9])[0-9]{9}$/;

            if (!$reg.test($(this).val())) {
                $('.phone').css({
                    display: 'none'
                })
                $('.phone2').val('请正确填写手机号').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                });
                $('.phone2').unbind('mouseenter').unbind('mouseleave'); //取消hover事件
                $phoneflag = false;

            } else {
                $('.phone').css({
                    display: 'block'
                })
                $(this).parent().find('.con').css({
                    display: 'none'
                });
                $(this).unbind('click');
                $phoneflag = true;
            }
        }
    })

    // 验证码

    $('.yzminp').on('click', function() {
        $(this).val('').css({
            border: '1px solid #e5e5e5',
            cursor: 'text',
            color: '#000'
        })
    })

    function changeyzm() {
        let $yzm = Math.random().toString(16).slice(-4);
        $('.yzmpic').html($yzm);
    }
    changeyzm()
    $('.yzmchange').on('click', function() {
        changeyzm()
    })





    // 协议按钮
    if ($('.sub-check').prop('checked')) {
        $agreeflag = true;
    } else {
        $agreeflag = false;
    }

    // 注册按钮
    $('.zcinp').on('click', function() {
            if ($('.yzminp').val() != $('.yzmpic').html()) {
                $yzmflag = false;
            } else {
                $yzmflag = true;
            }
            // console.log(String($usernameflag) + $passwordflag + $sureposflag + $phoneflag + $yzmflag + $agreeflag);
            // console.log($('.yzminp').val());
            // console.log($('.yzmpic').html());








            if ($usernameflag && $passwordflag && $sureposflag && $phoneflag && $yzmflag && $agreeflag) {
                $('form').attr('action', "http://localhost/HTML5/wnshop/php/reg.php")
            } else {
                $('.username').css({
                    display: 'none'
                });
                $('.username2').val('用户名不能为空').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                });
                $('.username').parent().find('.con').css({
                    display: 'block'
                });


                $('.password').css({
                    display: 'none'
                })
                $('.password2').val('密码不能为空').css({
                    border: '1px solid red',
                    color: 'red',
                    display: 'block'
                });
                $('.password2').parent().find('.con').css({
                    display: 'block'
                });
            }
        })
        //怎么里面的注册又消失了= =


}(jQuery)