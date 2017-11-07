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
	//alert()
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
	//划过城市，字体变色
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
	//右侧边栏
	$("#top3").click(function(){
			$("html,body").animate({"scrollTop":0},500)	
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
		//阻止购物车list里边的点击冒泡
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
		
		var deffered=$.ajax({
			type:"get",
			url:"../json/select.json",
			async:true
		});
		deffered.done(function(res){
			var str=""
			for(var i=0;i<res.length;++i){
				for (var j in res[i]["init"]) {
					str+=
					`<span class="eve_sel">
							${res[i]["init"][j]}
						</span>`
				}
				$("#"+res[i]["id"]).html(str)
				str=""
			}
		})
		var deffer=$.ajax({
			type:"get",
			url:"../json/list.json",
			async:true
		});
		/*[{},{},{}]*/
		deffer.done(function(res){
			var strt=""
			for(var i in res){
				strt+=`<li>		
						<div class="img_box">
							<img src="../img/${res[i]["src"]}" width="244"/>
							<span class="discount">${res[i]["discount"]}</span>
						</div>
						<div class="intro_pri">
							<span class="int">${res[i]["intro"]}<span>
							<span class="price">${res[i]["price"]}</span>
						</div>
						<div class="kilo_buy">
							<div class="kilo">
								<span class="_kilo">
									${res[i]["kilo"]}
								</span>
							</div>
							<span class="buythis">
							
							</span>
						</div>
					  </li>`
			}
			$("#list_product").html(strt)
			
			//默认按钮
		$(".last_sele").find(".all_left").click(function(){
			$(this).css({"background":"orange","color":"white"})
			$("#hietolow,#lowtohie").css({"background":"#F0F0F0","color":"#555555"})
			var strt=""
			for(var i in res){
				strt+=`<li>		
						<div class="img_box">
							<img src="../img/${res[i]["src"]}" width="244"/>
							<span class="discount">${res[i]["discount"]}</span>
						</div>
						<div class="intro_pri">
							<span class="int">${res[i]["intro"]}<span>
							<span class="price">${res[i]["price"]}</span>
						</div>
						<div class="kilo_buy">
							<div class="kilo">
								<span class="_kilo">
									${res[i]["kilo"]}
								</span>
							</div>
							<span class="buythis">
							
							</span>
						</div>
					  </li>`
			}
			$("#list_product").html(strt)
			all();
		})
		//价格从高到底
		$("#hietolow").click(function(){
			$(".last_sele").find(".all_left").css({"background":"transparent","color":"#555555"})
			$(this).css({"background":"orange","color":"white"}).siblings().css({"background":"#F0F0F0","color":"#555555"})
			var arr=[]
			var brr=[]
			var crr=[]
			for(var x in res){
				str=parseInt(res[x]["price"].substr(1))
				arr.push(str)
			}
			function fun(a,b){
				return b-a
			}
			brr=arr.sort(fun)
			for(var j in brr){
				for(var y in res){
					if(parseInt(res[y]["price"].substr(1))==brr[j]){
						crr.push(res[y])
					}
				}
			}
			var strt=""
			for(var i in crr){
				strt+=`<li>		
						<div class="img_box">
							<img src="../img/${crr[i]["src"]}" width="244"/>
							<span class="discount">${crr[i]["discount"]}</span>
						</div>
						<div class="intro_pri">
							<span class="int">${crr[i]["intro"]}<span>
							<span class="price">${crr[i]["price"]}</span>
						</div>
						<div class="kilo_buy">
							<div class="kilo">
								<span class="_kilo">
									${crr[i]["kilo"]}
								</span>
							</div>
							<span class="buythis">
							
							</span>
						</div>
					  </li>`
			}
			$("#list_product").html(strt)
			all();
		})
		//价格从低到高
		$("#lowtohie").click(function(){
			$(".last_sele").find(".all_left").css({"background":"transparent","color":"#555555"})
			$(this).css({"background":"orange","color":"white"}).siblings().css({"background":"#F0F0F0","color":"#555555"})
			$(".last_sele").find(".all_left").css({"background":"transparent","color":"#555555"})
			$(this).css({"background":"orange","color":"white"}).siblings().css({"background":"#F0F0F0","color":"#555555"})
			var arr=[]
			var brr=[]
			var crr=[]
			for(var x in res){
				str=parseInt(res[x]["price"].substr(1))
				arr.push(str)
			}
			function fun(a,b){
				return a-b
			}
			brr=arr.sort(fun)
			for(var j in brr){
				for(var y in res){
					if(parseInt(res[y]["price"].substr(1))==brr[j]){
						crr.push(res[y])
					}
				}
			}
			var strt=""
			for(var i in crr){
				strt+=`<li>		
						<div class="img_box">
							<img src="../img/${crr[i]["src"]}" width="244"/>
							<span class="discount">${crr[i]["discount"]}</span>
						</div>
						<div class="intro_pri">
							<span class="int">${crr[i]["intro"]}<span>
							<span class="price">${crr[i]["price"]}</span>
						</div>
						<div class="kilo_buy">
							<div class="kilo">
								<span class="_kilo">
									${crr[i]["kilo"]}
								</span>
							</div>
							<span class="buythis">
							
							</span>
						</div>
					  </li>`
			}
			$("#list_product").html(strt)
			all();
		})
			
			
			
			//购物车的细节操作
			//折扣显示
			for(let i_dis=0;i_dis<$(".discount").length;++i_dis){
				$(".discount").eq(i_dis).css("display","none")
				if($(".discount").eq(i_dis).text()!=0){
					$(".discount").eq(i_dis).css("display","block")
					//console.log($(".discount").eq(i_dis).html().length)
					if($(".discount").eq(i_dis).text()=="新品"){
						$(".discount").eq(i_dis).css("background","#65A032")
					}
				}
			}
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
			$par=$(this).parent().parent()
			var arr=[]
			var value={
				"count":1,
				"intro":$par.find(".int").text(),
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
		$(".img_box").click(function(){
			location.href="page.html"
		})
			
		})//ajax
		
		
}//onload


function all(){
	//排序以后点击的效果会出现问题，所以包成一个函数，然后调用	
	//购物车的细节操作
	//折扣显示
	for(let i_dis=0;i_dis<$(".discount").length;++i_dis){
		$(".discount").eq(i_dis).css("display","none")
		if($(".discount").eq(i_dis).text()!=0){
			$(".discount").eq(i_dis).css("display","block")
			//console.log($(".discount").eq(i_dis).html().length)
			if($(".discount").eq(i_dis).text()=="新品"){
				$(".discount").eq(i_dis).css("background","#65A032")
			}
		}
	}
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
		$par=$(this).parent().parent()
		var arr=[]
		var value={
			"count":1,
			"intro":$par.find(".int").text(),
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
	$(".img_box").click(function(){
			location.href="page.html"
			
		})
}