
function init() {
	registerEvents();
	
	var test = document.getElementById("hidden_contents");
	var target = document.getElementById("article_frame_3");
	target.innerHTML = test.innerHTML;
	console.log(test);
	console.log(target);
}

function registerEvents() {
	var rollLeft = document.querySelector(".rolling_left_btn");
	var rollRight = document.querySelector(".rolling_right_btn");
	
	rollLeft.addEventListener('click', scrollFrame, false);
	rollRight.addEventListener('click', scrollFrame, false);	
}

function getStyle(node, style) {
	return window.getComputedStyle(node, null).getPropertyValue(style);
}

function scrollFrame() {
	
}


init();