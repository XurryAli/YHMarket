		
			var t = n = 0, count;
	//轮播图================================================>>>
			$(document).ready(function(){	
				
				count=$(".banner-list a").length;
				//隐藏除了第一个子元素外的所有子元素
				$(".banner-list a:not(:first-child)").hide();
				//给按钮li添加点击事件
				$(".banner li").click(function() {
					
					var i = $(this).text() - 1;
					n = i;
					if (i >= count) return;
					
					$(".banner-list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
					
					$(this).toggleClass("banner-btn");
					
					$(this).siblings().removeAttr("class");
				});
				
				t = setInterval("showAuto()", 3000);
				
//				$(".banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 3000);});
				
	//商品列表================================================>>>
				
				$('.shop-classify li').unbind('mouseenter').mouseenter(function(){
					
					//隐藏其它的二级ul列表
					$('.classify-details ul').not($(this).index()).css({display:"none"})
					//添加一级ul列表中li里面i元素内的图标背景
					$(this).find('i').css({display:'block',background:"url(img/icons-add.png) no-repeat",backgroundPosition:"-21px -12px",left:"190px",top:"20px"})
					//改变背景色
					$(this).css({background:'#e84652'})
					//显示轮播图中的一级列表
					$('.classify-details').css({display:'block'})
					//显示鼠标所在一级列表下的二级列表
					$('.classify-details ul').eq($(this).index()).css({display:"block"})
				
				}).unbind('mouseleave').mouseleave(function(){
					//该表以及列表背景色
					$(this).css({background:'#e81a29'})
					//隐藏一级ul列表中li里面i元素内的图标
					$(this).find('i').css({display:'none'})
					//隐藏一级列表
					$('.classify-details').css({display:'none'})
					
				})
				
				//添加轮播图中二级列表的鼠标移入一出事件
				$('.classify-details').unbind('mouseenter').mouseenter(function(){
					//显示一二级列表
					$('.shop-classify').show();
					$('.classify-details').show();
				}).unbind('mouseleave').mouseleave(function(){
					//隐藏一二级列表
//					$('.shop-classify').hide();
					$('.classify-details').hide();
				})
				
				//右边小按钮点击事件
				$('.hot-chosen-btn li').unbind('click').click(function(){
					var $this = $(this);
					var $others = $(this).siblings();
					//判断是否有需要添加的class
					if($this.hasClass('btn-click')){
						//如果有就移除
						$this.removeClass('btn-click')
					}else{
						//如果没有就添加
						$this.addClass('btn-click')
					}
					//移出其他元素的class
					$others.removeClass('btn-click')
					console.log($this.index())
					$('.hot-chosen-list ul').not($this.index()).hide().eq($this.index()).show()
					
				})
				
				
				//右边小按钮点击事件
				$('.guest-chosen-btn li').unbind('click').click(function(){
					var $this = $(this);
					var $others = $(this).siblings();
					//判断是否有需要添加的class
					if($this.hasClass('btn-click')){
						//如果有就移除
						$this.removeClass('btn-click')
					}else{
						//如果没有就添加
						$this.addClass('btn-click')
					}
					//移出其他元素的class
					$others.removeClass('btn-click')
					
					$('.guest-list ul').not($this.index()).hide().eq($this.index()).show()
					
				})
				
				
				
				//======================  floor ====================================>>>>
				
				$('.first-title-item li').click(function(){
					var $other = $(this).siblings()
						$(this).css({'border-bottom': '4px solid #E40011'})
					 $other.css({'border':'none'})
				})
				
				$('.second-title-item li').click(function(){
					var $other = $(this).siblings()
						$(this).css({'border-bottom': '4px solid #f5a01a'})
					 $other.css({'border':'none'})
				})
				
				$('.third-title-item li').click(function(){
					var $other = $(this).siblings()
						$(this).css({'border-bottom': '4px solid #70c4d8'})
					 $other.css({'border':'none'})
				})
				
				
			})
			
			function showAuto(){
				n = n >=(count - 1) ? 0 : ++n;
				$(".banner li").eq(n).trigger('click');
			}