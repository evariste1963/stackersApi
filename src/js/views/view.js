const ICONS_PATH = '/src/img/icons.svg';

export default class View {
  _clear() {
    this._parentElement.innerHTML = ''; //clear out HTML container
  }
  renderSpinner() {
    this._clear();
    const markup = `
                <div class="spinner">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                  <p> ${this._message}</p>
                </div>
        `;
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderData = markUp => {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };

  renderError(message = this._errorMessage) {
    const markup = `
  <div class="error">
            <div class = 'svgBox'>
              <svg>
                <use href="${ICONS_PATH}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
  `;
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
  <div class="message">
            <div>
              <svg>
                <use href="${ICONS_PATH}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
            </div>
  `;
    this._clear(); //clear out HTML container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
