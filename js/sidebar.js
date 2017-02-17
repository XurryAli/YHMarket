//=========================  侧边栏事件  ===============> 
$(function(){
				$(window).scroll(function () {
					//获取当前滚动条滚动的距离
			        var $scrollTop = $(document).scrollTop()
//			        console.log($scrollTop)
						
					//判断什么时候出现回到顶部的按钮
					if($scrollTop > 0){
						$('.sidebar').show()
					}else{
						$('.sidebar').hide();
					}
					
				});	
					

				$('.sidebar img').eq(2).mouseenter(function(){
					$(this).attr("src","img/fixed4.png");
				}).mouseleave(function(){
					$(this).attr("src","img/fixed3.png");
				})
				
				$('.sidebar img').eq(1).mouseenter(function(){
					$(this).attr("src","img/fixed6.png");
				}).mouseleave(function(){
					$(this).attr("src","img/fixed2.png");
				})
				
				$('.sidebar img').eq(0).mouseenter(function(){
					$(this).attr("src","img/fixed5.png");
				}).mouseleave(function(){
					$(this).attr("src","img/fixed1.png");
				})
				
				$('.sidebar img').eq(3).mouseenter(function(){
					$('.qr-triangle').show();
					$('.qr-app').show();
				}).mouseleave(function(){
					$('.qr-triangle').hide();
					$('.qr-app').hide();
				})
				
				$('.qr-app').mouseenter(function(){
					$('.qr-triangle').show();
					$('.qr-app').show();
				}).mouseleave(function(){
					$('.qr-triangle').hide();
					$('.qr-app').hide();
				})
				
				$('.qr-triangle').mouseenter(function(){
					$('.qr-triangle').show();
					$('.qr-app').show();
				}).mouseleave(function(){
					$('.qr-triangle').hide();
					$('.qr-app').hide();
				})
})				