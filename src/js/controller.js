import ApexCharts from 'apexcharts';
import * as model from './model.js';
import addStackView from './views/addStackView.js';
import spotDataView from './views/spotDataView.js';
import statisticDataView from './views/statisticDataView.js';
import * as helpers from './helpers.js';

const btnUpdate = document.querySelector('.btn-update');
const candleChart = document.querySelector('#chart');
const modal = document.querySelectorAll('.modal');

//get default chart
var chart = new ApexCharts(candleChart, helpers.options);
//render chart
chart.render();
//get metal price on 'get latest price' button
const controlGetMetalPrice = async () => {
  const markUp = await spotDataView._generateSpotMarkup(
    await model.getMetalPrice()
  );
  //render price update
  await spotDataView.renderData(markUp);
  markUp = await statisticDataView._generateStatMarkup(result);
  await statisticDataView.renderData(markUp);
};

//-- All EventListeners --\\
modal.forEach(btn => btn.addEventListener('click', addStackView._toggleWindow)); ///maybe change btnUploadStack to submit to submit (remove modal class)

btnUpdate.addEventListener('click', controlGetMetalPrice);
