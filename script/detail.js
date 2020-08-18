! function($) {
    class Detail {
        constructor() {
            this.sid = location.search.split('=')[1];
            this.arrsid = [];
            this.arrnum = [];
            this.$num = 1;
        }
        init() {
            this.render();
            this.changenum();
            this.cart();
            this.scale();
        }

        render() {
            $ajax({
                type: 'post',
                url: 'http://localhost/HTML5/wnshop/php/getsid.php',
                data: {
                    sid: this.sid
                }
            }).then((data) => {
                let jsondata2 = JSON.parse(data);

                $('.main-l-one img').attr('src', jsondata2.pic);

                $('.df img').attr('src', jsondata2.pic);

                $('.main-r-top h2').html(jsondata2.title)

                $('.curprice').html('￥' + jsondata2.price)

            })
        }

        changenum() {
            //点击按钮增加数量
            $('.info-num-decrease').on('click', () => {
                this.$num--;
                if (this.$num <= 0) {
                    this.$num = 0;
                }

                $('.info-num input').attr('value', this.$num);
            });

            $('.info-num-increase').on('click', () => {
                this.$num++;
                $('.info-num input').attr('value', this.$num);
            })

            //怎么让输入的值也变成value??键盘输入的值无效

        }

        cart() {
            let _this = this;

            function cookiearr() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    _this.arrsid = $.cookie('cookiesid').split(',');
                    _this.arrnum = $.cookie('cookienum').split(',');
                } else {
                    _this.arrsid = [];
                    _this.arrnum = [];
                }
            }

            $('.addcart').on('click', () => {
                cookiearr();

                if (this.arrsid.indexOf(this.sid) === -1) {
                    this.arrsid.push(this.sid);
                    $.cookie('cookiesid', this.arrsid, 14)
                        //浏览器的存储会自动将数据转化为字符串格式
                    this.arrnum.push($('.info-num input').attr('value'));
                    $.cookie('cookienum', this.arrnum, 14);
                } else {
                    let num2 = parseInt(this.arrnum[this.arrsid.indexOf(this.sid)]);

                    let currentconut = parseInt($('.info-num input').attr('value'));

                    console.log(currentconut);

                    this.arrnum[this.arrsid.indexOf(this.sid)] = num2 + currentconut;

                    $.cookie('cookienum', this.arrnum, 14);
                }

                // console.log('加入成功');
                $('.addCartTips').css({
                    display: 'block'
                })
            })

            $('.addCartTips .addonbuy').on('click', function() {
                $('.addCartTips').css({
                    display: 'none'
                })
            })
        }

        scale() {
            let xt = document.querySelector('.xt');
            let xf = document.querySelector('.xf');
            let dt = document.querySelector('.dt');
            let df = document.querySelector('.df');

            let bili = dt.offsetWidth / df.offsetWidth;
            xf.style.width = xt.offsetWidth / bili + 'px';
            xf.style.height = xt.offsetHeight / bili + 'px';

            xt.onmouseover = function() {
                xf.style.visibility = 'visible';
                dt.style.visibility = 'visible';
                $('.df').css({
                    zIndex: '100'
                })

                document.onmousemove = function(e) {
                    var e = e || window.event;
                    let left = e.pageX - xf.offsetWidth / 2 - $('.xt img').offset().left;
                    let top = e.pageY - xf.offsetHeight / 2 - $('.xt img').offset().top;

                    if (left <= 0) {
                        left = 0
                    } else if (left >= xt.offsetWidth - xf.offsetWidth) {
                        left = xt.offsetWidth - xf.offsetWidth;
                    }

                    if (top <= 0) {
                        top = 0
                    } else if (top >= xt.offsetHeight - xf.offsetHeight) {
                        top = xt.offsetHeight - xf.offsetHeight;
                    }
                    xf.style.left = left + 'px';
                    xf.style.top = top + 'px';

                    dt.style.left = -left * bili + 'px';
                    dt.style.top = -top * bili + 'px';
                }
            }

            xt.onmouseout = function() {
                xf.style.visibility = 'hidden';
                dt.style.visibility = 'hidden';
                $('.df').css({
                    zIndex: '-1'
                })
            }

            console.log($('.xt img').offset().left);

        }
    }
    new Detail().init();
}(jQuery)