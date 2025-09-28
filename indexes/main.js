import { google } from './loader.js';
import { sixData } from './six.js';

monthsSelect.addEventListener('change',drawChart)

async function drawChart() {
 
  const objs = await sixData(monthsSelect.value);
  console.log(objs);

  var data = new google.visualization.DataTable();

  data.addColumn('string', 'Date');
  objs[0].slice(1).forEach(s => data.addColumn('number', s));

  console.log(data);
  data.addRows(objs.slice(1));


  var options = {
    curveType:'none',
    chartArea: {left:55,top:10,  width: '85%', height: '75%' },
    hAxis: {
      textStyle: {  
        fontSize: 10,
        fontName:'Arial',
        bold:true
      },
       slantedTextAngle:90,
       minTextSpacing:1
    } 
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}


drawChart();
 