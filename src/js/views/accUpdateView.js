import View from './view';

class AccountUpdateView extends View {
  _parentElement = document.querySelector('.userStack');
  _errorMessage = 'No data found for your query! Please try again ;)';
  _message = '';
  /*
    _generateSpotMarkup(result) {
      let statMarkUp = statisticDataView._generateStatMarkup(result);
      statisticDataView.renderData(statMarkUp);
  
      const dateTime = helpers.getTimestamp(
        result.date ? result.timestamp / 1000 : result.timestamp
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
  
      return !result.date
        ? `
      <H1 ><span>Latest Price (${result.currency})</span><br>
      <div id=callTime>${dateTime}</div>
      <div id= spotBox>
      <div id=spotItems style='${dayChange}'>
      <p id=spotPrice >${result.price}</p>
      <p class ='${arrow}'></p>
      <p class='changeV'>${changeValue}</p>
      <p class=changeP>${changePercentage}%</p>
          </div>
       </div>
      </H1>`
        : console.log(`
    ${callTime}
    Previous closing price: ${result.prev_close_price}
    Price: ${result.price}`);
    }*/
}

export default new AccountUpdateView();