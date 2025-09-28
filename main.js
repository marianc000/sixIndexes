import { google } from './loader.js';
import { sixData } from './six.js';

monthsSelect.addEventListener('change', drawChart);
avgInp.addEventListener('change', drawChartAvg);

let objs;
async function drawChart() {

  objs = await sixData(monthsSelect.value);
  console.log(objs);

  drawChartAvg();
}

async function drawChartAvg() {
  if (avgInp.checked) {
    const objs2 = objs.map(ar => [ar[0], ar.at(-1)]);
    drawChart2(objs2);
    console.log(objs2);
  }
  else
    drawChart2(objs);
}


async function drawChart2(objs) {

  var data = new google.visualization.DataTable();

  data.addColumn('string', 'Date');
  objs[0].slice(1).forEach(s => data.addColumn('number', s));

  data.addRows(objs.slice(1));

  const nums = objs.slice(1).flatMap(ar => ar.slice(1));

  const min = Math.min(...nums);
  const max = Math.max(...nums);

  console.log(min, max);

  var options = {
    curveType: 'none',
    chartArea: { left: 55, top: 10, width: '85%', height: '75%' },
    hAxis: {
      textStyle: {
        fontSize: 10,
        fontName: 'Arial',
        bold: true
      },
      slantedTextAngle: 90,
      minTextSpacing: 1
    },
    vAxis: { minValue: min - 0.05, maxValue: max - 0.05, viewWindow: { min: min - 0.05 } }
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

drawChart();
