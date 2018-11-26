$.ajaxSettings.beforeSend = function (xhr, obj) {
    obj.url = "http://api.pyg.ak48.xyz/api/public/v1/"+ obj.url;



    $("body").addClass("loadding");
    
  }




//   ajax 发送请求完成

$.ajaxSettings.complete = function () {
    $("body").removeClass("loadding");
	
}





function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

