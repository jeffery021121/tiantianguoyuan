window.onload=function(){
	//判断有没有登录，并且进行下一步的显示
	var _json=getCookie("login")
	if(_json.length!=0){
		$("#lo_reg").find("a").eq(0).text("您好，"+_json["login"]).attr("href","javascript:;")
		$("#lo_reg").find("a").eq(1).text("退出").attr("href","javascript:;")
	}
	$("#lo_reg").find("a").eq(1).click(function(){
			if(_json.length!=0){
				setCookie("login",JSON.stringify([]))
				_json=getCookie("login")
				$("#lo_reg").find("a").eq(0).html(["&ensp;登录&ensp;"])
				$("#lo_reg").find("a").eq(1).html(["&nbsp;注册有惊喜&nbsp;"])
			}else{
				$("#lo_reg").find("a").eq(1).attr("href","register.html")
			}
	})
	$("#lo_reg").find("a").eq(0).click(function(){
			if(_json.length!=0){
				$(this).attr("href","javascript:;")
			}else{
				$(this).attr("href","login.html")
			}
	})
	//购物车中的结算点击
		$("#shop_show").on("click","#pay_now",function(){
			if(_json.length==0){
				location.href="login.html"
			}else{
				location.href="shopCar.html"
			}
		})
	//点击结算跳转页面，这个页面应该是购物车的页面的，我先跳转到登录页，以后改
	$("#check_out").click(function(){
		if(_json.length==0){
				location.href="login.html"
			}else{
				location.href="shopCar.html"
			}
	})
	//header部分的城市划过和点击的效果
	$(".all_city li:has(ul)").click(function(e){
		var e=e||event
		e.stopPropagation()
		$(this).find("span").toggleClass("rota1")
		if(!$(this).find("span").hasClass("rota1")){
			$(this).find("span").addClass("rota2")
		}else{
			$(this).find("span").removeClass("rota2")
		}
		$(this).find("ul").stop().toggle(1000)
		$(this).find("ul li").click(function(){
			$("#city").text($(this).text())
		})
	})
	$(".all_city>li").not($(".all_city>li").has("ul")).click(function(e){
		var e=e||event
		e.stopPropagation()
		$("#city").text($(this).text())
	})
	$(".hot_city li").click(function(){
		$("#city").text($(this).text())
	})
	$(".all_city>li").not($(".all_city>li").has("ul")).hover(function(){
		$(this).css("background","#EEEEEE")
	},function(){
		$(this).css("background","white")
	})
	$(".all_city li:has(ul)").find("div").hover(function(){
		$(this).css("background","#EEEEEE")
	},function(){
		$(this).css("background","white")
	})
	
	var new_left=$(".last_notice").prev().find("span").width()+5
	var new_top=-1.8*$(".last_notice").prev().find("span").height()
	$("#new").css({"left":new_left,"top":new_top})
	$("#search>div").last().click(function(e){
		var e=e||event
		e.stopPropagation()
		if($(this).hasClass("seach_right")){
			$(this).removeClass("seach_right")
			$(this).addClass("changebg")
			$("#shopcar_con").slideDown(500)
		}else{
			$(this).removeClass("changebg")
			$(this).addClass("seach_right")
			$("#shopcar_con").slideUp(500)
		}
	})
	//nav处的点击切换效果
	$("#intro").find("li").click(function(){
		$(this).addClass("active_intro").siblings().removeClass("active_intro")
	})
	//banner部分
	var timer=setInterval(fun,2000)
	index=0
	function fun(){
		if(index==$("#sbanner>ul li").length-1){
			clearInterval(timer)
			$("#sbanner ul").css("left",0)
			index=0
			timer=setInterval(fun,2000)
		}
		index++
		//console.log(index)//  1,2,0    
		$("#sbanner>ol li").eq(index==3?0:index).css("background","rgba(100,161,49,1)").siblings().css("background","rgba(100,161,49,0.1)")
		$("#sbanner ul").stop().animate({"left":-1263*index},1000)
		
	}
	$("#sbanner>ul li").mouseenter(function(){
		clearInterval(timer)
	})
	$("#sbanner>ul li").mouseleave(function(){
		timer=setInterval(fun,2000)
	})
	$("#sbanner>ol li").mouseenter(function(){
		clearInterval(timer)
	})
	$("#sbanner>ol li").mouseleave(function(){
		
		timer=setInterval(fun,2000)
	})
	$("#sbanner>ol li").click(function(){
		$(this).css("background","rgba(100,161,49,1)").siblings().css("background","rgba(100,161,49,0.1)")
		index=$(this).index()
		$("#sbanner ul").stop().animate({"left":-1263*index},1000)
	})
	//右侧边栏
	$("#top3").click(function(){
			$("html,body").animate({"scrollTop":0},500)	
		})
	var deffered=$.ajax({
		type:"get",
		url:"../json/product.json",
		async:true
	});
	//ajax请求，后边所有的代码都在这里	
	deffered.done(function(res){
		//楼梯主要板块拼接
		var str="";
		for(var i=0;i<res.length;++i){
				for(var j=0;j<res[i]["product"].length;++j){
					//拼接的都放在starsmain里面，即从其后开始拼接，写好类名
					str=str+
					`<div class="s_stairs_Box">
						<a href="#" class="img_a">
						<img src="../img/${res[i]['product'][j]['src']}" alt="" width="242"/>
						<span class="discount">${res[i]['product'][j]['discount']}</span>
						</a>
						<a href="#" class="pro_intro">${res[i]['product'][j]['intro']}</a>
						<span class="buythis">
							
						</span>
						<span class="price">${res[i]['product'][j]['price']}</span>
					</div>`
					
				}
				$("."+res[i]["name"]).html(str);
				str=new String();
		}
		//折扣显示
		for(let i_dis=0;i_dis<$(".discount").length;++i_dis){
			$(".discount").eq(i_dis).css("display","none")
			if($(".discount").eq(i_dis).text()!=0){
				$(".discount").eq(i_dis).css("display","block")
				//console.log($(".discount").eq(i_dis).html().length)
				if($(".discount").eq(i_dis).text().length==17){
					$(".discount").eq(i_dis).css("background","#65A032")
				}
			}
		}
		
		
		//左侧楼梯点击效果
		$("#louti").find("li").click(function(){
			var index=$(this).index()
			//console.log(index)
			//console.log($(".s_stairs").eq(index).offset().top)
			$("html,body").animate({"scrollTop":$(".s_stairs").eq(index).offset().top},1000)
		})
		
		//万恶的购物车
		//叉号点击隐藏遮罩层
		$("#close").click(function(){
			$("#mask").fadeOut(1000)
			$(".buythis").stop().animate({"background-position-x":"-517px","background-position-y":"-243px"})
		})
		
		//点击继续购物，和叉号操作一样
		$("#continue").click(function(){
			$("#mask").fadeOut(1000)
			$(".buythis").stop().animate({"background-position-x":"-517px","background-position-y":"-243px"})
		})
		//购物车按钮点击，遮罩层出现，存cookie，变化遮罩层里面的
		//数据，购物车读取cookie，并且做出显示
		$(".buythis").click(function(){
			$(this).stop().animate({"background-position-x":"-514px","background-position-y":"-291px"})
			$("#mask").fadeIn(1000)
			//存cookie，并且判断购物车中同一种商品的数量，进行显示
			$par=$(this).parent()
			var arr=[]
			var value={
				"count":1,
				"intro":$par.find(".pro_intro").text(),
				"price":$par.find(".price").text(),
				"src":$par.find("img").attr("src")
			}
			var flag=true
			oldCookie=getCookie("goods")
			//判断是否有cookie
			if(oldCookie!=0){
				arr=oldCookie
				for(let i=0 ; i<arr.length; ++i){
					//判断有没有相同的产品
					if(arr[i]["src"]==value["src"]){
						flag=false
						arr[i]["count"]++
					}
				}
			}
			//flag为真代表无重复
			if(flag){
				arr.push(value)
			}
			//设置cookie
			setCookie("goods",JSON.stringify(arr))
			//购物车中有数据的话，那行字儿消失
			$("#shopcar_con #null_show").css("display","none")
			var sum=0
			var payall=0
			var str_1=""
			var str_2=""
			var str=""
			for(let i=0 ; i<arr.length; ++i){
				sum+=parseInt(arr[i]["count"])
				str=arr[i]["price"].substr(1)//拼接字符串的时候一定不要有
				//空格，因为万一取字符串进行操作的话，很麻烦。
				payall+=arr[i]["count"]*parseFloat(str)
				str_1+=`<li class="pro_list">
							<a href="#">
								<img src="${arr[i]['src']}" width="70" height="70"/>
								<div class="shopcar_intro">
									<h5>${arr[i]['intro']}</h5>
									<h5>${arr[i]['price']}</h5>
								</div>
							</a>
							<div class="pro_num">
								<span class="add_num change_num" data-number="-1">-</span>
								<span class="show_num">${arr[i]['count']}</span>
								<span class="sub_num change_num" data-number="1">+</span>
							</div>
							<span class="del">
								删除
							</span>
						</li>`
			}
			$("#shopcar").html(str_1)//ul和list
			$("#shop_num").html($("#shopcar li").length)
			$("#price_all").html(payall)//这个是总价格
			$("#num").html(sum)//这个是总个数
			//下面是万恶的购物车中的万恶的字符串拼接,第一个拼到循环里了
			str_2=`<div id="line">
				<div id="sum_num">
					共
					<span id="sum_numshow">${sum}</span>
					件商品
				</div>
				<div id="sum_price">
					商品小计
					<span id="pay_money">${payall}</span>
				</div>
			</div>
			<input type="button" id="pay_now" value="立即结算" />`
			$("#shop_show").html(str_2)
		})
		//上面字符串拼接完成，小购物车点击事件完成，现在是大购物车的点击事件，以及各种修改
		//先阻止购物车点击冒泡
		$("#shopcar_con").click(function(e){
			var e=e||event
			e.stopPropagation()
		})
		//加减的操作
		$("#shopcar").on("click",".change_num",function(){
			var sign=$(this).data("number")
			var count=$(this).parent().find(".show_num").text()
			if(sign==-1&&count==1){
				count=1
			}else{
				$(this).parent().find(".show_num").html(parseInt(count)+parseInt(sign))
			}
			//重置cookie
			var arr=[]
			var index=$(this).parent().parent().index()
			arr=getCookie("goods")
			arr[index]["count"]=$(this).parent().find(".show_num").html()
			setCookie("goods",JSON.stringify(arr))
			var sum=0
			var str=""
			var payall=0
			for(let i=0;i<arr.length;++i){
				sum+=parseInt(arr[i]["count"])
				str=arr[i]["price"].substr(1)//拼接字符串的时候一定不要有
				//空格，因为万一取字符串进行操作的话，很麻烦。
				payall+=arr[i]["count"]*parseFloat(str)
			}
			//$("#shop_show")
			//console.log(sum+"  =>> "+payall)
			$("#sum_numshow").html(sum)
			$("#pay_money").html(payall)
		})
		//删除键的操作，关于购物车的操作都是结合cookie来做的
		$("#shopcar").on("click",".del",function(){
			var arr=[]
			var index=$(this).parent().index()
			arr=getCookie("goods")
			arr.splice(index,1)
			setCookie("goods",JSON.stringify(arr))
			$(this).parent().hide(500,function(){
				$(this).remove()
				$("#shop_num").html($("#shopcar li").length)
			})
			//这里是总数的变化
			var sum=0
			var str=""
			var payall=0
			for(let i=0;i<arr.length;++i){
				sum+=parseInt(arr[i]["count"])
				str=arr[i]["price"].substr(1)//拼接字符串的时候一定不要有
				//空格，因为万一取字符串进行操作的话，很麻烦。
				payall+=arr[i]["count"]*parseFloat(str)
			}
			//$("#shop_show")
			//console.log(sum+"  =>> "+payall)
			$("#sum_numshow").html(sum)
			$("#pay_money").html(payall)
			if(sum==0){
				$("#shop_show").html("")
				$("#null_show").css("display","block")
			}
		})
		//进来如果有购物车信习的话，先显示购物车信息
		var arr=getCookie("goods")
		if(arr!=0){
			$("#shopcar_con #null_show").css("display","none")
			var sum=0
			var payall=0
			var str_1=""
			var str_2=""
			var str=""
			for(let i=0 ; i<arr.length; ++i){
				sum+=parseInt(arr[i]["count"])
				str=arr[i]["price"].substr(1)//拼接字符串的时候一定不要有
				//空格，因为万一取字符串进行操作的话，很麻烦。
				payall+=arr[i]["count"]*parseFloat(str)
				str_1+=`<li class="pro_list">
							<a href="#">
								<img src="${arr[i]['src']}" width="70" height="70"/>
								<div class="shopcar_intro">
									<h5>${arr[i]['intro']}</h5>
									<h5>${arr[i]['price']}</h5>
								</div>
							</a>
							<div class="pro_num">
								<span class="add_num change_num" data-number="-1">-</span>
								<span class="show_num">${arr[i]['count']}</span>
								<span class="sub_num change_num" data-number="1">+</span>
							</div>
							<span class="del">
								删除
							</span>
						</li>`
			}
			//下面是万恶的购物车中的万恶的字符串拼接,第一个拼到循环里了
			$("#shopcar").html(str_1)//ul和list
			$("#shop_num").html($("#shopcar li").length)
			$("#price_all").html(payall)//这个是总价格
			$("#num").html(sum)//这个是总个数
			str_2=`<div id="line">
						<div id="sum_num">
							共
							<span id="sum_numshow">${sum}</span>
							件商品
						</div>
						<div id="sum_price">
							商品小计
							<span id="pay_money">${payall}</span>
						</div>
					</div>
					<input type="button" id="pay_now" value="立即结算" />`
			$("#shop_show").html(str_2)
			
		}
	})//ajax请求完成后的数据在其中
	
	
	//有关滚动的特效，吸顶，楼梯侧边栏等
	//这里不能设置body或者HTML height：100%
		window.onscroll=function(){
			if($(document).scrollTop()>=$(".s_stairs").eq(0).offset().top){
				//alert()
				for(let i=0;i<$(".s_stairs").length;++i){
					if($(document).scrollTop()>=$(".s_stairs").eq(i).offset().top&&$(document).scrollTop()<$(".s_stairs").eq(i).offset().top+$(".s_stairs").eq(i).outerHeight()){
						$("#louti").find("li").eq(i).css("color","sienna")
					}else{
						$("#louti").find("li").eq(i).css("color","black")
					}
				}
				$("#louti").stop().animate({"left":0},1000)
			}else{
				$("#louti").stop().animate({"left":-32},1000)
			}
			if($(document).scrollTop()>=$("#header").outerHeight()){
				$("#nav").css("position","relative")
				$("#nav").css("z-index",100)
				//$(".nav").stop().animate({"top":$(document).scrollTop()-168})
				$("#nav").css({"top":$(document).scrollTop()-$("#header").outerHeight()})
				//console.log($("#nav").offset().top+"==>"+$(document).scrollTop())
			}else{
				$("#nav").css("position","static")
			}
		}
		//有关滚动的效果又不见了，不能给HTML和body加高度100%
}//onload

//缓存问题，最为致命啊






