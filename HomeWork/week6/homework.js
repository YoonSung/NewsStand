// 131068 Jung Yoon Sung
//HomeWork1
/*
1번문제
다음과 같은 결과가 나오는 showNext 함수를 만드세요.
showNext("next");    //next
showNext("$next");  //next  
showNext("$apple"); //apple 
showNext(true); //true
showNext(""); //false
showNext(null); //false
showNext([3,5,6,]) //false
showNext() //false

이외 다른 문자열을 입력해도 위와 같은 패턴의 결과가 나오도록 구현하세요.
*/

function showNext(value) {

  var type = typeFinder(value);
  
  if (type === 'String') {
      return showString(value);
      
  } else if (type === 'Array') {
      return false;
      
  } else if (type === 'Window') {
      return false;
      
  } else if (type === 'Boolean') {
      return false;
      
  } else {
      return false;
  }
}


function showString(value) {
	if(value==='')
		return false;
	var result = value;

	while (result.indexOf('$') != -1 ) {
		result = result.replace('$','');
	}
	return result;
}


function typeFinder(value) {
  var typeString = toString.call(value);
  return typeString.substring(8, typeString.length-1);
}

alert(showNext("next"));    //next
alert(showNext("$next"));  //next  
alert(showNext("$apple")); //apple 
alert(showNext(true)); //true
alert(showNext("")); //false
alert(showNext(null)); //false
alert(showNext([3,5,6,])); //false
alert(showNext()); //false


//HomeWork2

/*
2번문제.
아래와 같이 서비스이름이 배열로 보관되어 있습니다.
var servicesList = ["영화","쇼핑" , "검색" ,"책","자동차","쉼","뿜&톡"]; 

아래와 같이 동작하는 show 함수를 만드세요. (정확히 아래와 같이 동작되어야 합니다)

var newfunction = show(servicesList);
newfunction('DAUM');   

//DAUM을 입력하면 아래 결과가 나옵니다.
DAUM 영화
DAUM 쇼핑
DAUM 검색
DAUM 책
DAUM 자동차
....

newfunction('NAVER');   
//NAVER를 입력하면 아래 결과가 나옵니다.
NAVER 영화
NAVER 쇼핑
NAVER 검색
NAVER 책
NAVER 자동차
....

물론 GOOGLE, FACEBOOK을 입력할 수도 있습니다. 
그 때 마다 위와 같은 패턴의 결과가 나와야 합니다.
*/

var servicesList =  ["영화","쇼핑" , "검색" ,"책","자동차","쉼","뿜&톡"];
var newfunction = show(servicesList);
newfunction('DAUM');

function show(value) {
return (function print(title)
		{
		value.forEach(function(item){alert(title+" "+item);})
		})
}