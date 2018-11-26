$(function () {

    var detailData = {
        goods_id: getUrl("goods_id")
    }
    init()

    function init() {
        getDetail()
    }
    // 发送ajax请求
    function getDetail() {
        $.ajax({
            type: "get",
            url: "goods/detail",
            data: detailData,
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.meta.status == 200) {
                    // 成功
                    var html = template("detailtp", res.data)
                    $(".pyg_view").html(html)
                    var gallery = mui('.mui-slider');
                    gallery.slider({
                        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                    });
                } else {
                    // 失败
                }

            }
        });
    }


   





})