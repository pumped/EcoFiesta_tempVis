
//Data Files
miniData = {
	live: "current.json",
	updateRate: 5 //seconds
}
treeData = {
	live: "current.json",
	historic: "every_10.json",
	updateRate: 10*60 //10 minutes
}



//Sensor Addresses
var miniGraphSensors = ["283E2708030000B1",
"2877200803000003",
"286629080300009C",
"28EA2308030000B6",
"28BE19080300007D"];

var mainGraphSensors = {"temperature": ["28FA21080300006E", "2863F50703000092", "2828F407030000D2", "28D2FD070300009C"], 
						"humidity": ["26020656010000E9","26BFDC55010000CF","26B8F25501000010","26A7F5550100003E"]};

var mainOrder = {};
mainOrder.temperature = ["2828F407030000D2",
						"2863F50703000092",
						"28D2FD070300009C",
						"2832F80703000067",
						"28FA21080300006E",
						"2858200803000091",
						"28E71908030000C5",
						"2825BB26030000E1",
						"28DDA82603000000",
						"287C2408030000E4",
						"289ECA26030000BE",
						"286F3C08030000A4"];
				
mainOrder.humidity = ["26B8F25501000010",
					"26A7F5550100003E",
					"26FA055601000074",
					"26C1F2550100001E",
					"262AF955010000BF",
					"263908560100005E",
					"26EFE655010000D8",
					"26D7F555010000A6",
					"2605EC5501000083",
					"261F0656010000F8"];