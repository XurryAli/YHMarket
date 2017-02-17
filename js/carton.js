


//获取属性值的方法
				function getStyleAttribute(obj,attr){
					if(window.getComputedStyle){
						return window.getComputedStyle(obj,null)[attr];
					}
					return obj.currentStyle(attr);
				}
				
				
/**
 * 
 * @param {Object} 需要移动的元素对象
 * @param {Object} 需要修改的属性
 * @param {Object} 目标值
 * @param {Object} 回调函数
 */				
				
function startMove(obj,attr,iTarget,fn){
	
	//清楚旧的定时器
	clearInterval(obj.timer);
	
	//开启新的定时器
	obj.timer = setInterval(function(){
		//1：获取当前值
		var current = 0;
		
		if(attr == "opacity"){ //修改透明度
			current = parseFloat(getStyleAttribute(obj,attr))*100 ; //扩大100倍操作
			current = Math.round(current); //四舍五入
		}else{ //left，top,height,width
			current = parseFloat(getStyleAttribute(obj,attr));
			current = Math.round(current);
		}
		
		
		//2:给一个速度
		
		var iSpeed = (iTarget - current)/8;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		//3:判断是否达到目标值
		if(current == iTarget){
			clearInterval(obj.timer);
			
			if(fn){
				fn();
			}
			
			return;
		}
		
		//4：运动
		if(attr == "opacity"){ //透明度
			obj.style.opacity = (current + iSpeed)/100;
			obj.style.filter = "alpha(opacity=" + ( current + iSpeed ) + ")" ;
			
		}else{ //left,top,height,width
			obj.style[attr] = current + iSpeed + "px";
		}
		
	},30)
}
