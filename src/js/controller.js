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
async function controlGetMetalPrice() {
  try {
    [spotDataView, statisticDataView].forEach(fn => fn.renderSpinner());
    //spotDataView.renderSpinner();
    //statisticDataView.renderSpinner();
    let markUp = await spotDataView._generateSpotMarkup(
      await model.getMetalPrice()
    );
    //render price update
    spotDataView.renderData(markUp);
    //await statisticDataView.renderData();
  } catch (err) {
    [spotDataView, statisticDataView].forEach(fn => fn.renderError());
    //spotDataView.renderError();
    //statisticDataView.renderError();
  }
}
//-- All EventListeners --\\
modal.forEach(btn => btn.addEventListener('click', addStackView._toggleWindow)); ///maybe change btnUploadStack to submit to submit (remove modal class)

btnUpdate.addEventListener('click', controlGetMetalPrice);
