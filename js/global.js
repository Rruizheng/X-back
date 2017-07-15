function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value) {
	if(!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className = newClassName;
	}
}

function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if (headers.length==0) {
		return false;
	}
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	
	for(var i=0; i<links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1){
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
	
}

addLoadEvent(highlightPage);

function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//点击后消除延迟
	if(elem.movement) {
		clearTimeout(elem.movement);
	}
	//设置初始位置
	if(!elem.style.left) {
		elem.style.left = "0px";
	}
	if(!elem.style.top) {
		elem.style.top = "0px";
	}
	//取出位置坐标，用parseInt整数话
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	
	
	if(xpos == final_x && ypos == final_y) {
		return true;
	}
	if(xpos < final_x) {
		dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x) {
		dist = Math.ceil((-final_x+xpos)/10);
		xpos = xpos - dist;
	}
	if(ypos > final_y) {
		dist = Math.ceil((-final_y+xpos)/10);
		ypos = ypos - dist;
	}
	if(ypos < final_y) {
		dist = Math.ceil((final_y-xpos)/10);
		ypos = ypos + dist;
	}
	
	//设置位置，加上"px"
	elem.style.left = xpos +"px";
	elem.style.top = ypos +"px";
	
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	
	//创建窗口
	/*var frame = document.createElement("img");
	frame.setAttribute("src","img/4.png");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);*/
	
	
	var preview = document.createElement("img");
	preview.setAttribute("src","img/4.png");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0; i<links.length; i++) {
		links[i].onmouseover = function(){
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1) 			{
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("about.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("photo.html") != -1) {
				moveElement("preview",-600,0,5);
			}
			if(destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			
		}
	}
}


function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0; i<sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		}else{
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];//以#为分隔符
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
		
	}
}

addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;
	
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	
	placeholder.setAttribute("src",source);
	
	if(!document.getElementById("description")) return false;
	
	if(whichpic.getAttribute("title")){
		var title = whichpic.getAttribute("title");
	} else {
		title = "";
	}
	var description = document.getElementById("description");
	if(description.lastChild.nodeType==3){
		description.lastChild.nodeValue = title;
	}
	return false;
}

function preparePlaceholder() {
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById("imagegallery")) return false;
	
	var placeholder = document.createElement("img");
	placeholder.setAttribute("src","img/photo/1.png");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var txt = document.createTextNode("Choose an image");
	description.appendChild(txt);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}



function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	
	for(var i=0; i<links.length; i++) {
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

//间隔行背景效果
function stripeTable() {
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for(var i=0; i<tables.length; i++) {
		var odd = false;
		//取得所有的行
		var rows = tables[i].getElementsByTagName("tr");
		for(var j=0; j<rows.length; j++) {
			if(odd == true) {
				addClass(rows[j],"odd");
				odd = false;
			}else {
				odd = true;
			}
		}
	}
}

//鼠标滑过效果
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function() {
			addClass(this,"highlight");
		}
		rows[i].onmouseout = function() {
			this.className = this.oldClassName;
		}
	}
}

addLoadEvent(stripeTable);
addLoadEvent(highlightRows);

function focusLabels() {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i=0; i<labels.length; i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

addLoadEvent(focusLabels);


function resetFields(whichform) {
	if(Modernizr.input.placeholder) return false;
	
	for(var i=0; i<whichform.elements.length; i++){
		var element = whichform.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder ||element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text) {
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function(){
			if(this.value == "") {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

function prepareForms() {
	for (var i=0; i<document.forms.length; i++) {
		var thisform  = document.forms[i];
		resetFields(thisform);
	}
}

addLoadEvent(prepareForms);

function isFilled(field) {
	if(field.value.replace(' ','').length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != placeholder);
}

function isEmail(field){
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	for(var i=0; i<whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if(element.required == 'required') {
			if(!isFilled(element)){
			alert("Please fill in the "+element.name+" field.");
			return false;
			}
		}
		if(element.type == 'email') {
		if(!isEmail(element)) {
			alert("The" + element.name + "field must be a vaild email address.");
			return false;
		}
	
		}
	}
	return true;
}

function prepareForms(){
	for(var i=0; i<document.forms.length;i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName("article");
			if(submitFormWithAjax(this,article)) return false;
			return true;
		}
	} 
}

addLoadEvent(prepareForms);

function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function(){
			try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e) {}
			return false;
		}
		return new XMLHttpRequest();
}
 
 function displayAjaxLoading(element) {
 	while (element.hasChildNodes()) {
 		element.removeChild(element.laseChild);
 	}
 	var content = document.createElement("img");
 	content.setAttribute("src","/img/load.jpg");
 	content.setAttribute("alt","Loading");
 	element.appendChild(content);
 }

function submitFormWithAjax(whichform, thetarget) {
	var request = getHTTPObject();
	if(!request) {return false;}
	displayAjaxLoading(thetarget);

	var dataParts = [];
	var element;
	for(var i=0; i<whichform.elements.length; i++){
		element.whichform.elements[i];
		daraParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open('POST',whichform.getAttribute("action"),true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.onreadystatechange = function() {
	if(request.readyState == 4) {
		if(request.status == 200 || request.status == 0) {
			var matches = request.responseText.match(/<article>([/s/S]+)<\/article>/);
			if(matches.length >0) {
				thetarget.innerHTML = matches[1];
			} else {
				thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
			}
		}
	}else{
		thetarget.innerHTML = '<p>'+request.statusText +'<p>';
	}
};
request.send(data);
return true;
}



