! function($) {
    let array_default = []; //排序前的数组
    let array = []; //排序中的数组
    let prev = null;
    let next = null;

    $ajax({
        url: 'http://localhost/HTML5/wnshop/php/listdata.php'
    }).then((data) => {
        let jsondata = JSON.parse(data);
        let str = '';

        for (let value of jsondata) {
            str += `
            <li class="item">
            <a href="detail.html?sid=${value.sid}">
                <img class="lazy" data-original="${value.pic}" alt="">
            </a>
            <div class="item-intro">
                <span>${value.title}</span>
                <i>￥${value.price}.00</i>
            </div>
        </li>
            `
        }
        $('.result-product ul').html(str);
        $(function() {
            $('img.lazy').lazyload({
                effect: 'fadeIn'
            })
        })


        // 分页设置


        $('.result-product ul li').each(function(index, element) {
                array_default[index] = $(element);
                array[index] = $(element);
            })
            // console.log(array);
    })

    // 告知后端当前请求的是第几页数据
    $('.page').pagination({
        pageCount: 3,
        jump: true,
        prevContent: '上一页',
        nextContent: '下一页',
        callback: function(api) {
            $.ajax({
                url: 'http://localhost/HTML5/wnshop/php/listdata.php',
                data: { //将分页对象返回的页码传输给后端
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).then(function(data) { //根据页码重新获取接口数据，进行渲染。
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li class="item">
                 <a href="detail.html?sid=${value.sid}">
                      <img class="lazy" data-original="${value.pic}" alt="">
                 </a>
                 <div class="item-intro">
                     <span>${value.title}</span>
                     <i>￥${value.price}.00</i>
                    </div>
                </li>
                    `


                })

                $('.result-product ul').html($strhtml)
                $(function() {
                    $('img.lazy').lazyload({
                        effect: 'fadeIn'
                    })
                })

                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;


                $('.result-product ul li').each(function(index, element) {
                    array_default[index] = $(element);
                    array[index] = $(element);
                })
            })
        }
    })



    $('.sail-two').on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.item-intro i').html().substring(1));
                next = parseFloat(array[j + 1].find('.item-intro i').html().substring(1));
                //substring(1)是取出￥符号

                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        $('.result-product ul').empty(); //清空原来的列表
        $.each(array, function(index, value) {
            $('.result-product ul').append(value);
        });
    })
}(jQuery)