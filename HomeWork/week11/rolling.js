
function init() {
	var leftMoveBtn = document.querySelector("#left");
	var list = document.getElementById("list");
	leftMoveBtn.parentNode.addEventListener('click', function(e) { scrollLeft(e.target.id, list); } ,false);
}

function getStyle( element, style ) {
	return window.getComputedStyle(element).getPropertyValue(style);
}

function scrollLeft(tagId, liList) {
	
	//global variable이 아닌 객체로 변수값들을 관리한다.
	var interval = new Object();
	
	interval.id = null;
	interval.direction = null;
	interval.count = 0;
	interval.max = 50;
	interval.isDoing = false;
	
	if ( tagId === "right") {
		//방향에 따라서 direction 상수값을 바꿔준다
		interval.direction = 1;
	} else {
		interval.direction = -1;
	}
	
	interval.id = setInterval(
		function() {
			//전역변수를 쓸 필요 없이 함수로 전달할 수 있는 방법!!!! 최고!!!
			( moveLeft ) (interval, liList);
		}, 8);
}

//interval object와 ul의 li리스트 전달
function moveLeft(interval, element) {

	interval.isDoing = true;
	var style_left = parseInt(getStyle(element, 'left'));

	console.log ( interval.direction * style_left );

	// 10씩 50회(max회) 이동했을 경우 (한번 move할때마다 count가 1씩 증가한다.)
	if ( interval.max <= interval.count ) {
		clearInterval(interval.id);
		interval.count = 0; // object가 가지고 있는 countvalue값 초기화
	}	

	// ul태그가 오른쪽, 혹은 왼쪽으로 li한칸만큼 이동했을 경우 ( ==500일 경우이다 )
	if ( interval.direction * style_left >= 940) {
	
		//방향을 확인한 후
		if ( interval.direction === -1 )
			//가장 끝쪽에 있는 li엘리먼트를 반대편 끝으로 이동시킨뒤
			element.insertBefore(element.children[0] , element.children[5]);
		else
			element.insertBefore(element.children[3] , element.children[0]);
		
		//순식간에 ul태그 전체를 li엘리먼트가 이동한 반대편쪽으로 500만큼 이동시킨다. (그럼 view상에서는 변화없이 ul태그의 위치와 순서를 바꿀 수 있다)
		element.style.left = style_left + (interval.direction * -940)+"px";
		
		//애니메이션 종료 및 함수 탈출
		clearInterval(interval.id);
		return;
	}	
	element.style.left = style_left + (interval.direction * 18) +"px";
	console.log(element.style.left);
	interval.count++;
}

init();