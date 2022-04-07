import View from './view';

class StatisticDataView extends View {
  _parentElement = document.querySelector('.statTicker');
  _errorMessage = 'No statistics found for your query! Please try again ;)';
  _message = '';

  _generateStatMarkup(result) {
    return !result.date
      ? `
    <H1 ><span>Statistics</span><br></H1>
       <div id= statBox>
    <div id=openPrice >Day Open:<span>${result.open_price}</span></div>
    <div id=high>Day high:<span>${result.high_price}</span></div>
    <div id=low>Day low:<span>${result.low_price}</span></div>
    <div id=buy>Buy:<span>${result.ask}</span></div>
    <div id=sell>Sell:<span>${result.bid}</span></div>
    </div>
    `
      : console.log(`
    Previous closing price: ${result.prev_close_price}
    Price: ${result.price}`);
  }
}

export default new StatisticDataView();
