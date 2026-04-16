import View from './view.js';
import { getTimestamp } from '../helpers.js';
import statisticDataView from './statisticDataView.js';

class SpotDataView extends View {
  _parentElement = document.querySelector('.spotTicker');
  _errorMessage = 'No data found for your query! Please try again ;)';
  _message = 'fetching data, please wait..';

  _generateSpotMarkup(result) {
    let statMarkUp = statisticDataView._generateStatMarkup(result);
    statisticDataView.renderData(statMarkUp);

    const dateTime = getTimestamp(
      result.date ? result.timestamp : result.timestamp
    );

    const changeValue = (result.price - result.prev_close_price).toFixed(2);
    const changePercentage = (
      ((result.price - result.prev_close_price) / result.prev_close_price) *
      100
    ).toFixed(2);

    const arrow =
      changeValue < 0
        ? 'arrow arrow-down'
        : changeValue > 0
        ? 'arrow arrow-up'
        : '';

    const dayChange =
      result.price - result.prev_close_price > 0
        ? 'color: var(--price-up-color)'
        : 'color: var(--price-drop-color)';

    result.exchange === 'FOREXCOM'
      ? (result.srcExchange = `<img id=forex src=${result.forex} alt='forex' width='120' height='20'  />`) //use forex img from adjusted result object
      : (result.srcExchange = result.exchange);

    return !result.date
      ? `
    <div id='metalCur'>${result.srcExchange}  - ${result.metal} / ${result.metalTxt} - ${result.currency} / oz</div>
    <div id= spotBox>
    <div id=spotItems style='${dayChange}'>
    <p id=spotPrice >${result.price}</p>
    <p class ='${arrow}'></p>
    <div id='change'>
    <p class='changeV'>${changeValue}</p>
    <p class=changeP>${changePercentage}%</p>
          </div>
        </div>
      </div>
     <div id=callTime>${dateTime}</div>
   `
      : console.log(`
  ${callTime}
  Previous closing price: ${result.prev_close_price}
  Price: ${result.price}`);
  }
}

export default new SpotDataView();
