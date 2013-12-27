headArticleNum = 4;

function appendHtml(arr_data) {
	var targetNode = document.getElementById("article_frame_contents").querySelector(".top");	
	targetNode.children[1].innerHTML = arr_data[0];
	console.log(targetNode.children[1]);
	
	
	targetNode = targetNode.nextElementSibling;
	for ( var i = 1 ; i < headArticleNum ; i++ ) {
		targetNode.innerHTML = arr_data[i];
		console.log("i : " + i);
		console.log(targetNode);
		targetNode = targetNode.nextElementSibling;
	}
}

function choiceHeadLine() {
	var articleData = [
				"\"잊을만 하면 또\"…연예인 불법 도박, 왜?",
				"KBS 단독 대담…\'푸틴 극동의 문을 열다\'",
				"與 충청권 \"인구비 따라 국회의석 조정해야\"",
				"상생 선언 롯데마트, \'납품업체 부려먹기\' 횡포",
				"\'슈퍼 태풍\' 왜 발생? 한반도로 올 가능성은?",
				"경북 영덕서 3명 탄 훈련용 경비행기 실종",
				"與 충청권 \"인구비 따라 국회의석 조정해야\"",
				"자연 속 유아 교육 \'숲 유치원\'…효과는?",
				"\"현대그룹 수십억 비자금 조성 의혹 포착\"",
				"태백산 천재단 정상 부근 능선에서 산불",
				"\"야권 단일 특검법 추진\"…\"국면 전환용 야합\"",
				"복지부장관 자질 검증…\'기초연금 소신\' 공방",
				"은하수에 쌍둥이 블랙홀 있다!",
				"日 원전 방사능 공포, 이것만은 알고 먹자!",
				"개미들은 왜 잃는 투자만 할까? ",
				"외국인이 판소리 부른다면 이렇게…",
				"차재영, 자유투 보다 더 쉬운 3점슛!",
				"유명시인 교사, 여제자 성추행 파문",
				"\'대마초 흡연 혐의\' 개그우먼 송인화 기소",
				"정청래 의원 \"박근혜씨\" 호칭…\"막말\" 비난",
				"교사 93% \"인터넷 게임, 중독으로 봐야\"",
				"\"모유 먹이면 상품권 지급\"…英 장려사업"
				];		
				
	var headArticleData = generateRandomList(articleData, headArticleNum);
	
	for ( var i = 0 ; i < headArticleNum ; i++ ) {
		console.log(headArticleData[i]);		
	}

	
	appendHtml(headArticleData);
}

var generateRandomList = function(array, length) {
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    
    var headArticleData = new Array(4);
	
	for ( var i = 0 ; i < length ; i++ ) {
		headArticleData[i] = array[i];		
	}
    
    return headArticleData;
}

window.addEventListener('click', function(e) 
								{
									var node = window.getComputedStyle(e.target, null);
									var style = node.getPropertyValue('display');
																		
									if (style != 'none') {
										e.target.style.display = 'none'
									} else {
										e.target.style.display = 'inline-block'
									}
									//debugger;
								}
, false);
choiceHeadLine();