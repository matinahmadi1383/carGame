//game
var game_start = false;
//interval
var speed_loss_interval;
var add_car_interval;
var car_move_interval;
var mycar_move_interval;
var coin_add_interval;
//car
var acceleration = 0.0001;
var speed_car = 0.6;
var speed = speed_car;
var maxSpeed_car = 1;
var maxSpeed_car_save = maxSpeed_car;
var nitro = 0;
//maxSpeed_carGame = 2;
//score
var score = 0;
var coin = 0;
//mony
var randomNumber1 = 60;
var randomNumber2 = 80;
var shopCar_src = [];
var shopCar_Name = [];
var line_left=[
	36,
	45,
	55,
	64
]
$(function () {
	$(window).on("resize",function () {
		$("#my_car").css({
			'bottom': '1%',
			'left': '50%',
			'transform':'rotate(0deg)'
		})
		if($(window).width()<1200)
		{
			randomNumber1=40;
			randomNumber2=60;
			line_left=[
				33,
				44,
				56,
				67
			]
		}
		if($(window).width()<800)
		{
			randomNumber1=30;
			randomNumber2=50;
		}
		if($(window).width()<572)
		{
			randomNumber1=50;
			randomNumber2=70;
			line_left=[
				15,
				37,
				62,
				85
			]
		}
		if($(window).width()<480)
		{
			randomNumber1=40;
			randomNumber2=60;
		}
	})
	if($(window).width()<1200)
	{
		randomNumber1=40;
		randomNumber2=60;
		line_left=[
			33,
			44,
			56,
			67
		]
	}
	if($(window).width()<800)
	{
		randomNumber1=30;
		randomNumber2=50;
	}
	if($(window).width()<572)
	{
		randomNumber1=50;
		randomNumber2=70;
		line_left=[
			15,
			37,
			62,
			85
		]
	}
	if($(window).width()<480)
	{
		randomNumber1=40;
		randomNumber2=60;
	}
	for (var i = 0; i < 20; i++) {
		shopCar_Name[i]='car '+(i+1)
	}
	var shopCar_speed = [
		0.6, //car 1
		0.61, //car 2
		0.615, //car 3
		0.63, //car 4
		0.635, //car 5
		0.65, //car 6
		0.7, //car 7
		0.715, //car 8
		0.725, //car 9
		0.75, //car 10
		0.76, //car 11
		0.775, //car 12
		0.79, //car 13
		0.8, //car 14
		0.82, //car 15
		0.84, //car 16
		0.88, //car 17
		0.92, //car 18
		0.95, //car 19
		1, //car 20
	];
	var shopCar_acceleration = [
		0.0001, //car 1
		0.000102, //car 2
		0.000103, //car 3
		0.000104, //car 4
		0.000105, //car 5
		0.000108, //car 6
		0.00011, //car 7
		0.00012, //car 8
		0.00015, //car 9
		0.00018, //car 10
		0.00024, //car 11
		0.00025, //car 12
		0.00026, //car 13
		0.0003, //car 14
		0.00035, //car 15
		0.00038, //car 16
		0.0004, //car 17
		0.00042, //car 18
		0.00046, //car 19
		0.0005, //car 20
	];
	var shopCar_maxSpeed = [
		1, //car 1
		1.2, //car 2
		1.25, //car 3
		1.30, //car 4
		1.37, //car 5
		1.42, //car 6
		1.45, //car 7
		1.48, //car 8
		1.5, //car 9
		1.6, //car 10
		1.65, //car 11
		1.8, //car 12
		1.9, //car 13
		1.95, //car 14
		2, //car 15
		2.1, //car 16
		2.3, //car 17
		2.6, //car 18
		2.7, //car 19
		3, //car 20
	];
	var shopCar_Price = [
		50, //car 1
		60, //car 2
		80, //car 3
		120, //car 4
		150, //car 5
		200, //car 6
		250, //car 7
		350, //car 8
		500, //car 9
		1000, //car 10
		2500, //car 11
		3500, //car 12
		4500, //car 13
		7000, //car 14
		12000, //car 15
		25000, //car 16
		70000, //car 17
		100000, //car 18
		250000, //car 19
		500000, //car 20
	];
	for (var i = 0; i < 20; i++) {
		shopCar_src[i]='./themes/default/images/cars/need/car'+(i+1)+'.png'
	}
	for (var i = 0; i < shopCar_Name.length; i++) {
		$("#shop").append(`
			<div class="card">
				<div class="card_title">
	    		${shopCar_Name[i]}
	    	</div>
	    	<div class="card_img" style="background-image: url(${shopCar_src[i]})"></div>
	    	<div class="card_txt">
	    		<p>سرعت:</p><span id="txt_speed">${parseInt(shopCar_speed[i]*100)}km</span><br>
	    		<p>شتاب در ساعت:</p><span id="txt_">${parseInt(shopCar_acceleration[i]*100*60*60)}km/h</span><br>
	    		<p>حداکثر سرعت:</p><span id="txt_">${parseInt(shopCar_maxSpeed[i]*100)}km</span>
	    	</div>
	    	<div class="card_btn">
	    		<button class="sell_car btn" id="sell_car${i+1}">
	        		<span class="price">${shopCar_Price[i]}$</span>
	        		<span class="shopping-cart"><i class="bi bi-cart-fill"></i></span>
	        		<span class="buy">خرید</span>
	        </button>
	        <div class="sellTrue" id="sellTrue${i+1}">خریده شد.</div>
	    	</div>
	    </div>
		`)
	}
	if (localStorage.getItem('cars')!=null) 
	{
		var his_car_sell = localStorage.getItem('cars').split("|")
		for (var i = 0; i < his_car_sell.length-1; i++) {
			$(`#${his_car_sell[i]}`).remove();
			$(`#sellTrue${parseInt(his_car_sell[i].substr(8,his_car_sell[i].length))}`).show();
		}
		add_my_car(his_car_sell,shopCar_speed,shopCar_acceleration,shopCar_maxSpeed)
	}
	
	show_mony();
	$(window).on("blur",function() {
		if (game_start==true)
		{
			delete keys[37];
			delete keys[38];
			delete keys[39];
			delete keys[40];
		}
	});
	// $(document).on("contextmenu",function () {
	// 	alert(maxSpeed_car)
	// 	return false;
	// })
	$(".sell_car").click(function () {
		let id = $(this).attr('id');
		if (parseInt($(`#${id} span[class=price]`).html())<=parseInt(localStorage.getItem('dolor')))
			{
				if(confirm("آیا از خرید خود اطمینان دارید؟"))
				{
					if (localStorage.getItem('cars')!=null)
						localStorage.setItem('cars',id+"|"+localStorage.getItem('cars'))
					else
						localStorage.setItem('cars',id+"|")
					localStorage.setItem('dolor',parseInt(localStorage.getItem('dolor'))-parseInt($(`#${id} span[class=price]`).html()));
					show_mony();
					$(`#${id}`).remove();
					$(`#sellTrue${parseInt(id.substr(8,id.length))}`).show();
					localStorage.setItem('myCar','select_car'+parseInt(id.substr(8,id.length)));
					location.reload();
				}
			}
		else
			alert("پول شما کافی نمیباشد!!!")
	})
	try 
	{
		if (localStorage.getItem('myCar')!='null') 
		{
			let id = localStorage.getItem('myCar');
			id = parseInt(id.substr(10,id.length))-1;
			acceleration = shopCar_acceleration[id];
			speed_car = shopCar_speed[id];
			speed = speed_car;
			maxSpeed_car = shopCar_maxSpeed[id];
			maxSpeed_car_save = maxSpeed_car;
			$("#my_car").css({
				'background-image':'url('+shopCar_src[id]+')'
			})
			$(`#select_car${id+1}`).css({
				'background':"green"
			});
			$(`#select_car${id+1}`).html("انتخاب شد!");
		}
	}
	catch(err)
	{

	}
	$(".select_car").click(function () {
		let id = $(this).attr('id');
		for (var i = 1; i <= shopCar_Name.length; i++) {
			$(`#select_car${i}`).css({
				'background':"#809fff"
			})
			$(`#select_car${i}`).html("انتخاب")
		}
		$(this).css({
			'background':"green"
		})
		$(this).html("انتخاب شد!")
		$("#my_car").css({
			'background-image':'url('+shopCar_src[parseInt(id.substr(10,id.length))-1]+')'
		})
		acceleration = shopCar_acceleration[parseInt(id.substr(10,id.length))-1];
		speed_car = shopCar_speed[parseInt(id.substr(10,id.length))-1];
		speed = speed_car;
		maxSpeed_car = shopCar_maxSpeed[parseInt(id.substr(10,id.length))-1];
		maxSpeed_car_save = maxSpeed_car;
		localStorage.setItem('myCar',id)
	})
	$("#btn_play").click(function() {
		$("#coin").removeAttr('data-bs-toggle');
		showGame();
		mycar_move(keys,game_start);
	});
	var keys = {};
	var key;
	//left 37 65
	//right 39 68
	//up 38 87
	//down 40 83
	$(document).keydown(function(e) {
		if (game_start==true) 
		{
			key = e.wich || e.keyCode;
			if (key==37 || key==65)
				if (keys[37]!=true && keys[65]!=true)
					keys[key] = true;
			if (key==39 || key==68)
				if (keys[39]!=true && keys[68]!=true)
					keys[key] = true;
			if (key==38 || key==87)
				if (keys[38]!=true && keys[87]!=true)
					keys[key] = true;
			if (key==40 || key==83)
				if (keys[40]!=true && keys[83]!=true)
					keys[key] = true;
		}
	})
	$(document).keypress(function(e) {
		key = e.wich || e.keyCode;
		if (key==32 && nitro>=100 && game_start==true)
		{
			nitro=0;
			if (speed*2<=3)
			{
				acceleration*=5;
				maxSpeed_car*=2;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car/=2;
				},1000)
			}
			else if (speed*1.8<=3)
			{
				acceleration*=5;
				maxSpeed_car*=1.8;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car/=1.8;
				},1000)
			}
			else if (speed*1.6<=3)
			{
				acceleration*=5;
				maxSpeed_car*=1.6;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car/=1.6;
				},1000)
			}
			else if (speed*1.4<=3)
			{
				acceleration*=5;
				maxSpeed_car*=1.4;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car/=1.4;
				},1000)
			}
			else if (speed*1.2<=3)
			{
				acceleration*=5;
				maxSpeed_car*=1.2;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car/=1.2;
				},1000)
			}
			else if (speed+0.5<=3)
			{
				accelerationx=5;
				maxSpeed_car+=0.5;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car-=0.5;
				},1000)
			}
			else if (speed+0.4<=3)
			{
				accelerationx=5;
				maxSpeed_car+=0.4;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car-=0.4;
				},1000)
			}
			else if (speed+0.3<=3)
			{
				accelerationx=5;
				maxSpeed_car+=0.3;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car-=0.3;
				},1000)
			}
			else if (speed+0.2<=3)
			{
				accelerationx=5;
				maxSpeed_car+=0.2;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car-=0.2;
				},1000)
			}
			else if (speed+0.1<=3)
			{
				accelerationx=5;
				maxSpeed_car+=0.1;
				setTimeout(function () {
					acceleration/=5;
					maxSpeed_car-=0.1;
				},1000)
			}
		}
	})
	$(document).keyup(function(e) {
		if (game_start==true) 
		{
			key = e.wich || e.keyCode;
			delete keys[key];
			if (key==37 || key==65) //left
			{
				$("#my_car").css({
						'transform':'rotate(0deg)'
				})
			}
			if (key==39 || key==68) //right
			{
				$("#my_car").css({
						'transform':'rotate(0deg)'
				})
			}
			if (key==38 || key==87) //up
			{
				if (key == 38 && keys[87]!=true)
					loss_speed();
				if (key == 87 && keys[38]!=true)
					loss_speed();
			}
			if (key==40 || key==83) //down
			{
				// speed = speed_car;
				var speed_add_after_loss = setInterval(function () {
					if (speed<=speed_car)
						speed+=0.1;
				},10)
				setTimeout(function () {
					clearInterval(speed_add_after_loss);
				},300)
			}
		}
	})
	$(".btn_tryAgain").click(function () {
		Try_again();
		mycar_move(keys)
		delete keys[37];
		delete keys[38];
		delete keys[39];
		delete keys[40];

		delete keys[65];
		delete keys[68];
		delete keys[87];
		delete keys[83];
	})
	$(".btn_goToStartMenu").click(function () {
		goToStartMenu();
		delete keys[37];
		delete keys[38];
		delete keys[39];
		delete keys[40];

		delete keys[65];
		delete keys[68];
		delete keys[87];
		delete keys[83];	
	})
	$(".btn_conver").click(function () {
		try{
			let convet_coin = localStorage.getItem('coin');
			if (convet_coin>=10) 
			{
				convet_coin = parseInt(convet_coin/10);
				localStorage.setItem('coin',localStorage.getItem('coin')-convet_coin*10);
				localStorage.setItem('dolor',parseInt(localStorage.getItem('dolor'))+convet_coin*100);
				show_mony();
				location.reload();
			}
		}
		catch{

		}
	})
	$("#coin").click(function () {
		try{
			let convet_coin = localStorage.getItem('coin');
				convet_coin = parseInt(convet_coin/10);
				show_mony();
				$("#coin_convert div").html(`
					${convet_coin*10}<i class="bi bi-coin"></i>
						>
					${convet_coin*100}<i class="bi bi-currency-dollar"></i>
				`)
		}
		catch{

		}
	})
})
function showGame() {
	// $("#mony").css({
	// 	"color":"white"
	// })
	$("#start_menu").slideUp();
	$("#game").fadeIn();
	game_start=true;
	car_move();
}
var sumspead=0;
var j = 0;
function mycar_move(keys) {
	if (game_start==true)
		add_car()
	mycar_move_interval = setInterval(function () {
		if (game_start==true) 
		{
			sumspead+=speed*100;
			j++;
			$("#show_speed span").html(parseInt(speed*100))
			$(".car").each(function (id,obi) {
				if (overlap($("#my_car"),$(this))) {
					gameOver();
				} 
				// if (parseInt($(".car").css("bottom"))<-20)
				// 	$(`#carID${id}`).remove();
			})
			$(".guard").each(function (id,obi) {
				if (overlap($("#my_car"),$(this)) || overlap($("#my_car"),$(this))) {
					gameOver();
				} 
			})
			$(".coin").each(function (id,obi) {
				if (overlap($("#my_car"),$(this)) || overlap($("#my_car"),$(this))) {
					$(".coin").remove();
					coin++;
					$("#coin div").html(parseInt($("#coin div").html())+1);
				} 
			})
			for(var k in keys)
			{
				if (k==37 || k==65) //left
				{
					$("#my_car").css({
							'left':'-='+(parseInt(speed*speed)+5),
							'transform':'rotate(-15deg)'
					})
				}
				if (k==39 || k==68) //right
				{
					$("#my_car").css({
							'left':'+='+(parseInt(speed*speed)+5),
							'transform':'rotate(15deg)'
					})
				}
				if (k==38 || k==87) //up
				{
					// $("#my_car").css({
					// 		'bottom':'+=5'
					// })
					if (nitro<100 && speed<=maxSpeed_car_save+0.01)
						nitro += (speed * speed * speed)/10;
					clearInterval(speed_loss_interval);
					if (speed<maxSpeed_car)
						speed+=0.0001+acceleration;	
					if (maxSpeed_car/1.2>speed)
						speed+=acceleration*2;
					if (maxSpeed_car/1.5>speed)
						speed+=acceleration*3;
					if (maxSpeed_car/2>speed)
						speed+=acceleration*5;
				}
				if (k==40 || k==83) //down
				{
					// $("#my_car").css({
					// 		'bottom':'-=5'
					// })
					if (speed>0.20)
						speed-=0.1;
					else if (speed>0.11)
						speed-=0.01;
				}
			}
			if (speed>maxSpeed_car+0.10)
				speed-=0.1;
			else if (speed>maxSpeed_car+0.01)
				speed-=0.01;
			var fill_nitro = 100 - nitro;
			$("#fill_nitro").css({
					'margin-top': fill_nitro+'px'
			})
			if (parseInt($("#fill_nitro").css('margin-top'))<=0)
			{
				$("#overflow_fill_nitro").css({
					'box-shadow' :'0px 0px 20px red'
				})
				$("#txt_help_nitro").show();
			}
			else
			{
				$("#overflow_fill_nitro").css({
					'box-shadow' :'none'
				})
				$("#txt_help_nitro").hide();
			}
			var arrow_speed = (speed*100)+(speed*5);
			$("#arrow").css({
				'transform': 'rotate('+arrow_speed+'deg)'
			})
			var color_show_speed_span = "white";
			if (speed>1.8)
				color_show_speed_span = "red"
			else if(speed>1.5)
				color_show_speed_span = "orange"
			else if(speed>1.2)
				color_show_speed_span = "yellow"
			else if(speed>0.8)
				color_show_speed_span = "white"
			else if(speed>0)
				color_show_speed_span = "green"
			$("#show_speed span").css({
				'color':color_show_speed_span
			})
		}
		if (speed>500 || sumspead/j>300)
		{
			cheat();
		}
		// localStorage.getItem('cars').split("")
	},10)
}
function overlap($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
function car_move() {
	car_move_interval = setInterval(function () {
		$(".car").css({
			"bottom": "-="+speed+"%"
		})
		var speed_road = 300;
		$("#road").css({
	  	'animation': 'roadPlay '+(1000-(Math.log(speed*1000))*100)+'s linear infinite'
		})
		$(".coin").css({
			"bottom": "-="+speed+"%"
		})
	},10)
}
function gameOver() {
	$("#coin").attr("data-bs-toggle", "modal");
	var end_score = score*parseInt(parseInt(sumspead)/j);
	$("#opaque").show();
	game_start = false;
	clearInterval(car_move_interval);
	clearInterval(mycar_move_interval);
	clearInterval(add_car_interval);
	clearInterval(coin_add_interval);
	$("#show_score").html(score);
	$("#show_Average").html(parseInt(parseInt(sumspead)/j/1));
	$("#show_sum").html(parseInt(end_score/100));
	// localStorage.setItem("dolor","");
	localStorage.setItem("dolor",0+parseInt(parseInt(localStorage.getItem("dolor"))+end_score/100));
	localStorage.setItem("coin",0+parseInt(localStorage.getItem("coin"))+coin);
	if (localStorage.getItem('coin')>=20)
		alert("برای تبدیل سکه به دلار روی سکه کلیک کنید!")
	show_mony();
}
function Try_again() {
	$("#opaque").hide();
	game_start = true;
	$("#my_car").css({
		'bottom': '1%',
		'left': '50%',
		'transform':'rotate(0deg)'
	})
	$(".car").remove();
	nitro=0;
	speed=speed_car;
	sumspead=0;
	score=0;
	j=0;
	coin=0;
	car_move();
}
function goToStartMenu() {
	game_start = false;
	$("#start_menu").slideDown();
	$("#game").fadeOut();
	$("#opaque").hide();
	$("#my_car").css({
		'bottom': '1%',
		'left': '50%',
		'transform':'rotate(0deg)'
	})
	$(".car").remove();
	nitro=0;
	speed=speed_car;
	sumspead=0;
	score=0;
	j=0;
	coin=0;
	// $("#mony").css({
	// 	"color":"black"
	// })
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function add_car() {
	coin_add_interval = setInterval(function () {
		$("#game").append(`<div class="coin" style="left:${line_left[rand(0,3)]+1.5}%"></div>`)
	},2500-speed**10)
	var i = 0;
	var add_car_speed = 3000;
	add_car_interval = setInterval(function () {
		if (game_start==true)
		{
			var x = rand(0,3);
			var y = rand(0,3);
			if (x!=y) {
				var g = x;
				var n = y;
			}
			else if (x==y)
			{
				if ((x==1) && (y==1))
				{
					var g = x+2;
					var n = y;
				}
				else if ((x==0) && (y==0))
				{
					var g = x+2;
					var n = y;
				}
				else if ((x==2) && (y==2))
				{
					var g = x-2;
					var n = y;
				}
				else if ((x==3) && (y==3))
				{
					var g = x-2;
					var n = y;
				}
			}
			var f;
			if ( (0 < g) && (0 < n))
				f = 0;
			else if ((g<3) && (n<3))
				f = 3;
			else if( ((g<1) || (g>1)) && ((n>1) || (n<1)))
				f = 1 ;
			else if( ((g<2) || (g>2)) && ((n>2) || (n<2)))
				f = 2 ;
			var r;
			if ((g!=0) && (n!=0) && (f!=0))
				r=0;
			if ((g!=1) && (n!=1) && (f!=1))
				r=1;
			if ((g!=2) && (n!=2) && (f!=2))
				r=2;
			if ((g!=3) && (n!=3) && (f!=3))
				r=3;
			// setTimeout(function () {
			// 	$("body").append(`<div class="car" id="carID${i}" style="left:${line_left[g]+'%'};width:${with_car+'px'};height:${(with_car*5)+'%'}"></div>`)
			// 	i++;
			// },rand(100,500));	
				if (add_car_speed>=2900) 
				{
						setTimeout(function () {
							with_car = rand(randomNumber1,randomNumber2);
							$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[g]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
							i++;
							score++;
						},add_car_speed-500)
						setTimeout(function () {
							with_car = rand(randomNumber1,randomNumber2);
							$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[n]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
							i++;
							score++;
						},add_car_speed)
					
				}
				if ((add_car_speed>1800) && (add_car_speed<2900)) {
					setTimeout(function () {
						with_car = rand(randomNumber1,randomNumber2);
						$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[g]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
							i++;
							score++;
						},add_car_speed)
						setTimeout(function () {
							with_car = rand(randomNumber1,randomNumber2);
							$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[n]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
							i++;
							score++;
						},add_car_speed-800)
						setTimeout(function () {
							with_car = rand(randomNumber1,randomNumber2);
							$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[f]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
							i++;
							score++;
						},add_car_speed+800)
				}
			 if ((add_car_speed<1900)) {
			 	setTimeout(function () {
			 		with_car = rand(randomNumber1,randomNumber2);
			 		$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[g]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
					i++;
					score++;
			 	},add_car_speed+1500)
			 	setTimeout(function () {
			 		with_car = rand(randomNumber1,randomNumber2);
			 		$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[n]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
					i++;
					score++;
			 	},add_car_speed+500)
			 	setTimeout(function () {
			 		with_car = rand(randomNumber1,randomNumber2);
			 		$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[f]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
					i++;
					score++;
			 	},add_car_speed)
			 	setTimeout(function () {
			 		with_car = rand(randomNumber1,randomNumber2);
			 		$("#game").append(`<div class="car" id="carID${i}" style="left:${line_left[r]+'%'};background-image:url(${shopCar_src[rand(0,shopCar_src.length-1)]})"></div>`)
					i++;
					score++;
			 	},add_car_speed-300)
			 }
				if (add_car_speed>500) 
					add_car_speed-=100;	
			$(".car").each(function(id,obi) {
				if (parseInt($(`#carID${id}`).css('bottom'))<-300) 
				{
					$(`#carID${id}`).remove();
				}
				if (parseInt($(`.coin`).css('bottom'))<0) 
				{
					$(".coin").remove();
				}
			})
				// setTimeout(function () {
				//  	$(`#carID${id}`).remove();
				//  },10000)
		}
	},add_car_speed-(speed*100))
}
function loss_speed() {
	speed_loss_interval = setInterval(function () {
		if (speed>speed_car+0.01 && game_start==true) 
		{
			speed-=0.0007-acceleration;	
			if (maxSpeed_car/1.2<speed)
				speed-=acceleration*2;
			if (maxSpeed_car/1.5<speed)
				speed-=acceleration*3;
			if (maxSpeed_car/2<speed)
				speed-=acceleration*5;
		}
	},10)
}
function show_mony() {
	if (localStorage.getItem("dolor")==null)
		localStorage.setItem("dolor",0)
	$("#dolor div").html(localStorage.getItem("dolor"))
	if (localStorage.getItem("coin")==null)
		localStorage.setItem("coin",0)
	$("#coin div").html(localStorage.getItem("coin"))
}
function cheat() {
	alert("do not cheat!!!")
	localStorage.setItem('dolor',0);
	localStorage.setItem('coin',0);
	localStorage.setItem('cars',null);
	localStorage.setItem('myCar',null);
}
function add_my_car(his_car_sell,shopCar_speed,shopCar_acceleration,shopCar_maxSpeed) {
	for (var i = 1; i <= shopCar_Name.length; i++) {
		for (var j = 0; j < his_car_sell.length-1; j++) {
			if (parseInt(his_car_sell[j].substr(8,his_car_sell[j].length))==i) 
			{
				$("#my_cars").append(`
				<div class="card">
					<div class="card_title">
		    		${shopCar_Name[i-1]}
		    	</div>
		    	<div class="card_img" style="background-image: url(${shopCar_src[i-1]})"></div>
		    	<div class="card_txt">
		    		<p>سرعت:</p><span id="txt_speed">${parseInt(shopCar_speed[i-1]*100)}km</span><br>
		    		<p>شتاب در ساعت:</p><span id="txt_">${parseInt(shopCar_acceleration[i-1]*100*60*60)}km/h</span><br>
		    		<p>حداکثر سرعت:</p><span id="txt_">${parseInt(shopCar_maxSpeed[i-1]*100)}km</span>
	    		  <div class="select_car" id="select_car${i}">انتخاب</div>
		    	</div>
		    </div>
				`)
			}
		}
	}
}