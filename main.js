
function init() {
	registerEvents();	
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


function registerEvents() {
	var rollLeft = document.querySelector(".rolling_left_btn");
	var rollRight = document.querySelector(".rolling_right_btn");
	
	rollLeft.addEventListener('click', xhrProcess, false);
	rollRight.addEventListener('click', scrollFrame, false);	
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
	result = removeScriptState(result);	

	
	
	console.log(result);
	

	target.innerHTML = result;
}

function removeScriptState( value ) {
	
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


function scrollFrame() {
	
}


init();