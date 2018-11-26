$(function () {

  

    // 全局变量
    // 总页数
    var totalpages = 1;
    // 传递的参数
    var searchData={
        query:"",
        cid:getUrl("cid"),
        pagenum:1,
        pagesize:10
    }
    // console.log(searchData);
    init();

    function init() {
        dianji()
        mui.init({
            pullRefresh: {
              container: ".pyg_view",
              down: {
                auto: true,
                //  触发下拉刷新时自动触发
                callback: function () {

                        // 重置页数
                        searchData.pagenum = 1;
                    getSearch(function(data){
                        var html = template("searchtp",{data})
                        $(".good_list").html(html)
                        mui('.pyg_view').pullRefresh().endPulldownToRefresh();
                        // 重置下拉事件
                        mui('.pyg_view').pullRefresh().refresh(true);
                    });
                }
              },
              up:{
                //  触发上拉刷新时自动触发
                callback:function () {
                    // console.log(searchData.pagenum);
                    
                    // 判断有没有数据
                    if(searchData.pagenum >= totalpages){
                        // 没有数据 结束上拉事件
                        mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                    }else{
                        searchData.pagenum ++;
                        getSearch(function(data){
                            var html = template("searchtp",{data})
                            $(".good_list").append(html)
                            mui('.pyg_view').pullRefresh().endPullupToRefresh(false);
                        });
                    }
                }
              }
            }
          });


       
    }

    function getSearch( callback){
        $.ajax({
            type: "get",
            url: "goods/search",
            data:searchData,
            dataType: "json",
            success: function (res) {
                // console.log(res);
                if(res.meta.status == 200 ){
                    // 成功
                //   计算总页数
                totalpages = Math.ceil(res.data.total/ searchData.pagesize)
              
                
                    callback(res.data.goods)
                }else{
                    // 失败
                }
                
            }
        });
    }

    // 解除a标签无法点击
   function dianji(){
       $(".good_list").on("tap","a",function(){
           var href = this.href;
           location.href=href;
       })
   }
    

})