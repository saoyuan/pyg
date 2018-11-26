$(function () {
    init()

    function init() {
        getswiperdata();
        getcatitems();
        getgoodslist();
    }
    /**
     * 轮播图请求
     */
    function getswiperdata() {
        $.ajax({
            type: "get",
            url: "home/swiperdata",
            //   data: "data",
            dataType: "json",
            success: function (res) {
                // console.log(res);

                if (res.meta.status == 200) {
                    // 成功
                    var html = template("bannertp", res);

                    $(".pyg_slidea").html(html);

                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                } else {
                    // 失败
                }
            }
        });
    }

    function getcatitems(){
        $.ajax({
            type: "get",
            url: "home/catitems",
            // data: "data",
            dataType: "json",
            success: function (res) {
                if(res.meta.status ==200){
                    // 成功
                    var html = template("navtp",{data:res.data})
                    $(".pyg_nav").html(html);
                }else{
                    // 失败
                }
            }
        });
    }

    function getgoodslist(){
        $.ajax({
            type: "get",
            url: "home/goodslist",
            // data: "data",
            dataType: "json",
            success: function (res) {
                if(res.meta.status == 200){
                    var html = template("listp",{data:res.data})
                    $(".goods_list").html(html)
                }

            }
        });
    }
})