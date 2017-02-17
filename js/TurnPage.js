var cloneDom = function(opts){
	var _default = {
		baseDom: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false, //如果 page = true 的情况，要实现分页
		pageContainer: null
	}
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加	
	$this.newObj = $.extend(_default, opts);
	
	//确定数据源
	$.init = function(_callback){
		//如果数据源为空则不执行其它操作
		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if($this.newObj.data[0]){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url)	{
			$.get($this.newObj.url + '?_=' + Math.random(), function(_response){
//				console.log(_response);
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
//				console.log($this.newObj.data);
				if(_callback && typeof _callback == 'function'){
					_callback();
				}
			})
		}
		return true;
	}

	$.generateHtml = function(_page){
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data[0]){
			return false;
		}
		
		$($this.newObj.baseDom).not(":first-child").remove();
		
		for(var i = _min; i <= _max; i++){
			if($this.newObj.data[i]){
//				console.log($this.newObj.data.length);
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				
				
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					
					if($(_element).is('img')){
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-bind')]);
						
					}else{
						$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')]);
						
					}
					
				})
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
		
		
		$('.allGoods li').unbind('mouseenter').mouseenter(function(){
					console.log(1)
					$(this).addClass("shadow");
					$(this).children('div').animate({opacity:1},400);
				}).unbind('mouseleave').mouseleave(function(){
					$(this).children('div').animate({opacity:0},400);
					$(this).removeClass("shadow");
				})
				

					$('.joinCart').click(function(){
						var GOODSNAME = "GOODSNAME";  //cookie记录商品名字的key
						var GOODSPRICE = "GOODSPRICE";  //cookie记录商品价格的key；
						var GOODSIMG = "GOODSIMG"; //cookie记录商品名图片路径
						
						var goodsNameStr = getCookie(GOODSNAME);
						var goodspriceStr = getCookie(GOODSPRICE);
						var goodsImgStr = getCookie(GOODSIMG);
						
						
						var goodsNameArr = [];
						var goodsPriceArr = [];
						var goodsImgArr = [];
						
						if(goodsNameStr){  //判断是否存在数据
							goodsNameArr = goodsNameStr.split("&");
							goodsPriceArr = goodspriceStr.split("&");
							goodsImgArr = goodsImgStr.split("&");
						}
						
						var $getSrc = $(this).parent().children("img")[0].src
						var $getTitle = $(this).parent().children("span").text();
						var $getPrice = $(this).parent().children("i").children(".priceNum").text();
//						console.log("===>"+$getSrc + "===>" + $getTitle + "====>" + $getPrice)
						
						function saveGoods($getTitle,$getPrice,$getSrc){
							goodsNameArr.push($getTitle);
							goodsPriceArr.push($getPrice);
							goodsImgArr.push($getSrc);
							
							//将数组转化成字符串，存到cookie里面
							var temNameStr = goodsNameArr.join("&");
							var temPriceStr = goodsPriceArr.join("&");
							var temImgStr = goodsImgArr.join("&");
							
							//更新本地cookie
							removeCookie(GOODSNAME);
							removeCookie(GOODSPRICE);
							removeCookie(GOODSIMG);
							
							var day = new Date();
							day.setDate(day.getDate()+15);
							
							setCookie(GOODSNAME,temNameStr,day);
							setCookie(GOODSPRICE,temPriceStr,day);
							setCookie(GOODSIMG,temImgStr,day);
							
						}
						
							saveGoods($getTitle,$getPrice,$getSrc)	
							alert("添加成功")
					})
				
		
	}
	
	$.dkpage = function(){
			$($this.newObj.pageContainer).pagination({
	            dataSource: $this.newObj.data,
	            pageSize: $this.newObj.cloneSize,
	          callback: function (response, pagination) {
	          	$this.refresh(pagination.pageNumber);
	          }
	        });
	        
	        $($this.newObj.pageContainer).addHook('beforePageOnClick', function(_event, _pagenumber){
	        	$this.refresh(_pagenumber);
	        })
		}

	this.refresh = function(_page){
		//如果数据源 data 为空，而且 url 不为空，则定为需要 ajax 请求数据源
		if(!this.newObj.data[0] && this.newObj.url){
			//调用初始化方法并把生成 html 方法当回调函数执行
//			init(generateHtml);
			 $.init(function(){
			 	$.generateHtml(_page);
			 	if($this.newObj.page){
			 		$.dkpage();
			 	}
			 });
		} else if(this.newObj.data && !this.newObj.data instanceof Array){
			//直接调用数据初始化方法
			var _init = $.init();
			if(_init){
				//调用生成 html 的方法
				$.generateHtml(_page);
				if($this.newObj.page){
			 		$.dkpage();
			 	}
			}	
		}else if(this.newObj.data && this.newObj.data instanceof Array){
			$.generateHtml(_page);
		}
	}

	this.refresh(1);
}
//obj{
//nodeName   url     
//}
/*$.get('libs/data/navs.txt?_=' + Math.random(), function(response){
		dkScope.navs = window.eval('(' + response + ')');
		var _html = '';
		jQuery.each(dkScope.navs, function(_index, _obj){
			_html += '<ul>';
			$.each(_obj['nav'], function(_navIndex, _navObj){
				_html += '<li>';
				//<a href="jd.com">家居</a>
				_html += '<a href="' + _navObj.url + '">' + _navObj.title + '</a>';
				_html += '</li>';
			})
			_html += '</ul>';
		})
		$('.dk-banner>div>div').eq(0).html(_html);
	})*/

