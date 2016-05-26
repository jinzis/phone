
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
var audioDemo = document.querySelector("#audioDemo"), musicBtn = document.querySelector("#musicBtn");
window.setTimeout(function () {
    audioDemo.play();
    audioDemo.addEventListener("canplay", function () {
        musicBtn.style.display = "block";
        musicBtn.className = "musicMove";
    }, false);
    musicBtn.addEventListener("touchend", function () {
        if (audioDemo.paused) {
            audioDemo.play();
            musicBtn.className = "musicMove";
            return;
        }
        audioDemo.pause();
        musicBtn.className = "";
    }, false);
}, 1000);
    slide();
function slide() {
    [].forEach.call(oLis,function () {
        var oLi=arguments[0];
        oLi.index=arguments[1];
        oLi.addEventListener("touchstart",start,false);
        oLi.addEventListener("touchmove",move,false);
        oLi.addEventListener("touchend",end,false);
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
$(function () {

    var colors = Highcharts.getOptions().colors,
        categories = ['HTML+CSS', 'JavaScript', 'Ajax', 'jQuery','Bootstrap', 'Node.js','AngularJs','React'],
        name = '职业技能',
        color=colors[1],
        data = [{
            y: 90,
            color: colors[0],
            drilldown: {
                name: 'HTML+CSS',
            }
        }, {
            y: 75,
            color: colors[9],
            fontSize:'30px',
            drilldown: {
                name: 'JavaScript',
            }
        }, {
            y: 70,
            color: colors[2],
            drilldown: {
                name: 'Ajax',

            }
        }, {
            y: 70,
            color: colors[3],
            drilldown: {
                name: 'jQuery',

            }
        },
            {
                y: 50,
                color: colors[4],
                drilldown: {
                    name: 'Bootstrap',

                }
            },

            {
                y: 30,
                color: colors[5],
                drilldown: {
                    name: 'Node.js',

                }
            },
            {
                y: 20,
                color: colors[6],
                drilldown: {
                    name: 'AngularJs',

                }
            },
            {
                y: 20,
                color: colors[8],
                drilldown: {
                    name: 'React',

                }
            }
        ];

    function setChart(name, categories, data, color) {
        chart.xAxis[0].setCategories(categories, false);
        chart.series[0].remove(false);
        chart.addSeries({
            name: name,
            data: data,
            color: color || 'white',


        }, false);
        chart.redraw();
    }
    var chart = $('#container').highcharts({
            chart: {
                type: 'column',
                fontSize : '90px',
                backgroundColor: 'rgba(0,0,0,0)'

            },
            title: {
                text: '我的职业技能',
                style:{'fontSize' : '25px'}
            },
            xAxis: {
                categories: categories,
                style : {
                    'fontSize' : '20px'
                }
            },
            yAxis: {
                title: {
                    text: '熟练度',
                    style:{'fontSize' : '18px','color':'black'}
                }
            },
            legend : {
                itemStyle : {
                    'fontSize' : '20px'
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: colors[1],
                        style: {
                            fontWeight: 'bold',
                            fontSize : '18px'
                        },
                        formatter: function() {
                            return this.y +'%';
                        }
                    }
                }
            },

            // tooltip: {
            //     formatter: function() {
            //         var point = this.point,
            //             s = this.x +':<b>'+ this.y +'%';
            //         if (point.drilldown) {
            //             s += 'Click to view '+ point.category +' versions';
            //         } else {
            //             s += 'Click to return to browser brands';
            //         }
            //         return s;
            //     }
            // },
            series: [{
                name: name,
                data: data,
                color: 'white',
            }],
            exporting: {
                enabled: false,
            }
        })
        .highcharts(); // return chart
});




