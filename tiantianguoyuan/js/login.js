window.onload=function(){
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
		//购物车中的结算点击
		$("#shop_show").on("click","#pay_now",function(){
			location.href="login.html"
		})
		//现在才发现，原来注册登录页面不用传输购物车数据的
		
		//表单验证
		//手机号验证
		var reg_ph=/^1[0-9]{10}$/
		$("#phonenum").blur(function(){
			$(this).removeClass("chage_border")
			//alert()
			if(!reg_ph.test($("#phonenum").val())){
				$(this).css("border-color","red")
				$(this).next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
				$(this).val("")
			}else{
				$(this).next("span").css({"display":"block","background":"url(../img/icons.png) no-repeat -12px -360px"})
				$(this).css("border-color","#ccc")
			}
		})
		//密码验证
		var _json=getCookie("user")
		var reg_pwd=/^[^\u4e00-\u9fa5 ]{6,18}$/
		$("#pwd").blur(function(){
			$(this).removeClass("chage_border")
			//alert()
			if(_json.length!=0){
				if(reg_pwd.test($("#pwd").val())){
					if($("#pwd").val()==_json["pwd"]&&$("#phonenum").val()==_json["phone"]){
						//正确
						$(this).next("span").css({"display":"block","background":"url(../img/icons.png) no-repeat -12px -360px"})
						$(this).css("border-color","#ccc")
					}else{
						//错了
						$(this).css("border-color","red")
						$(this).next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
						$(this).val("")
					}
				}else{
					//错了
					$(this).css("border-color","red")
					$(this).next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
					$(this).val("")
				}
			}else{
				//错了
				$(this).css("border-color","red")
				$(this).next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
				$(this).val("")
			}
		})
		//盒阴影
		$("#logright").find(":text").focus(function(){
			$(this).addClass("chage_border")
			$(this).css("border","1px solid #cccccc")
		})
		
		
		$("#btn_1").click(function(){
			if(_json.length!=0){
				if(reg_pwd.test($("#pwd").val())){
					if($("#pwd").val()==_json["pwd"]&&$("#phonenum").val()==_json["phone"]){
						//正确
						//其他页面判断有没有登录的条件
						setCookie("login",JSON.stringify({"login":$("#phonenum").val()}))
						//跳转
						location.href="index.html"
					}else{
						//错了
						$("#pwd").css("border-color","red")
						$("#pwd").next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
						$("#pwd").val("")
					}
				}else{
					//错了
					$("#pwd").css("border-color","red")
					$("#pwd").next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
					$("#pwd").val("")
				}
			}else{
				//错了
				$("#pwd").css("border-color","red")
				$("#pwd").next("span").css({"display":"block","background":"url(../img/icon-error.png) no-repeat center"})
				$("#pwd").val("")
			}
		})
		$("#regbtn").click(function(){
			location.href="register.html"
		})
		$("#btn_2").click(function(){
			location.href="register.html"
		})
}//onload


	










