
function init() {
	registerEvents();	
	
	//5개의 frame영역에 데이터를 로드한다.
	var target = document.getElementById("article_frame_3");
	
	var press_total_num = xhrProcess(target, 1);
	xhrProcess(target.nextElementSibling, 2);
	xhrProcess(target.nextElementSibling.nextElementSibling, 3);
	xhrProcess(target.previousElementSibling, press_total_num);
	xhrProcess(target.previousElementSibling.previousElementSibling, press_total_num-1);
	
	//하단부 Navigation Rolling영역 초기화
	xhrProcessForNavigationItem();
	
	
	//중앙 frame영역에 투명도를 없앤다.
	target.style.opacity = 1;
	
	
	//총 json파일에서 읽은 등록된 press갯수를 중앙프레임 하단에 표기한다.
	var number_frame = document.querySelector(".article_frame_pages > div");
	number_frame.querySelector("span:nth-of-type(1)").innerHTML = 1;
	number_frame.querySelector("span:nth-of-type(3)").innerHTML = press_total_num;
	
	refreshBannerFromServer();
}

function registerEvents() {
	var frames = document.querySelector(".article_fix_size .wrapper");

	var rollingBtn = [document.querySelector(".article_fix_size"), document.querySelector(".article_frame_pages > div")];
	
	rollingBtn.forEach(function(item){
		//에러. article_frame_pages항목 클릭시 이벤트가 연속되어 2번호출되는 문제점.
		item.addEventListener('click', function(e) { e.preventDefault(); scrollFrame(e.target.className, frames)}, false);	
	});	
}

