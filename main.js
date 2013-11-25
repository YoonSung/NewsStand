
function init() {
	registerEvents();
}

function registerEvents() {
	var rollLeft = document.querySelector(".rolling_left_btn");
	var rollRight = document.querySelector(".rolling_right_btn");
	
	rollLeft.addEventListener('click', scroll, false);
	rollRight.addEventListener('click', scroll, false);	
}

function sty(node, style) {
	return window.getComputedStyle(node, null).getPropertyValue(style);
}

int_max = 1000;

function scroll(e) {
	e.preventDefault();
	var int_direction = -1;
	
	
	if (e.currentTarget.className === 'rolling_left_btn')
		int_direction = 1;	
	
	if ( sty(document.getElementById("article_frame_center"), 'left') === '0px' )
		int_max = 1000;
	

	var rollFrames = document.getElementsByClassName("article_frame");
	
	var id = setInterval(function scrolling(){
	
		for ( var i = 0 ; i < rollFrames.length ; i++) {
			var str = sty(rollFrames[i], 'left');
			var strLen = str.length;
			var num = parseInt(str.substr(0,strLen-2)) + (38 * int_direction);			

			if ( num > 1000 || num < -1000 ) {
				int_max = 0;
			}
				

			if ( num <= -1026 ) {
			
				var entireNode = document.querySelector("#contents_article_frame .wrapper");
				console.log(entireNode);
				
				var target_node = entireNode.children[0];
				console.log(target_node);
				
				if ( rollFrames[i] === target_node ) {
					entireNode.insertBefore(target_node , entireNode);
					console.log("targetNode in");
					console.log(target_node); //0,2,4
				}
			}
				
			//console.log ( sty( rollFrames[0] , 'left') );
			//console.log ( num*int_direction > int_max );	
			if ( num * int_direction > int_max ) {
				console.log("in console");
				clearInterval(id);
				break;
			}
			
		rollFrames[i].style.left = num+"px";
		}
		
	}, 8);

}


init();