function _hotZone() {
	var _exports = {},
	imgList = $("img[needHotZone=1]"), //需要画热区的img
	num = 0, //热区个数
	startPosX, //鼠标开始点击的x坐标
	startPosY; //鼠标开始点击的y坐标
	_exports.init = function () {
		if (!imgList || imgList.length < 1)
			return false;
		imgList.each(function (index, val) {
			var mousedownFlag = mousemoveFlag = false;
			var _this = $(val);
			_this.mousedown(function () {
				mousedownFlag = true;
				startPosX = event.pageX;
				startPosY = event.pageY;
				//绑定mousemove事件
				_this.mousemove(function () {
					if (!mousemoveFlag)
						mousemoveFlag = true;
					var x2 = event.pageX;
					var y2 = event.pageY;
					var width = Math.abs(startPosX - x2);
					var height = Math.abs(startPosY - y2);
					var _startPosX = startPosX < x2 ? startPosX : x2;
					var _startPosY = startPosY < y2 ? startPosY : y2;
					var area = $("<div class='expireDiv'></div>").css({
							"border" : "2px solid #7AC5CD",
							"z-index" : 55,
							"position" : "absolute",
							"top" : _startPosY,
							"left" : _startPosX,
							"height" : height,
							"width" : width
						});

					$('div.expireDiv').remove();
					$('body').append(area);
				})
			})

			$('body').mouseup(function () {
				if (mousedownFlag && mousemoveFlag) {
					_this.unbind('mousemove');
					var icon = $("<div index=icon_" + num + "></div>").attr("style", "background-image:url(img/x.png);height:20px;width:20px;z-index:56;position:absolute;top:" + ($('body div.expireDiv').css("top").slice(0, -2) - 10 + "px") + ";left:" + ($('body div.expireDiv').css("left").slice(0, -2) - 0 + ($('body div.expireDiv').css("width").slice(0, -2) - 0) - 10 + "px") + ";");
					$('body div.expireDiv').removeClass("expireDiv").attr("index", "div_" + num);
					$('body').append(icon);
					//热区
					if (!_this.attr("usemap")) {
						_this.attr("usemap", "#planetmap_" + index);
					}

					if ($("map[name='planetmap_" + index + "']").length < 1) {
						$('body').append("<map name='planetmap_" + index + "' id='planetmap_" + index + "'></map>");
					}
					num++;
					mousedownFlag = mousemoveFlag = false;
					
					var ex = event.pageX;
					var ey = event.pageY ;
					$(".popwin").css({"top":startPosY,"left":startPosX,"display":"block"});
					var url="";
					$("#hotUrlSubmit").unbind();
					$("#hotUrlSubmit").click(function(){
						url=$("#hotUrl").val();
						var area = '<area shape="rect" coords="' + (startPosX - _this.offset().left) + ',' + (startPosY - _this.offset().top) + ',' + (ex - _this.offset().left) + ',' + (ey - _this.offset().top) + '" href ="'+url+'" target="_blank" />';
						$("map[name='planetmap_" + index + "']").append(area);
						$(".popwin").css("display","none").children("#hotUrl").val("");
					})
				}
				if (mousedownFlag && !mousemoveFlag) {
					_this.unbind('mousemove');
					mousedownFlag = false;
				}
			})

		})

		$(document).on('click', "div[index*='icon_']", function () {
			$(this).remove();
			$("div[index=div_" + $(this).attr("index").split("_")[1] + "]").remove();
		})
	}
	return _exports;
}
var hotZoneObj = new _hotZone();
