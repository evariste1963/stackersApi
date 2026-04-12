import * as model from './model.js';
import addStackView from './views/addStackView.js';
import spotDataView from './views/spotDataView.js';
import statisticDataView from './views/statisticDataView.js';
import accountUpdateView from './views/accUpdateView.js';
import * as helpers from './helpers.js';
import { chartIt, updateChartPrice } from './views/chartView.js';
import { isAuthenticated, logout } from './auth.js';

const btnUpdate = document.querySelector('.btn-update');
const authNav = document.getElementById('authNav');

const METAL_CACHE_KEY = 'stackers_metal_cache';
const ACCOUNT_CACHE_KEY = 'stackers_account_cache';

function getCachedMetal() {
  const cached = sessionStorage.getItem(METAL_CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
}

function setCachedMetal(data) {
  sessionStorage.setItem(METAL_CACHE_KEY, JSON.stringify(data));
}

function getCachedAccount() {
  const cached = sessionStorage.getItem(ACCOUNT_CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
}

function setCachedAccount(data) {
  sessionStorage.setItem(ACCOUNT_CACHE_KEY, JSON.stringify(data));
}

function renderAuthNav() {
    const dropdown = document.getElementById('accountDropdown');
    
    if (isAuthenticated()) {
      // Show dropdown, hide authNav links
      dropdown.style.display = 'inline-block';
      authNav.innerHTML = '';
      
      // Add click handler for logout
      document.getElementById('logoutLink').addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
        window.location.href = '/login.html';
      });
      
      // Add toggle handler for dropdown
      dropdown.querySelector('.dropbtn').addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
        }
      });
    } else {
      // Show login/register in authNav, hide dropdown
      dropdown.style.display = 'none';
      authNav.innerHTML = `
        <a href="/login.html" class="auth-link">Login</a>
        <a href="/register.html" class="auth-link">Register</a>
      `;
    }
  }

const init = async function () {
  renderAuthNav();
  if (!isAuthenticated()) {
    spotDataView.renderError('Please login to view prices');
    return;
  }
  
  const fromSettings = document.referrer.includes('settings.html') || 
                      document.referrer.includes('login.html') ||
                      document.referrer.includes('register.html');
  
  try {
    await chartIt();
    addStackView.addHandlerModal(controlStackModal);
    
    if (fromSettings) {
      const cachedMetal = getCachedMetal();
      const cachedAccount = getCachedAccount();
      if (cachedMetal) {
        displayCachedData(cachedMetal, cachedAccount);
      } else {
        await controlGetMetalPrice();
        setTimeout(controlGetAccountUpdate, 2000);
      }
    } else {
      await controlGetMetalPrice();
      setTimeout(controlGetAccountUpdate, 2000);
    }
  } catch (err) {
    console.error('Init error:', err);
  }
};

function displayCachedData(metalData, accountData) {
  if (metalData) {
    let markUp = spotDataView._generateSpotMarkup(metalData);
    spotDataView.renderData(markUp);
    updateChartPrice(metalData.timestamp, metalData.price);
  }
  if (accountData) {
    let markUp = accountUpdateView._generateAccMarkup(accountData);
    accountUpdateView.renderData(markUp);
  }
}

async function controlGetMetalPrice() {

  try {
    [spotDataView, statisticDataView].forEach(fn => fn.renderSpinner());
    const metalData = await model.getMetalPrice();
    if (!metalData) {
      [spotDataView, statisticDataView].forEach(fn => fn.renderError('No data'));
      return;
    }
    setCachedMetal(metalData);
    let markUp = spotDataView._generateSpotMarkup(metalData);
    spotDataView.renderData(markUp);
    
    updateChartPrice(metalData.timestamp, metalData.price);
  } catch (err) {
    console.error('Error:', err);
    [spotDataView, statisticDataView].forEach(fn => fn.renderError('Login required'));
  }
}

async function controlGetAccountUpdate() {
  try {
    accountUpdateView.renderSpinner();
    const accountData = await model.getAccountUpdate();
    setCachedAccount(accountData);
    let markUp = await accountUpdateView._generateAccMarkup(accountData);
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

btnUpdate.addEventListener('click', async () => {
  await controlGetMetalPrice();
  setTimeout(controlGetAccountUpdate, 2000);
});

init();
