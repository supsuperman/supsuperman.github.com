//JavaScript Document
"use strict";function moveBox(e) {
	var t=r,o=e-t,s=Math.floor(50),i=0;clearInterval(timer),timer=setInterval(function(){i++;var e=1-i/s;if(r=t+o*(1-Math.pow(e,3)),workBox.style.WebkitTransform=workBox.style.MozTransform=workBox.style.transform="translateX(-12px)  translateZ(-"+winW/2+"px) rotateY("+(r+1)+"deg)",r%360==0||r%360==180||r%360==270){var n=document.getElementById("h5_works");n.style.display="none"
}

if(r%360==90) {
	var n=document.getElementById("h5_works");n.style.display="block",swing()
}

i==s&&clearInterval(timer)
},30)
}

function now(e) {
return e>0?e%aLi.length: (e%aLi.length+aLi.length)%aLi.length
}

function tab() {
function e(){aLi[now(iNow)].removeEventListener("transitionend",e,!1),bOk=!1,location.hash=iNow
}

for(var t=0;t<aLi.length;t++)aLi[t].className="";aLi[now(iNow-2)].className="l2",aLi[now(iNow-1)].className="l1",aLi[now(iNow)].className="cur",aLi[now(iNow+1)].className="r1",aLi[now(iNow+2)].className="r2",aLi[now(iNow)].addEventListener("transitionend",e,!1)
}

function wave(e,t) {
var r=e.children[0],o=r.children[0],s=t.pageX-getPos(e).left,i=t.pageY-getPos(e).top;o.style.left=s+"px",o.style.top=i+"px",addClass(r,"is-active"),r.addEventListener("animationend",function(e){removeClass(r,"is-active")
},!1),r.addEventListener("webkitAnimationEnd",function(e) {
removeClass(r,"is-active")
},!1),r.addEventListener("MSAnimationEnd",function(e) {
removeClass(r,"is-active")
},!1)
}

function swing() {
for(var e=document.getElementById("h5_works"),t=e.getElementsByTagName("li"),o=0,s=0,i=null,s=0;s<t.length;s++){var n=t[s].children;n[0].style.WebkitTransform=n[0].style.MozTransform=n[0].style.transform="rotateX(-180deg)"
}

for(var s=0;s<t.length;s++)!function(e) {
t[s].children;t[e].r=-180,i=setTimeout(function(){!function(e){clearInterval(t[e].timer);var s=t[e].children;t[e].timer=setInterval(function(){o+=(0-t[e].r)/1.5,o*=.7,t[e].r+=o,t[e].r<-60?t[e].style.opacity=0: t[e].style.opacity=1,s[0].style.WebkitTransform=s[0].style.MozTransform=s[0].style.transform="rotateX("+t[e].r+"deg)",0==Math.floor(o)&&0==Math.floor(r)&&clearInterval(t[e].timer)
},150)
}(e)
},300)
}(s)
}

document.onmousedown=function() {
return!1
};



