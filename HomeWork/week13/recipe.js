function init() {
	registerEvent();
	// i = 0;
}

function registerEvent() {
	var target = document.getElementById('babo');
	console.log(target);
	target.addEventListener('click', crong, false);
}

function crong() {	
	var head = document.getElementsByTagName("head")[0];
	
	var removeTarget = document.getElementById("mungchoong");
	if (removeTarget != null)
		head.removeChild(removeTarget);
	
	var target = document.createElement("script");
	target.id = "mungchoong";
	target.src = "http://ui.nhnnext.org/phpcode/recipes.php?callback=heeje";
	
	head.appendChild(target);
}

function heeje( value ) {
	var body = document.getElementsByTagName("body")[0];
	
	var tag_div = document.createElement("div");
	var ul = document.createElement("ul");
	
	body.appendChild(tag_div);
	tag_div.appendChild(ul);
	
	value.forEach(function(v, i, o){
		var li = document.createElement("li");
		ul.appendChild(li);
		
		var compiled = _.template("<h3><%=recipeName%></h3><p><%=contents%></p>");
		var result = compiled( {recipeName:v.recipeName,contents:v.contents});
		
		li.innerHTML = result;
	});
	
	
}

window.addEventListener('load', init, false);