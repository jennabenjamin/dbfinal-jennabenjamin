let count = 0;

const Supersector = {
"0000": "Total nonfarm",
"0500": "Total private",
"0600": "Goods-producing",
"0700": "Service-providing",
"0800": "Private service-providing",
"1000": "Mining and logging",
"2000": "Construction",
"3000": "Manufacturing",
"3100": "Durable Goods",
"3200": "Nondurable Goods",
"4000": "Trade, transportation, and utilities",
"4142": "Wholesale trade",
"4200": "Retail trade",
"4300": "Transportation and warehousing",
"4422": "Utilities",
"5000": "Information",
"5500": "Financial activities",
"6000": "Professional and business services",
"6500": "Education and health services",
"7000": "Leisure and hospitality",
"8000": "Other services",
"9000": "Government"
};
let SupersectorKeys = Object.keys(Supersector);


const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    pink: 'rgb(255, 105, 180)',
    lightyellow: 'rgb(255, 255, 224)',
    teal: 'rgb(0, 128, 128)',
    brown: 'rgb(139, 69, 19)',
    black: 'rgb(0, 0, 0)',
    navy: 'rgb(0, 0, 128)',
    cyan: 'rgb(0, 255, 255)',
    coral: 'rgb(240, 128, 128)',
    gold: 'rgb(255, 215, 0)',
    olive: 'rgb(128, 128, 0)',
    lime: 'rgb(0, 255, 0)',
    steelblue: 'rgb(70, 130, 180)',
    aqua: 'rgb(127, 255, 212)',
    maroon: 'rgb(128, 0, 0)',
    orchid: 'rgb(218, 112, 214)'
  };
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
  
const CHART_COLORS_50_Percent = {
    red: 'rgba(255, 99, 132, 0.5)',
    orange: 'rgba(255, 159, 64, 0.5)',
    yellow: 'rgba(255, 205, 86, 0.5)',
    green: 'rgba(75, 192, 192, 0.5)',
    blue: 'rgba(54, 162, 235, 0.5)',
    purple: 'rgba(153, 102, 255, 0.5)',
    grey: 'rgba(201, 203, 207, 0.5)',
    pink: 'rgba(255, 105, 180, 0.5)',
    lightyellow: 'rgb(255, 255, 224, 0.5)',
    teal: 'rgb(0, 128, 128, 0.5)',
    brown: 'rgb(139, 69, 19, 0.5)',
    black: 'rgb(0, 0, 0, 0.5)',
    navy: 'rgb(0, 0, 128, 0.5)',
    cyan: 'rgb(0, 255, 255, 0.5)',
    coral: 'rgb(240, 128, 128, 0.5)',
    gold: 'rgb(255, 215, 0, 0.5)',
    olive: 'rgb(128, 128, 0, 0.5)',
    lime: 'rgb(0, 255, 0, 0.5)',
    steelblue: 'rgb(70, 130, 180, 0.5)',
    aqua: 'rgb(127, 255, 212, 0.5)',
    maroon: 'rgb(128, 0, 0, 0.5)',
    orchid: 'rgb(218, 112, 214, 0.5)'

  };
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let a = false; 
function responseHandler() {
    if (this.status == 200) {
      let dataArray = this.response.Results.series[0].data;
 let seriesID = this.response.Results.series[0].seriesID;
      let sectorline = {
 label: "",
 data:[],
 borderColor: "",
 backgroundColor: "",
 hidden:true
}
sectorline.label = (Supersector[seriesID.substring(3,7)]);
sectorline.borderColor = (CHART_COLORS_KEYS[count]);
sectorline.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);
if(flag == false){
 for (let i = dataArray.length -1; i >= 0; i--) { 
data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
a = true; 
}}
for(let i = dataArray.length -1; i >= 0; i--) {
sectorline.data.push(dataArray[i].value); 

}

data.datasets.push(sectorline);
count++

    console.log(this.response);
    }else {
    console.log ("error");
    }
}


    const data = {
      labels: [],
      datasets: []
    };

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'US Labor Statistics: Number of Employees in Thousands'
        }
      }
    }
  };


const myChart = new Chart(
    document.getElementById('myChart'),
      config);


for (i = 0; i < SupersectorKeys.length; i++){
let call = new XMLHttpRequest()
call.addEventListener("load", responseHandler);
let x = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
let z = "000001?registrationkey=40d7321744104d398f3021fdd0e3f407";
call.open("GET", x + SupersectorKeys[i] + z);
call.responseType = "json";
call.send();
}
