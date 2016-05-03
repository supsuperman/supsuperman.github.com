window.onload=function(){
	var oPrev = document.querySelector('.prev');
	var oNext = document.querySelector('.next');
	var aLi = document.querySelectorAll('ul li');
	var arr = [];
	for(var i=0;i<aLi.length;i++){
		arr[i] = aLi[i].className;
	}
	var bOk = false;
	oPrev.onclick=function(){
		if(bOk)return;
		bOk = true;
		arr.push(arr.shift());
		for(var i=0;i<arr.length;i++){
			aLi[i].className=arr[i];
		}
	};
	oNext.onclick=function(){
		if(bOk)return;
		bOk = true;
		arr.unshift(arr.pop());
		for(var i=0;i<arr.length;i++){
			aLi[i].className=arr[i];
		}
	};
	for(var i=0;i<aLi.length;i++){
		aLi[i].addEventListener('transitionend',function(){
			bOk = false;
		},false);
	}
};

