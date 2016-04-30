/**
 * Created by jinxin on 4/25/2016.
 */
var main=document.querySelector("#main");
var oLis=document.querySelectorAll("#content>li");
var step=3/4;
var desW=640;
var desH=960;
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
if(winW/winH<desW/desH){
    main.style.webkitTransform="scale("+winH/desH+")";
}else{
    main.style.webkitTransform="scale("+winW/desW+")";
}
var music=document.querySelector("#music");
var login=document.querySelector("#login");
var fingerprint=document.querySelector(".fingerprint");
fingerprint.addEventListener("touchstart",click,false);
function click(e) {
   var target=e.target;
    target.parentNode.previousElementSibling.innerHTML="验证中...";
    target.parentNode.nextElementSibling.id="line";
    window.setTimeout(function () {
        target.parentNode.nextElementSibling.style.opacity=0;
        target.parentNode.previousElementSibling.innerHTML="验证成功";
    },4000);
window.setTimeout(function () {
    main.removeChild(login);
},5000);
    slide();
}
window.setTimeout(function () {
    var ospan=document.querySelectorAll(".bubble>span");
    [].map.call(ospan,function () {
        arguments[0].className="p0";
    })
},8000);
function slide() {
    [].forEach.call(oLis,function () {
        var oLi=arguments[0];
        oLi.index=arguments[1];
        oLi.addEventListener("touchstart",start,false);
        oLi.addEventListener("touchmove",move,false);
        oLi.addEventListener("touchend",end,false);
        music.play();
    });
    function start(e) {
        this.startX=e.touches[0].pageX;
        this.startY=e.touches[0].pageY;
    }
    function move(e) {
        e.preventDefault();
        this.flag = true;
        var moveX = e.touches[0].pageX;
        var moveY = e.touches[0].pageY;
        var change = moveY - this.startY;
        if (Math.abs(moveX - this.startX) > Math.abs(change)) {
            this.flag = false;
            return;
        }
        var index = this.index;
        var lastIndex = oLis.length - 1;
        [].forEach.call(oLis, function () {
            if (index !== arguments[1]) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
        });
        if (change < 0) {
            this.preIndex = index == lastIndex ? 0 : index + 1;
            oLis[this.preIndex].style.webkitTransform = "translate(0," + (desH / 2 + change) + "px)";
        } else if (change > 0) {
            this.preIndex = index == 0 ? lastIndex : index - 1;
            oLis[this.preIndex].style.webkitTransform = "translate(0," + (-desH / 2 + change) + "px)";
        }
        oLis[this.preIndex].className = "zIndex";
        oLis[this.preIndex].style.display = "block";
        var t=this.firstElementChild;
        var oPs=t.getElementsByTagName("h6");
        [].forEach.call(oPs,function () {
            arguments[0].className="";
        });
        this.style.webkitTransform = "translate(0," + change + "px) scale(" + (1 - Math.abs(change / winH) * step) + ")";
        music.pause();
    }
    function end() {
        if(this.flag){
            oLis[this.preIndex].style.webkitTransform="translate(0,0)";
            oLis[this.preIndex].style.webkitTransition="0.3s";
            oLis[this.preIndex].addEventListener("webkitTransitionEnd",function () {
                this.style.webkitTransition="";
                var t=this.firstElementChild;
                var oPs=t.getElementsByTagName("h6");
                var _this=this;
                [].forEach.call(oPs,function () {
                    arguments[0].className="p"+_this.index;

                })
            },false);
            this.flag=false;
        }

    }
}


