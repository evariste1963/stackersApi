import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//---devdata only --- to be deleted\\
export let devData = {
  timestamp: 1648737132,
  metal: 'XAU',
  currency: 'GBP',
  exchange: 'FOREXCOM',
  symbol: 'FOREXCOM:XAUGBP',
  ask: 1479.23,
  bid: 1478.36,
  ch: 7.39,
  chp: 0.5,
  currency: 'GBP',
  exchange: 'FOREXCOM',
  high_price: 1480.36,
  low_price: 1463.56,
  metal: 'XAU',
  metalTxt: 'Gold',
  open_price: 1481.4,
  open_time: 1648684800,
  prev_close_price: 1481.4,
  price: 1478.79,
  price_gram_18k: 35.6582,
  price_gram_20k: 39.6202,
  price_gram_21k: 41.6012,
  price_gram_22k: 43.5822,
  price_gram_24k: 47.5442,
  symbol: 'FOREXCOM:XAUGBP',
  timestamp: 1648737132,
};
//--------------------------------------------

export const AJAX = async function (url, requestOptions) {
  try {
    this.url = url;
    this.requestOptions = requestOptions;
    const fetchPro = fetch(this.url, this.requestOptions);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const result = await response.json();
    if (!response.ok) throw new Error(`ooops, something went wrong!!`);
    console.log(result);
    result.metal === 'XAU'
      ? (result.metalTxt = 'Gold')
      : result.metal === 'XAG'
      ? (result.metalTxt = 'Silver')
      : '';
    return result;
  } catch (err) {
    throw err; //throw errror back
  }
};

