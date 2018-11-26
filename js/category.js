$(function () {


    // 给本地存储设置一个时间
    init()
    var catedatas;
    var leftscroll;

    function init() {
        dianji()
        renderCategories();
        eventList();
    }
    // 左边
    function renderCategories() {

        // 本地储存
        // 判断本地是否存储了数据
        if (localStorage.getItem("cates")) {
            // 有
            var catesstr = localStorage.getItem("cates")
            var jsonData = JSON.parse(catesstr);
            // console.log(catedatas);
            if (Date.now() - jsonData.time > 10 * 1000) {
                getCategories()
            } else {
                catedatas = jsonData.data;
                renderLeft();
                renderRight(0);
            }

        } else {
            // 没
            getCategories()
        }



    }
    // 右边
    function renderRight(index) {

        //   console.log(catedatas);

        var childrens = catedatas[index].children;
        var righthtml = template("righttp", {
            data: childrens
        })
        $(".box").html(righthtml);

        var time = $(".right img ").length;
        $(".right img ").on("load", function () {
            time--;
            if (time == 0) {
                var rightscroll = new IScroll('.right');
            }

        })

    }


    // 给左边里注册点击事件
    function eventList() {
        $(".left").on("tap", "li", function () {

            // console.log($(this));
            $(this).addClass("active").siblings().removeClass("active")
            var index = $(this).index();
            renderRight(index)
            leftscroll.scrollToElement(this);
        })
    }


    // 渲染左边
    function renderLeft() {
        var lefthtml = template("lefttp", {
            data: catedatas
        })
        $(".left").html(lefthtml)
        leftscroll = new IScroll('.left');
    }

    // ajax 请求
    function getCategories() {
        $.ajax({
            type: "get",
            url: "categories",
            // data: "data",
            dataType: "json",
            success: function (res) {
                if (res.meta.status == 200) {
                    // 成功
                    catedatas = res.data;
                    // 存起来
                    var obj = {
                        data: catedatas,
                        time: Date.now()
                    }
                    var jsonCateDatas = JSON.stringify(obj);
                    localStorage.setItem("cates", jsonCateDatas)
                    renderLeft();
                    renderRight(0);

                } else {
                    // 失败
                }
            }
        });
    }

    function dianji(){
        $(".right").on("tap","a",function(){
            var href = this.href;
            location.href=href;
        })
    }

})