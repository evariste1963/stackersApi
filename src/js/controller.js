import * as model from './model.js';
import addStackView from './views/addStackView.js';
import spotDataView from './views/spotDataView.js';
import statisticDataView from './views/statisticDataView.js';
import accountUpdateView from './views/accUpdateView.js';
import * as helpers from './helpers.js';
import { chartIt, updateChartPrice } from './views/chartView.js';
import { isAuthenticated, logout, getProfile, authHeader } from './auth.js';

const btnUpdate = document.querySelector('.btn-update');
const authNav = document.getElementById('authNav');

const settingsOverlay = document.querySelector('.settings-overlay');
const settingsWindow = document.querySelector('.settings-window');

const METAL_CACHE_KEY = 'stackers_metal_cache';
const ACCOUNT_CACHE_KEY = 'stackers_account_cache';

function getCachedMetal() {
  const cached = sessionStorage.getItem(METAL_CACHE_KEY);
  if (!cached || cached === 'undefined') return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

function setCachedMetal(data) {
  sessionStorage.setItem(METAL_CACHE_KEY, JSON.stringify(data));
}

function getCachedAccount() {
  const cached = sessionStorage.getItem(ACCOUNT_CACHE_KEY);
  if (!cached || cached === 'undefined') return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

function setCachedAccount(data) {
  sessionStorage.setItem(ACCOUNT_CACHE_KEY, JSON.stringify(data));
}

function renderAuthNav() {
    const dropdown = document.querySelector('.auth-dropdown');
    const dropdownContent = dropdown?.nextElementSibling;
    
    if (isAuthenticated()) {
      dropdown.classList.add('visible');
      authNav.innerHTML = '';
      
      document.getElementById('logoutLink').addEventListener('click', async (e) => {
        e.preventDefault();
        await logout();
        window.location.href = '/login.html';
      });
      
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdownContent) {
          dropdownContent.classList.toggle('visible');
        }
      });
      
      document.addEventListener('click', (e) => {
        if (dropdownContent && dropdownContent.classList.contains('visible') && 
            !dropdown.contains(e.target) && !dropdownContent.contains(e.target)) {
          dropdownContent.classList.remove('visible');
        }
      });
    } else {
      authNav.innerHTML = `
        <a href="/login.html" class="auth-link">Login</a>
        <a href="/register.html" class="auth-link">Register</a>
      `;
    }
  }

const init = async function () {
  renderAuthNav();
  setupSettingsModal();
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
    console.error('Error:', err, 'Status:', err.response?.status, 'Data:', err.response?.data);
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

function toggleSettingsModal() {
  settingsOverlay.classList.toggle('hidden');
  settingsWindow.classList.toggle('hidden');
}

async function loadProfile() {
  try {
    const response = await fetch('/api/user/profile', {
      headers: authHeader()
    });
    
    if (response.status === 401) {
      logout();
      window.location.href = '/login.html';
      return;
    }
    
    const user = await response.json();
    document.getElementById('profileInfo').innerHTML = `
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Admin:</strong> ${user.isAdmin ? 'Yes' : 'No'}</p>
      <p><strong>GoldAPI Key:</strong> ${user.hasGoldApiKey ? 'Configured' : 'Using admin key'}</p>
      <p><strong>Member since:</strong> ${new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
    `;
    
    if (!user.hasGoldApiKey && !user.isAdmin) {
      setTimeout(() => {
        document.getElementById('goldApiModal').classList.remove('hidden');
      }, 800);
    } else {
      document.getElementById('goldApiModal').classList.add('hidden');
    }
    
    if (user.isAdmin) {
      document.getElementById('adminPanel').classList.remove('hidden');
      loadAdminUsers();
    }
  } catch (err) {
    console.error('Failed to load profile:', err);
  }
}

async function loadAdminUsers() {
  try {
    const response = await fetch('/api/admin/users', {
      headers: authHeader()
    });
    const data = await response.json();
    
    if (data.users) {
      const userList = document.getElementById('userList');
      userList.innerHTML = data.users.map(u => {
        const isLocked = u.id === 1;
        return `
        <div class="user-item">
          <span class="user-info">${u.username} - ${u.email}${isLocked ? ' (Owner)' : ''}</span>
          <label class="admin-toggle">
            <input type="checkbox" data-id="${u.id}" ${u.is_admin ? 'checked' : ''} ${isLocked ? 'disabled' : ''}>
            <span>Admin${isLocked ? '' : ''}</span>
          </label>
        </div>
      `;
      }).join('');
      
      userList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', async (e) => {
          const userId = e.target.dataset.id;
          const isAdmin = e.target.checked ? 1 : 0;
          await fetch('/api/admin/user?id=' + userId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader() },
            body: JSON.stringify({ isAdmin })
          });
        });
      });
    }
  } catch (err) {
    console.error('Failed to load admin users:', err);
  }
}

function setupSettingsModal() {
  const settingsLink = document.getElementById('settingsLink');
  const closeBtn = document.querySelector('.btn--close-settings');
  const goldapiKeyInput = document.getElementById('goldapiKey');
  const saveBtn = document.getElementById('saveBtn');
  const acknowledgeBtn = document.getElementById('acknowledgeBtn');
  const newUserMsg = document.getElementById('newUserMsg');
  const goldApiModal = document.getElementById('goldApiModal');
  
  settingsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSettingsModal();
    loadProfile();
  });
  
  closeBtn?.addEventListener('click', () => {
    toggleSettingsModal();
  });
  
  settingsOverlay?.addEventListener('click', (e) => {
    if (e.target === settingsOverlay) {
      toggleSettingsModal();
    }
  });
  
  acknowledgeBtn?.addEventListener('click', () => {
    goldApiModal.classList.add('hidden');
    newUserMsg.classList.remove('hidden');
  });
  
  goldapiKeyInput?.addEventListener('input', () => {
    saveBtn.disabled = goldapiKeyInput.value.trim() === '';
  });
  
  document.getElementById('goldApiForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msgDiv = document.getElementById('settingsMsg');
    msgDiv.classList.add('hidden');
    
    const goldapiKey = document.getElementById('goldapiKey').value;
    
    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify({ goldapiKey })
      });
      
      if (response.ok) {
        msgDiv.textContent = 'Settings saved successfully!';
        msgDiv.classList.remove('hidden');
        newUserMsg.classList.add('hidden');
        document.getElementById('goldapiKey').value = '';
        saveBtn.disabled = true;
      } else {
        msgDiv.textContent = 'Failed to save settings';
        msgDiv.classList.remove('hidden');
      }
    } catch (err) {
      msgDiv.textContent = 'Error saving settings';
      msgDiv.classList.remove('hidden');
    }
  });
  
  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    toggleSettingsModal();
    await logout();
    window.location.href = '/login.html';
  });
  
  document.getElementById('cancelBtn')?.addEventListener('click', () => {
    toggleSettingsModal();
  });
}

btnUpdate.addEventListener('click', async () => {
  await controlGetMetalPrice();
  setTimeout(controlGetAccountUpdate, 2000);
});

init();
