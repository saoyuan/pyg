$(function(){
    init()
    function init (){
      
    }
    $("#zc").on("tap",function(){
      
        getReg()
        
    })

    function getReg(){
        // 获取表单内容
        var data = $("form").serialize();
        console.log(data);
        
        // $.ajax({
        //     type: "post",
        //     url: "http://api.pyg.ak48.xyz/api/public/v1/login",
        //     data: {

        //     },
        //     dataType: "dataType",
        //     success: function (res) {
                
        //     }
        // });
    }
})