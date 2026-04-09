import * as model from './model.js';
import addStackView from './views/addStackView.js';
import spotDataView from './views/spotDataView.js';
import statisticDataView from './views/statisticDataView.js';
import accountUpdateView from './views/accUpdateView.js';
import * as helpers from './helpers.js';
import { chartIt, updateChartPrice } from './views/chartView.js';

const btnUpdate = document.querySelector('.btn-update');

//immediately pass controls to Views on startup
const init = async function () {
  try {
    await chartIt();
    addStackView.addHandlerModal(controlStackModal);
    await controlGetMetalPrice();
    setTimeout(controlGetAccountUpdate, 2000);
  } catch (err) {
    console.error('Init error:', err);
  }
};

//get metal price
async function controlGetMetalPrice() {
  try {
    [spotDataView, statisticDataView].forEach(fn => fn.renderSpinner());
    const metalData = await model.getMetalPrice();
    if (!metalData) {
      [spotDataView, statisticDataView].forEach(fn => fn.renderError('No data'));
      return;
    }
    let markUp = spotDataView._generateSpotMarkup(metalData);
    spotDataView.renderData(markUp);
    
    updateChartPrice(metalData.timestamp, metalData.price);
  } catch (err) {
    console.error('Error:', err);
    [spotDataView, statisticDataView].forEach(fn => fn.renderError());
  }
}

async function controlGetAccountUpdate() {
  try {
    accountUpdateView.renderSpinner();
    let markUp = await accountUpdateView._generateAccMarkup(
      await model.getAccountUpdate()
    );
    accountUpdateView.renderData(markUp);
  } catch (err) {
    console.error('Account error:', err);
    accountUpdateView.renderError();
  }
}

const controlStackModal = function (e) {
  e.preventDefault();
  addStackView._toggleWindow();
};

// Event Listeners
btnUpdate.addEventListener('click', async () => {
  await controlGetMetalPrice();
  setTimeout(controlGetAccountUpdate, 2000);
});

init();
