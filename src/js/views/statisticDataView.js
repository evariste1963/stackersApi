import View from './view.js';

class StatisticDataView extends View {
  _parentElement = document.querySelector('.statTicker');
  _errorMessage = 'No statistics found for your query! Please try again ;)';
  _message = 'fetching data, please wait...';

_generateStatMarkup(result) {
    return !result.date
      ? `
    <h1><span>Spot details</span></h1>
    <div id="statBox">
    <div class="stat-row"><span class="stat-label">Day Open:</span><span class="stat-value">${parseFloat(result.open_price).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">Day high:</span><span class="stat-value">${parseFloat(result.high_price).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">Day low:</span><span class="stat-value">${parseFloat(result.low_price).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">Buy:</span><span class="stat-value">${parseFloat(result.ask).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">Sell:</span><span class="stat-value">${parseFloat(result.bid).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">24 Karat:</span><span class="stat-value">${(result.price_gram_24k * 31.1034768).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">22 Karat:</span><span class="stat-value">${(result.price_gram_22k * 31.1034768).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">20 Karat:</span><span class="stat-value">${(result.price_gram_20k * 31.1034768).toFixed(2)}</span></div>
    <div class="stat-row"><span class="stat-label">18 Karat:</span><span class="stat-value">${(result.price_gram_18k * 31.1034768).toFixed(2)}</span></div>
    </div>
    `
      : console.log(`
    Previous closing price: ${result.prev_close_price}
    Price: ${result.price}`);
  }
}

export default new StatisticDataView();