function scrollFrame(tagClassName, frames) {
	
	//global variable이 아닌 객체로 변수값들을 관리한다.
	var interval = new Object();
	interval.direction = null;
	
	if ( tagClassName === "rolling_left_btn" || tagClassName === "rolling_left_btn_small" ) {
		//방향에 따라서 direction 상수값을 바꿔준다
		interval.direction = -1;
	} else if ( tagClassName === "rolling_right_btn" || tagClassName === "rolling_right_btn_small") {
		interval.direction = 1;
	} else {
		return;
	}
	
	//사용자 액션에 대해 즉각적인 반응을 주기 위해서, 페이지숫자변경, 하단의 작은롤링 등을 클릭즉시 반영한다. 
	changeExtraComponentBeforeRolling(interval, frames);
	
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

function getCurrentPageNum() {
	var number_frame = document.querySelector(".article_frame_pages > div");
	return ( parseInt(number_frame.querySelector("span:nth-of-type(1)").innerHTML) );
}

function getNextPageNum( direction, current_page ) {
	var current_page = current_page;
	var last_page = getLastPageNum();
	var next_page;
	
	if ( direction === 1 ) {
		if ( current_page === 1 )
			next_page = last_page;
		else
			next_page = current_page-1;
	} else {
		if ( current_page === last_page )
			next_page = 1;
		else
			next_page = current_page+1;
	}
	
	return next_page;
}

function getLastPageNum() {
	var number_frame = document.querySelector(".article_frame_pages > div");
	return ( parseInt(number_frame.querySelector("span:nth-of-type(3)").innerHTML) );
}

function changeExtraComponentBeforeRolling(interval, frames) {
	
	//프레임들의 투명도 조정
	frames.children[1].style.opacity = 1;
	frames.children[2].style.opacity = 1;
	frames.children[3].style.opacity = 1;


	//중앙 프레임 하단의 숫자변경 (옮기는 페이지로)
	var number_frame = document.querySelector(".article_frame_pages > div");
	var previousNum =  getCurrentPageNum();
	var lastNum = parseInt(number_frame.querySelector("span:nth-of-type(3)").innerHTML);
		
	if ( interval.direction === -1 ) {
		//만약 마지막페이지라면.
		if ( previousNum === lastNum )
			number_frame.querySelector("span:nth-of-type(1)").innerHTML = 1;
		else
			number_frame.querySelector("span:nth-of-type(1)").innerHTML = previousNum+1;			
	} else {
		//만약 1번페이지라면.
		if ( previousNum === 1 )
			number_frame.querySelector("span:nth-of-type(1)").innerHTML = lastNum;		
		else
			number_frame.querySelector("span:nth-of-type(1)").innerHTML = previousNum-1;			
	}
	
}

function changeExtraComponentAfterRolling( style_left, interval, frames ) {

	var targetFrame;
	var moveFrame;
	
	if ( interval.direction === -1 ) {

		targetFrame = frames.children[4]
		moveFrame = frames.children[0]
	} else {
		targetFrame = frames.children[0]
		moveFrame = frames.children[4]
	}

	//가장 끝쪽에 있는 li엘리먼트를 반대편 끝으로 이동시킨뒤
	frames.insertBefore(moveFrame , targetFrame);	
		
	//순식간에 ul태그 전체를 li엘리먼트가 이동한 반대편쪽으로 500만큼 이동시킨다. (그럼 view상에서는 변화없이 ul태그의 위치와 순서를 바꿀 수 있다)
	frames.style.left = style_left + (interval.direction * -1000)+"px";
	
	
	//옮겨진 엘리먼트의 데이터를 새로 업데이트 시킨다.
	var next_page = getNextPageNum(interval.direction, getNextPageNum(interval.direction, getCurrentPageNum()));
	
	//프레임들의 투명도 조정
	frames.children[1].style.opacity = 0.6;
	frames.children[2].style.opacity = 1;
	frames.children[3].style.opacity = 0.6;
	
	
	xhrProcess( moveFrame,  next_page );
}



//interval object와 ul의 li리스트 전달
function animationMove( interval, frames ) {
	var style_left = parseInt(getStyle(frames, 'left'));	
	frames.style.left = style_left + (interval.direction * 20) +"px";	
		++interval.count;
	
	// 10씩 50회(max회) 이동했을 경우 (한번 move할때마다 count가 1씩 증가한다.)	
	// 애니메이션이 종료된 이후의 처리를 여기서 하도록 한다.
	// animationMoveEnd( interval, frames);로 메서드를 나누어서 진행할 시, 적용이 되지 않는 문제점. call by value인건가..?
	if ( interval.max < interval.count ) {
		clearInterval(interval.id);
		interval.count = 0;		
		

		changeExtraComponentAfterRolling( style_left, interval, frames );

	}
}

//Cross Domain
function refreshBannerFromServer() {
	var head = document.getElementsByTagName("body")[0];
		
	var removeTarget = document.getElementById("xhr");
	if (removeTarget != null)
		head.removeChild(removeTarget);
	
	var target = document.createElement("script");
	target.id = "xhr";
	target.src = "http://localhost:3080/board/xhr/YoonsungRequest";
	
	head.appendChild(target);
}


//Cross Domain Callback function
function YoonsungRequest( ad_url_from_server ) {

	var arr_banner = document.querySelectorAll(".article_ad > img");

	for ( var index = 0 ; index < arr_banner.length; ++index ) {
		arr_banner[index].src = ad_url_from_server; 		 
	};
}



function getStyle(node, style) {
	return window.getComputedStyle(node, null).getPropertyValue(style);
}

//int_page_num is not a index, it is a number that is under the center frame page num.
function xhrProcess( frame, int_page_num ) {

	var templateTag = document.getElementById("hidden_contents");
	//var target = document.getElementById("article_frame_3");
	
	
	var templateString = templateTag.innerHTML;


	var url = "./pressData.json";
	var request = new XMLHttpRequest();

	var _pressName;
	var _logoURL;
	var _iframeURL;
	var press_total_num;
	
	request.open("GET", url, false);
	
	request.onreadystatechange=function() {
			if ( request.readyState === 4 && request.status === 200 ) {
			var result = request.responseText;
			var responseObject = JSON.parse(result);
			press_total_num = responseObject.length;
			
			
			responseObject = responseObject[int_page_num-1];
			_logoURL = responseObject.logoURL;
			_iframeURL = responseObject.iframeURL;
			_pressName = responseObject.press;	
		}
	}
	
	request.send(null);
	

	var compiled = _.template(templateString);	
	var result = compiled( {logoURL:_logoURL, iframeURL:_iframeURL, pressName:_pressName} );
	result = removeScriptTagFromString(result);		

	frame.innerHTML = result;
	
	return press_total_num;
}

function xhrProcessForNavigationItem() {

	var containerFrame = document.querySelector("#contents_press_navi ol");
	console.log(containerFrame);


	var templateString = "<li id='<%=pressIndex%>'><a href='#'><img src='<%=paperImgURL%>'/></a></li>";
	var url = "./pressData.json";
	var request = new XMLHttpRequest();
	
	request.open("GET", url, false);
	request.onreadystatechange=function() {
		if ( request.readyState === 4 && request.status === 200 ) {
			var result = request.responseText;
			var responseArray = JSON.parse(result);
			console.log(responseArray);
			var index = 0;
			var targetObject;
			
			var _paperImgURL;
			var press_total_num = responseArray.length;
			
			var compiled;
			var obj;
			
			while (index < press_total_num) {
				var tempTemplateString = templateString;
				
				targetObject = responseArray[index];
				//console.log(targetObject);
				
				
				_paperImgURL = targetObject.paperURL;
				console.log(_paperImgURL);
				
				compiled = _.template(tempTemplateString);		
				result = compiled( {pressIndex:index, paperImgURL:_paperImgURL} );
				
				containerFrame.insertAdjacentHTML('beforeend', result);
				
				++index;
			}
			
			

			
		}
	}
	
	request.send(null);

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