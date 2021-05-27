$(function() {
    $('body').append('<div id="cli_dialog_div" class="barcodecontainer"></div>');

     $(document).click(function(event){
      var _con = $('#cli_dialog_div').parent();   // 设置目标区域
      if(_con.is('div') && _con.is(':visible') && !_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
        console.log("对话框打开,需要隐藏")
         _con.hide("explode");          //淡出消失
       //$( "#cli_dialog_div" ).dialog("close");
        }
     });

});


jQuery.fn.wait = function (func, times, interval) {
    var _times = times || -1, //100次
    _interval = interval || 20, //20毫秒每次 
    _self = this,
    _selector = this.selector, //选择器
    _iIntervalID; //定时器id
    if( this.length ){ //如果已经获取到了，就直接执行函数
        func && func.call(this);
    } else {
        _iIntervalID = setInterval(function() {
            if(!_times) { //是0就退出
                clearInterval(_iIntervalID);
            }
            _times <= 0 || _times--; //如果是正数就 --
            
            _self = $(_selector); //再次选择
            if( _self.length ) { //判断是否取到
                func && func.call(_self);
                clearInterval(_iIntervalID);
            }
        }, _interval);
    }
    return this;
}

chrome.extension.onRequest.addListener(function(message, sender, sendResponse) {
     var version="2.2.0";
     var type = message['type'];
     var url = message['url'];
     var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
　　  if(reg.test(url)){
      var _con = $('#cli_dialog_div').parent(); 
          if(_con && !_con.is(':visible') ){
            _con.show();
          }
        $('#cli_dialog_div').html('<div id="dialog" title="永辉条形码有情提示"><p>别逗了，条形码里会有汉字！</p></div>')
        $('#cli_dialog_div').dialog({
              'title': '永辉条形码',
               closeOnEscape:false, 
               autoOpen: true,
               show: {
                effect: "blind",
                duration: 1000
               },
               hide: {
                effect: "explode",
                duration: 1000
               }
        });
        setTimeout(function () {$( "#cli_dialog_div" ).dialog("close");}, 2000);
        }   
      else{
          var _con = $('#cli_dialog_div').parent(); 
          if(_con && !_con.is(':visible') ){
            _con.show();
          }
           $('#cli_dialog_div').empty().barcode(url,"code128",{
              output:'svg',
              color:'#000000',
              barWidth:2,
              barHeight:90,
              addQuietZone:false
           });

        $('#cli_dialog_div img').wait(function() { //等待#btn_comment_submit元素的加载
          var i=new Image()
          i.src=$('#cli_dialog_div').html().match(/"(.*?)"/)[1];
          i.onload=function(){
            width = this.width<285? 350: this.width+60
            console.log(width)
            $('#cli_dialog_div').dialog({
            'title': '永辉条形码',
            width : width,
            height: "170",
             hide: {
                effect: "explode",
                duration: 1000
               }
        });
            //alert(this.width+'/'+this.height)

          }

          });

         

         // $('#cli_dialog_div').html('<img src="https://barcode.tec-it.com/barcode.ashx?data='+encodeURIComponent(url)+'&code=Code128&translate-esc=false&unit=Fit&dpi=96&imagetype=png&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=0"></img>');
          
    
    } 
});


