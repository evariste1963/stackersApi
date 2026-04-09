import { requestLimit } from '../config.js';
import View from './view.js';

class AccountUpdateView extends View {
  _parentElement = document.querySelector('#accStatus');
  _errorMessage = 'Account data could not be found! Please try again later';
  _message = 'updating account status, please wait...';

  _generateAccMarkup(result) {
    let updated = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'long',
      timeStyle: 'medium',
    })
      .format(new Date())
      .replace(' at', ' @');

    return `
       <div id='accBox'>
       <p> Request Limit/month: <span>${requestLimit}</span></p>
          <p> Requests today: <span>${result.requests_today}</span></p>
          <p> Requests remaining this month: <span>${
            requestLimit - result.requests_month
          }</span></p>
          <p> Requests last month: <span>${
            result.requests_last_month
          }</span></p><p> Last updated: <span>
            ${updated}
          </span></p>
          </div>
        `;
  }
}

export default new AccountUpdateView();