//generate timeDate stamp
export const getTimestamp = timestamp => {
  let callDate = new Date(timestamp * 1000).toUTCString('en-uk', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  /*let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();

  let callDate = `${year}-${month.toString().padStart(2, 0)}-${day
    .toString()
    .padStart(2, 0)} ${hours.toString().padStart(2, 0)}:${mins
    .toString()
    .padStart(2, 0)}:${secs.toString().padStart(2, 0)}`;
*/
  return callDate;
};

//build this below from api historic data/csv file
export let candleData = [
  {
    x: new Date(1538778600000),
    y: [6629.81, 6650.5, 6623.04, 6633.33],
  },
  {
    x: new Date(1538780400000),
    y: [6632.01, 6643.59, 6620, 6630.11],
  },
  {
    x: new Date(1538782200000),
    y: [6630.71, 6648.95, 6623.34, 6635.65],
  },
  {
    x: new Date(1538784000000),
    y: [6635.65, 6651, 6629.67, 6638.24],
  },
  {
    x: new Date(1538785800000),
    y: [6638.24, 6640, 6620, 6624.47],
  },
  {
    x: new Date(1538787600000),
    y: [6624.53, 6636.03, 6621.68, 6624.31],
  },
  {
    x: new Date(1538789400000),
    y: [6624.61, 6632.2, 6617, 6626.02],
  },
  {
    x: new Date(1538791200000),
    y: [6627, 6627.62, 6584.22, 6603.02],
  },
  {
    x: new Date(1538793000000),
    y: [6605, 6608.03, 6598.95, 6604.01],
  },
  {
    x: new Date(1538794800000),
    y: [6604.5, 6614.4, 6602.26, 6608.02],
  },
  {
    x: new Date(1538796600000),
    y: [6608.02, 6610.68, 6601.99, 6608.91],
  },
  {
    x: new Date(1538798400000),
    y: [6608.91, 6618.99, 6608.01, 6612],
  },
  {
    x: new Date(1538800200000),
    y: [6612, 6615.13, 6605.09, 6612],
  },
  {
    x: new Date(1538802000000),
    y: [6612, 6624.12, 6608.43, 6622.95],
  },
  {
    x: new Date(1538803800000),
    y: [6623.91, 6623.91, 6615, 6615.67],
  },
  {
    x: new Date(1538805600000),
    y: [6618.69, 6618.74, 6610, 6610.4],
  },
  {
    x: new Date(1538807400000),
    y: [6611, 6622.78, 6610.4, 6614.9],
  },
  {
    x: new Date(1538809200000),
    y: [6614.9, 6626.2, 6613.33, 6623.45],
  },
  {
    x: new Date(1538811000000),
    y: [6623.48, 6627, 6618.38, 6620.35],
  },
  {
    x: new Date(1538812800000),
    y: [6619.43, 6620.35, 6610.05, 6615.53],
  },
  {
    x: new Date(1538814600000),
    y: [6615.53, 6617.93, 6610, 6615.19],
  },
  {
    x: new Date(1538816400000),
    y: [6615.19, 6621.6, 6608.2, 6620],
  },
  {
    x: new Date(1538818200000),
    y: [6619.54, 6625.17, 6614.15, 6620],
  },
  {
    x: new Date(1538820000000),
    y: [6620.33, 6634.15, 6617.24, 6624.61],
  },
  {
    x: new Date(1538821800000),
    y: [6625.95, 6626, 6611.66, 6617.58],
  },
  {
    x: new Date(1538823600000),
    y: [6619, 6625.97, 6595.27, 6598.86],
  },
  {
    x: new Date(1538825400000),
    y: [6598.86, 6598.88, 6570, 6587.16],
  },
  {
    x: new Date(1538827200000),
    y: [6588.86, 6600, 6580, 6593.4],
  },
  {
    x: new Date(1538829000000),
    y: [6593.99, 6598.89, 6585, 6587.81],
  },
  {
    x: new Date(1538830800000),
    y: [6587.81, 6592.73, 6567.14, 6578],
  },
  {
    x: new Date(1538832600000),
    y: [6578.35, 6581.72, 6567.39, 6579],
  },
  {
    x: new Date(1538834400000),
    y: [6579.38, 6580.92, 6566.77, 6575.96],
  },
  {
    x: new Date(1538836200000),
    y: [6575.96, 6589, 6571.77, 6588.92],
  },
  {
    x: new Date(1538838000000),
    y: [6588.92, 6594, 6577.55, 6589.22],
  },
  {
    x: new Date(1538839800000),
    y: [6589.3, 6598.89, 6589.1, 6596.08],
  },
  {
    x: new Date(1538841600000),
    y: [6597.5, 6600, 6588.39, 6596.25],
  },
  {
    x: new Date(1538843400000),
    y: [6598.03, 6600, 6588.73, 6595.97],
  },
  {
    x: new Date(1538845200000),
    y: [6595.97, 6602.01, 6588.17, 6602],
  },
  {
    x: new Date(1538847000000),
    y: [6602, 6607, 6596.51, 6599.95],
  },
  {
    x: new Date(1538848800000),
    y: [6600.63, 6601.21, 6590.39, 6591.02],
  },
  {
    x: new Date(1538850600000),
    y: [6591.02, 6603.08, 6591, 6591],
  },
  {
    x: new Date(1538852400000),
    y: [6591, 6601.32, 6585, 6592],
  },
  {
    x: new Date(1538854200000),
    y: [6593.13, 6596.01, 6590, 6593.34],
  },
  {
    x: new Date(1538856000000),
    y: [6593.34, 6604.76, 6582.63, 6593.86],
  },
  {
    x: new Date(1538857800000),
    y: [6593.86, 6604.28, 6586.57, 6600.01],
  },
  {
    x: new Date(1538859600000),
    y: [6601.81, 6603.21, 6592.78, 6596.25],
  },
  {
    x: new Date(1538861400000),
    y: [6596.25, 6604.2, 6590, 6602.99],
  },
  {
    x: new Date(1538863200000),
    y: [6602.99, 6606, 6584.99, 6587.81],
  },
  {
    x: new Date(1538865000000),
    y: [6587.81, 6595, 6583.27, 6591.96],
  },
  {
    x: new Date(1538866800000),
    y: [6591.97, 6596.07, 6585, 6588.39],
  },
  {
    x: new Date(1538868600000),
    y: [6587.6, 6598.21, 6587.6, 6594.27],
  },
  {
    x: new Date(1538870400000),
    y: [6596.44, 6601, 6590, 6596.55],
  },
  {
    x: new Date(1538872200000),
    y: [6598.91, 6605, 6596.61, 6600.02],
  },
  {
    x: new Date(1538874000000),
    y: [6600.55, 6605, 6589.14, 6593.01],
  },
  {
    x: new Date(1538875800000),
    y: [6593.15, 6605, 6592, 6603.06],
  },
  {
    x: new Date(1538877600000),
    y: [6603.07, 6604.5, 6599.09, 6603.89],
  },
  {
    x: new Date(1538879400000),
    y: [6604.44, 6604.44, 6600, 6603.5],
  },
  {
    x: new Date(1538881200000),
    y: [6603.5, 6603.99, 6597.5, 6603.86],
  },
  {
    x: new Date(1538883000000),
    y: [6603.85, 6605, 6600, 6604.07],
  },
  {
    x: new Date(1538884800000),
    y: [6604.98, 6606, 6604.07, 6606],
  },
];

export const options = {
  series: [
    {
      name: 'line',
      type: 'line',
      data: [
        {
          x: new Date(1538778600000),
          y: 6604,
        },
        {
          x: new Date(1538782200000),
          y: 6602,
        },
        {
          x: new Date(1538814600000),
          y: 6607,
        },
        {
          x: new Date(1538884800000),
          y: 6620,
        },
      ],
    },
    {
      name: 'candle',
      type: 'candlestick',
      data: candleData,
    },
  ],
  chart: {
    height: '100%',
    width: '100%',
    type: 'line',
    fontFamily: 'Ink free, cursive, sans-serif',
    foreColor: '#000',
    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: '#000',
      opacity: 0.35,
    },
    events: {
      animationEnd: undefined,
      beforeMount: undefined,
      mounted: undefined,
      updated: undefined,
      mouseMove: undefined,
      mouseLeave: undefined,
      click: undefined,
      legendClick: undefined,
      markerClick: undefined,
      selection: undefined,
      dataPointSelection: undefined,
      dataPointMouseEnter: undefined,
      dataPointMouseLeave: undefined,
      beforeZoom: undefined,
      beforeResetZoom: undefined,
      zoomed: undefined,
      scrolled: undefined,
      scrolled: undefined,
    },
    chart: {
      id: undefined,
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
  },
  title: {
    text: 'Historic data',
    align: 'left',
  },
  stroke: {
    width: [2, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return '';
      },
    ],
  },
  xaxis: {
    type: 'datetime',
  },

  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: 'bottom',
    horizontalAlign: 'center',
    floating: false,
    fontSize: '14px',
    fontWeight: 400,
    formatter: undefined,
    inverseOrder: false,
    width: undefined,
    height: undefined,
    tooltipHoverFormatter: undefined,
    customLegendItems: [],
    offsetX: 0,
    offsetY: -300,
    labels: {
      colors: undefined,
      useSeriesColors: false,
    },
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 0,
      strokeColor: '#fff',
      fillColors: undefined,
      radius: 12,
      customHTML: undefined,
      onClick: undefined,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 0,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },
};
