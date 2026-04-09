import View from './view.js';

const modalWindow = document.querySelector('.add-stack-window');
const overlay = document.querySelector('.overlay');
const modal = document.querySelectorAll('.modal');

class AddStackView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Stack successfully uploaded';

  constructor() {
    super();
  }

  _toggleWindow = function () {
    modalWindow.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  };

  addHandlerModal(handler) {
    modal.forEach(btn => btn.addEventListener('click', handler));
  }
}

export default new AddStackView();
