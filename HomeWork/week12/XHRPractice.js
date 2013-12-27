//AJAX = Asynchronous Javascript And XML
function init() {
	var target = document.querySelector(".rolling_left_btn");
	console.log(target);
	target.addEventListener('click', go, false);
}

function go(e) {
	var target = document.querySelector(".press_logo").nextElementSibling;	
	console.log(target);
	
	var url = "newData.json";
	var request = new XMLHttpRequest();

	//sync start
	//request.open("GET", url, false);
	//sync end
	

//html은 싱글쓰레드이다. 그렇기 때문에 데이터통신에 오랜시간이 걸릴경우 문제가 발생할 수 있다. 이것은 ajax의 의미를 퇴색시키게 된다. 그렇기 때문에


	//async start
	request.open("GET", url, true); 
		
	request.onreadystatechange=function()
	{
	  if (request.readyState==4 && request.status==200)
	  {
		result = request.responseText;
	
		var resultObject = JSON.parse(result);
	
		alert("1");
		target.innerHTML = resultObject.title;
	    alert("3");		
	  }
	}
	request.send(null);		
		
	//async end
		


	alert("2");
	target.style.backgroundColor = "#00ff00";
//	alert(resultObject.newsCount);
}

init();



//CrossDomain
//JSONP (PADDING, 꽉찼다)
//<script>안에 있는 있는 src에 대한 리턴값을 모두 스크립트로 변환해서 실행해버린다.
//corse
