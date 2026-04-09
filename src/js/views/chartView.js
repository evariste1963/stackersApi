import { metal } from '../config.js';
import { priceData } from '../priceData.js';

const ApexCharts = window.ApexCharts || window.Apex;
const STORAGE_KEY = 'stackers_chart_data';
const MAX_DAYS = 90;

let chart = null;

function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

function loadChartData() {
  // Always start fresh - clear bad localStorage data
  localStorage.removeItem(STORAGE_KEY);
  
  // Use only priceData.js
  const data = Object.entries(priceData).map(([date, price]) => {
    const ts = new Date(date).getTime();
    return [ts, price];
  });
  
  data.sort((a, b) => a[0] - b[0]);
  
  const cutoff = Date.now() - (MAX_DAYS * 24 * 60 * 60 * 1000);
  return data.filter(([ts]) => ts >= cutoff);
}

function saveChartData(data) {
  const obj = {};
  data.forEach(([ts, price]) => {
    const date = new Date(ts).toISOString().split('T')[0];
    obj[date] = price;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function updateChartPrice(timestamp, price) {
  const date = new Date(timestamp * 1000).toISOString().split('T')[0];
  
  let data = loadChartData();
  
  data = data.filter(([ts]) => {
    const d = new Date(ts).toISOString().split('T')[0];
    return d !== date;
  });
  
  const ts = new Date(date).getTime();
  data.push([ts, price]);
  
  data.sort((a, b) => a[0] - b[0]);
  
  const cutoff = Date.now() - (MAX_DAYS * 24 * 60 * 60 * 1000);
  data = data.filter(([t]) => t >= cutoff);
  
  saveChartData(data);
  
  if (chart) {
    chart.updateSeries([{ name: metal, data: data }]);
  }
}

export async function chartIt() {
  try {
    const data = loadChartData();
    
    const options = {
      series: [{ name: metal, data: data }],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: { autoScaleYaxis: true },
        toolbar: { show: true }
      },
      dataLabels: { enabled: false },
      markers: { size: 0, style: 'hollow' },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        labels: {
          format: 'dd MMM yyyy',
          rotate: -45
        }
      },
      tooltip: {
        x: { format: 'dd MMM yyyy' }
      },
      colors: ['rgba(5, 5, 93, 0.8)'],
      fill: {
        colors: ['rgba(5, 5, 93, 0.9)'],
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    };

    chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();
  } catch (err) {
    console.error('Chart error:', err);
  }
}