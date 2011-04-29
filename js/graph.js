$(document).ready(function() {
  
  //Vars determining the center of the graph
  var offsetScreenX = 510;
  var offsetScreenY = 265;  

  $.getJSON("http://localhost:8888/json/data1.json", function(data) {
    $.each(data.municipios, function(key, val) {
      $('#container').append("<div class='bubbleContainer' id='"+key+"'><div class='outerBubble'></div><div class='innerBubble'></div></div>");
      $('#'+key).css("left",(offsetScreenX).toString()+"px");
      $('#'+key).css("top",(offsetScreenY).toString()+"px");
    });
  });
  
  setTimeout(function(){setValue("http://localhost:8888/json/data1.json");},2000);
  setTimeout(function(){setValue("http://localhost:8888/json/data2.json");},4000);
  
  //changes the values on the graph
  function setValue(url){
    $.getJSON(url, function(data) {
      $.each(data.municipios, function(key, v) {
        updateBubble('#'+key,offsetScreenX+parseInt(v[0]),offsetScreenY+parseInt(v[1]),v[2]);
      });
    });
  }
  
  function updateBubble (bubble,x,y,val){
    var offset = Math.abs(parseInt($(bubble).find('.outerBubble').css('top')) + (parseInt($(bubble).find('.outerBubble').css('height')) - val) / 2)*-1;

    $(bubble).animate({
      left: x.toString(),
      top: y.toString(),
    }, 1000);
    
    $(bubble).find('.outerBubble').animate({
        height: val.toString(),
        width: val.toString(),
        top: offset.toString(),
        left: offset.toString()
      }, 1000);
    
    $(bubble).find('.innerBubble').animate({
        height: (val-10).toString(),
        width: (val-10).toString(),
        top: (offset + 5).toString(),
        left: (offset + 5).toString()
      }, 1000);    
  }
  
  
});