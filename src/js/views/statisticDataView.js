import View from './view.js';

class StatisticDataView extends View {
  _parentElement = document.querySelector('.statTicker');
  _errorMessage = 'No statistics found for your query! Please try again ;)';
  _message = 'fetching data, please wait...';

_generateStatMarkup(result) {
    return !result.date
      ? `
    <H1 ><span>Spot details</span><br></H1>
    <br><div id=statBox style="display: inline-flex; flex-direction: column;" >
    <div style="display: flex;">
    <div id=openPrice >Day Open:</div>
    <span>${parseFloat(result.open_price).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=high>Day high:</div>
    <span>${parseFloat(result.high_price).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=low>Day low:</div>
    <span>${parseFloat(result.low_price).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=buy>Buy:</div>
    <span>${parseFloat(result.ask).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=sell>Sell:</div>
    <span>${parseFloat(result.bid).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=P24K>24 Karat:</div>
    <span>${(result.price_gram_24k * 31.1034768).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=P22K>22 Karat:</div>
    <span>${(result.price_gram_22k * 31.1034768).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=P20K>20 Karat:</div>
    <span>${(result.price_gram_20k * 31.1034768).toFixed(2)}</span></div>
    <div style="display: flex;">
    <div id=P18K>18 Karat:</div>
    <span>${(result.price_gram_18k * 31.1034768).toFixed(2)}</span></div>
        
    </div>
    `
      : console.log(`
    Previous closing price: ${result.prev_close_price}
    Price: ${result.price}`);
  }
}

export default new StatisticDataView();
