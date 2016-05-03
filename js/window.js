// JavaScript Document
window.onload = function(){
	var oCssUl = document.getElementById('css_ul');	
	var oCssLi = oCssUl.children;
	oCssUl.children[0].onclick = function(){
		window.open('tmall/index.html','_blank');	
	};
	oCssUl.children[1].onclick = function(){
		window.open('taobao/index.html','_blank');	
	};
	oCssUl.children[2].onclick = function(){
		window.open('mt/mt.html','_blank');	
	};
	oCssUl.children[3].onclick = function(){
		window.open('oppo/index.html','_blank');	
	};
	oCssUl.children[4].onclick = function(){
		window.open('aoaola/index.html','_blank');	
	};
	oCssUl.children[5].onclick = function(){
		window.open('veil/index.html','_blank');	
	};
};
