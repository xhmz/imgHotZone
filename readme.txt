//////////////////////////hotZone.js//////
需要jquery；

需要画热区的img 标签加上 needHotZone = 1  eg: <img  src = "img/img.jpg" needHotZone = 1>

需要在页面html里引入"css/base.css"，html添加：

			<div class="popwin">
				<input placeholder="请输入跳转URL" id="hotUrl"/><input type="button" value="确定" id="hotUrlSubmit">
			</div>
	
js调用方式：hotZoneObj.init();