/**
 * [CreateHtml description]
 * @param {[type]} _baseDom [基础 dom 结构]
 * @param {[type]} _params  [对象]
 */
function CreateHtml(_baseDom){
	var frm = this;
	var _defaluts = {
		url: '',
		data: null,
	};
	var _response = [
		{"caption": "农资", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家居", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家具", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "家装", "subNav": [{"id": 1609},{"id": 1606}]},
		{"caption": "厨具", "subNav": [{"id": 1609},{"id": 1606}]},	
	];
	// _response = '[{"caption": "农资", "url": "jd.com", "id": 1}]';
	var _data = null;
	if(typeof _response == 'string'){
		_data = JSON.parse(_response);
	} else if(typeof _response == 'object'){
		_data = _response;
	} else{
		return false;
	}

	if(_data && typeof _data == 'object'){
		_defaluts.data = _data instanceof Array ? _data : [_data];
	}

	//把 _baseDom 转成 jQuery 对象
	var $baseDom = $(_baseDom);


	var dkScope = new Object();

	this.dkFor = function(_paramDom, _paramData){
		_paramDom = $(_paramDom);
		var _dkFors = _paramDom.attr('dk-for').split('=>');
		var _dkForFirst = $.trim(_dkFors[0]);
		var _dkForLast = $.trim(_dkFors[_dkFors.length - 1]);
		var _dkForLastSplit = _dkForLast.split('.')[_dkForLast.split('.').length - 1];
		var _domData = _paramData || _defaluts[_dkForLast];
		if(_paramData){
			$.each(_dkForLast.split('.'), function(_index, _split){
				_domData = _domData[_split];
			})
			console.log(_domData);
		}

		$.each(_domData, function(_index, _data){
			var _cloneDom = _paramDom.clone(true).appendTo(_paramDom.parent());
			var _obj = {};
			_obj[_dkForFirst] = _data;
			_cloneDom.data('data', _obj);
			if($('[dk-for]', _paramDom)[0]){
				frm.dkFor($('[dk-for]', _cloneDom)[0], _obj);
			}
		})
		_paramDom.remove();
	};
	if($baseDom.attr('dk-for') || $('[dk-for]', $baseDom)[0]){
		this.dkFor($baseDom);
	}
}

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}	
})


