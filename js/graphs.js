//Defaults

var updateRate = 5000;
var points = 100;

var colors = ['#0073b6', '#e9ad07', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];

Highcharts.setOptions({
    colors: colors,
    chart: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderWidth: 0,
        plotBackgroundColor: 'rgba(255, 255, 255, 0.5)',
        plotShadow: false,
        plotBorderWidth: 1
    },
    plotOptions: {
        series: {
        	animation: false,
            marker: {
                enabled: false,
                states: {
                	hover: {
                		enabled: false
                	}
                }
            }
        }
    },
    legend: {
        enabled:false
    },
    credits: {
        enabled:false
    },
    tooltip: {
        valueSuffix: '°C',
        enabled:false
    }
});






//Tree History Graphs
$(document).ready(function () {
	$('#history1').highcharts({
        chart: {
            type: 'spline',
            marginBottom: 25
        },
        title: {
            text: 'Above Canopy'
        },
        xAxis: {
          	type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:true
            }
        },
        yAxis: [{
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },{
            title: {
                text: 'Humidity (%)',
                style: {
                	color: colors[1]
                }
            },
            opposite: true
        }]
    });

	$('#history2').highcharts({
        chart: {
            type: 'spline',
            marginBottom: 25
        },
        title: {
            text: 'Canopy'
        },
        xAxis: {
          	type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:true
            }
        },
        yAxis: [{
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },{
            title: {
                text: 'Humidity (%)',
                style: {
                	color: colors[1]
                }
            },
            opposite: true
        }]
    });

	$('#history3').highcharts({
        chart: {
            type: 'spline',
            marginBottom: 25
        },
        title: {
            text: 'Below Canopy'
        },
        xAxis: {
          	type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:true
            }
        },
        yAxis: [{
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },{
            title: {
                text: 'Humidity (%)',
                style: {
                	color: colors[1]
                }
            },
            opposite: true
        }]
    });
    
    $('#history4').highcharts({
        chart: {
            type: 'spline',
            marginBottom: 25
        },
        title: {
            text: 'Soil'
        },
        xAxis: {
          	type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:true
            }
        },
        yAxis: [{
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },{
            title: {
                text: 'Humidity (%)',
                style: {
                	color: colors[1]
                }
            },
            opposite: true
        }]
    });

	$('#vertGraph').highcharts({
            chart: {
                type: 'spline',
                inverted: true,
		        backgroundColor: 'rgba(255,255,255,0.8)',
		        borderWidth: 0,
		        plotBackgroundColor: 'rgba(255, 255, 255, 0.8)',
		        plotShadow: false,
		        plotBorderWidth: 1
            },
            title: {
                text: null
            },
            xAxis: {
	            labels: {
	            	enabled:false
	            }
            },
            yAxis: [{
                title: {
                    text: 'Temperature'
                }
            },{
                title: {
                    text: 'Humidity',
	                style: {
	                	color: colors[1]
	                }
                },
                opposite:true
            }],
            series: [{
                name: 'Temperature',
                data: [12, 4, 3, 5, 4, 10, 12],
            }, {
                name: 'Humidity',
                data: [1, 3, 4, 12, 3, 5, 4],
                yAxis:1
            }]
        });

	
        /*Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });*/
       

     //setTimeout(update,5000);
         
     function addPoints() {
     	for (var i=1; i<=5;i++)  {
     		series = $('#live'+i).highcharts().series;
     		
     		var x = (new Date()).getTime(), // current time
                 y = Math.random();
     		series[0].addPoint([x, y], false, true);
            //series[1].addPoint([x, 1-y], false, true);	
     	}
     	
     	for (var i=1; i<=5;i++)  {
     		$('#live'+i).highcharts().redraw()
     	}
     }
     
     function update() {
     	console.log('updating');
     	addPoints();
     	setTimeout(update,updateRate);
     }
     

    $('#live1').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:false
            }
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
        });

    $('#live2').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            labels: {
            	enabled:false
            }
        },
        yAxis: {
        	
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
        });
    
    $('#live3').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:false
            }
        },
        yAxis: {
        	
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
        });        
    
    $('#live4').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:false
            }
        },
        yAxis: {
        	
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
        }); 
    
    $('#live5').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100,
            labels: {
            	enabled:false
            }
        },
        yAxis: {
        	
            title: {
                text: 'Temperature'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
        });


});