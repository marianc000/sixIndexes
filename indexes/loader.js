import 'https://www.gstatic.com/charts/loader.js'; //cors
  
export const google = await window.google.charts.load('current', { 'packages': ['corechart'] }).then(()=>window.google);
