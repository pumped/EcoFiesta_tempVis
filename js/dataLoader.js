
//data files
miniData = {
	live: "current.json",
	updateRate: 2 //seconds
}
treeData = {
	live: "current.json",
	historic: "every_10.json",
	updateRate: 10*60 //10 minutes
}


$(document).ready(function(){
	$('#gradient').gradient({elements:5,sensitivity:0.1});
	$('#gradient').gradient.setData([1,2,3,2,6,1,2]);
	
	liveGraphs();
	populateHistory();
	setTimeout(treeGraph(),2000);
});

function liveGraphs() {	
	loadGraphs();	
}

function treeGraph() {
	updateTreeGraphs();
	setTimeout(treeGraph,treeData.updateRate * 1000); //minutes
}

//get live mini graphs
function loadGraphs() {
	$.getJSON(miniData.live,function(data){
		console.log('loaded');
		k = '';
		for (key in data[0]) {
			k = key;
			break;
		}
		
		setLiveGraphs(k, data[0][k]);
		setGradient(data[0][k]);
		
		setTimeout(liveGraphs,miniData.updateRate * 1000);		
	});
}

//update the tree vert graph and add points to 10h graphs
function updateTreeGraphs() {
	$.getJSON(treeData.live,function(data) {
		console.log('loaded large');
		data = data[0];
		for (time in data) {
			var graphData = [];
			for (type in data[time]) {
				sensors = data[time][type];
				graphData[type] = [];			
				
				//create data array for vert graph
				for (sensor in sensors) {
					value = sensors[sensor];
					//console.log(sensor);
					graphData[type].push(value);
				
				
					//add points to main graphs
					var tidx = mainGraphSensors.temperature.indexOf(sensor);
					var hidx = mainGraphSensors.humidity.indexOf(sensor);
					if (tidx !=-1 || hidx !=-1) {
						idx = (tidx == -1) ? hidx : tidx;
						//console.log(sensor + ' : ' + idx)
							t = 0;
							if (type =='humidity') {
								t = 1;
								//console.log(idx + " " + [parseInt(time*1000),value] + " " + type + " " + t);
							}
							//console.log(t);
							
							addData(idx, [parseInt(time*1000),value],type,t,true);						
					}
				}
			}
		}
		
		console.log(graphData['humidity'].length + " : " + graphData['temperature'].length);
		$('#vertGraph').highcharts().series[0].setData(graphData['temperature']);
		$('#vertGraph').highcharts().series[1].setData(graphData['humidity']);
		
		for (i=1;i<=mainGraphSensors.temperature.length;i++) {
			$('#history'+(i)).highcharts().redraw();
		}
		
	});
}



//reload the main trees historic data
function populateHistory() {
	$.getJSON(treeData.historic,function(data) {
		console.log('loaded history');
		
		dataTypes = ["temperature", "humidity"];
		
		for (key in data) {
			for (time in data[key]) {
				//console.log("time: " + time);
				for (i=0;i<mainGraphSensors.temperature.length;i++) {
					for (t in dataTypes) {
						type = dataTypes[t];
						if (data[key][time][type][mainGraphSensors[type][i]] != undefined) {
							temp = data[key][time][type][mainGraphSensors[type][i]];
	
							addData(i, [parseInt(time*1000),temp], type, parseInt(t));					
						}
					
					//console.log("Temp: " + data[key][time].temperature[mainGraphSensors[i]]);
					}
				}
			}
		}

		for (i=1;i<=mainGraphSensors.temperature.length;i++) {
			$('#history'+(i)).highcharts().redraw();
		}				

	});
}

//add data to the main graphs
function addData(chartID, data, type, s, bShift) {
	bShift = (typeof bShift === "undefined") ? false : bShift;
	
	series = $('#history'+(chartID+1)).highcharts().series;
	axis = s;
	
	//define a series if undefined
	if (series[s] == undefined) {
		$('#history'+(chartID+1)).highcharts().addSeries({
			name: type,
			yAxis: axis,
			type: 'spline',
			data: [{"x":data[0],"y":data[1]}]
		});
		console.log('added series');
	} else {
		series[s].addPoint([parseInt(data[0]),data[1]],false,bShift);
		//console.log('added point to series ' + s + ' :'  + data[0] + ', ' + data[1]);
	}
}









//sets the gradients data
function setGradient(data) {
	gradData = new Array();
	
	for (i=0; i<5; i++) {
		gradData[i] = data.temperature[miniGraphSensors[i]]
	}
	
	$('#gradient').gradient.setData(gradData);
}

//sets the mini trees live graphs
function setLiveGraphs(key, data) {
	
	for (i=1; i<=5; i++) {
		//check this point has data
		if (data.temperature[miniGraphSensors[i-1]] != undefined) {
			series = $('#live'+i).highcharts().series;
			
			//define a series if undefined
			if (series[0] == undefined) {
				$('#live'+i).highcharts().addSeries({
					name: 'Temperature',
					data: [{"x":parseInt(key*1000),"y":data.temperature[miniGraphSensors[i-1]]}]
				});
				console.log('added series');
			} else {				
				//determine if deleting old data
				if (series[0].data.length >= points) {
					bshift = true;
				} else {
					bshift = false;
				}
		
				series[0].addPoint([parseInt(key*1000),data.temperature[miniGraphSensors[i-1]]],true,bshift);
			}
		}
	}
	
	
}

var miniGraphSensors = ["28FA21080300006E", "2863F50703000092", "2828F407030000D2", "28D2FD070300009C", "2858200803000091"];
var mainGraphSensors = {"temperature": ["28FA21080300006E", "2863F50703000092", "2828F407030000D2", "28D2FD070300009C"], 
						"humidity": ["26020656010000E9","26BFDC55010000CF","26B8F25501000010","26A7F5550100003E"]};
