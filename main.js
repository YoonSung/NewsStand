
function init() {
	registerEvents();	
	xhrProcess();
}

function registerEvents() {
	
	var frames = document.querySelector(".article_fix_size .wrapper");
	console.log(frames);
	
	document.querySelector(".article_fix_size").addEventListener('click', function(e) { scrollFrame(e.target.className, frames)}, false);
}


function scrollFrame(tagClassName, frames) {

	//global variable이 아닌 객체로 변수값들을 관리한다.
	var interval = new Object();
	interval.direction = null;
	
	if ( tagClassName === "rolling_left_btn" ) {
		//방향에 따라서 direction 상수값을 바꿔준다
		interval.direction = -1;
	} else if ( tagClassName === "rolling_right_btn" ) {
		interval.direction = 1;
	} else {
		return;
	}
	
	interval.id = null;
	interval.count = 0;
	interval.max = 50;
	interval.boundary = Math.abs(parseInt(getStyle(frames, 'left'))) + 1000;
	interval.id = setInterval(
		function() {
			//전역변수를 쓸 필요 없이 함수로 전달할 수 있는 방법!!!! 최고!!!
			( animationMove ) ( interval, frames );	
	}, 2);

}

//interval object와 ul의 li리스트 전달
function animationMove( interval, frames ) {
	var style_left = parseInt(getStyle(frames, 'left'));	
	console.log( interval.direction * style_left );	//for test
	frames.style.left = style_left + (interval.direction * 20) +"px";	
		++interval.count;
	
	// 10씩 50회(max회) 이동했을 경우 (한번 move할때마다 count가 1씩 증가한다.)	
	if ( interval.max < interval.count ) {
		clearInterval(interval.id);
		interval.count = 0;		
		
		if ( interval.direction === -1 )
			//가장 끝쪽에 있는 li엘리먼트를 반대편 끝으로 이동시킨뒤
			frames.insertBefore(frames.children[0] , frames.children[5]);
		else
			frames.insertBefore(frames.children[3] , frames.children[0]);
		
			
		//순식간에 ul태그 전체를 li엘리먼트가 이동한 반대편쪽으로 500만큼 이동시킨다. (그럼 view상에서는 변화없이 ul태그의 위치와 순서를 바꿀 수 있다)
		frames.style.left = style_left + (interval.direction * -1000)+"px";

	}
}


//Cross Domain
function loadAdUrlFromXHR() {
	var head = document.getElementsByTagName("body")[0];
	
	var removeTarget = document.getElementById("xhr");
	if (removeTarget != null)
		head.removeChild(removeTarget);
	
	var target = document.createElement("script");
	target.id = "xhr";
	target.src = "http://localhost:3080/board/xhr/YoonsungRequest";
	
	head.appendChild(target);
}

function YoonsungRequest( ad_url_from_server ) {
	var target = document.querySelector(".article_ad > img");
	
		console.log(getStyle(target, "src"));
	console.log(target);	
	target.src = ad_url_from_server;
	console.log(target);
}



function getStyle(node, style) {
	return window.getComputedStyle(node, null).getPropertyValue(style);
}

function xhrProcess() {

	//test
	loadAdUrlFromXHR();
	//test end

	var test = document.getElementById("hidden_contents");
	var target = document.getElementById("article_frame_3");
	
	
	var templateString = test.innerHTML;
	
	console.log("test");
	console.log(templateString);

	var _logoURL = "http://static.naver.net/newsstand/up/2013/0813/nsd11390456.gif";
	var _iframeURL = "http://newsstand.naver.com/include/page/056.html";
	var _pressName = "테스트야";
	
	
	var compiled = _.template(templateString);	
	var result = compiled( {logoURL:_logoURL, iframeURL:_iframeURL, pressName:_pressName} );
	result = removeScriptTagFromString(result);		

	target.innerHTML = result;
}

function removeScriptTagFromString( value ) {
	
	while ( value.indexOf("<script") != -1 && value.indexOf("</script")) {
		var startIndex = value.indexOf("<script");
		var endIndex;
		
		var index = startIndex;
		while (value.charAt(index) != ">") {
			++index;
		}
		++index;
		
		endIndex = index;

		index = 0;		
		var removeString="";
		
		while (index != endIndex) {
			var temp = value.charAt(index);
			removeString = removeString.concat(temp);
			++index;
		}
		
		return value.replace(removeString, "");
	}
}


init();