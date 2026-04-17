import { metal } from '../config.js';

const ApexCharts = window.ApexCharts || window.Apex;
const MAX_DAYS = 90;

let chart = null;
export function getChart() { return chart; }

function getTodayDateString() {
  return new Date().toISOString().split('T')[0];
}

async function loadChartData() {
  try {
    const response = await fetch('/api/prices?metal=' + metal);
    const prices = await response.json();
    
    const data = prices.map(p => {
      const ts = new Date(p.date).getTime();
      return [ts, p.price];
    });
    
    data.sort((a, b) => a[0] - b[0]);
    
    const cutoff = Date.now() - (MAX_DAYS * 24 * 60 * 60 * 1000);
    return data.filter(([ts]) => ts >= cutoff);
  } catch (err) {
    console.error('Failed to load prices:', err);
    return [];
  }
}

export async function updateChartPrice(timestamp, price) {
  const date = new Date(timestamp * 1000).toISOString().split('T')[0];
  
  let data = await loadChartData();
  
  data = data.filter(([ts]) => {
    const d = new Date(ts).toISOString().split('T')[0];
    return d !== date;
  });
  
  const ts = new Date(date).getTime();
  data.push([ts, price]);
  
  data.sort((a, b) => a[0] - b[0]);
  
  const cutoff = Date.now() - (MAX_DAYS * 24 * 60 * 60 * 1000);
  data = data.filter(([t]) => t >= cutoff);
  
  if (chart) {
    chart.updateSeries([{ name: metal, data: data }]);
  }
}

export async function chartIt() {
  try {
    const data = await loadChartData();
    
    const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

    const options = {
      series: [{ name: metal, data: data }],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: { autoScaleYaxis: true },
        toolbar: { show: true }
      },
      theme: {
        mode: getTheme()
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