import { API_BASE, metal, currency, historicDate } from './config.js';
import { authHeader } from './auth.js';

const FOREX_IMG = '/src/img/forex.webp';

export const getMetalPrice = async () => {
  const url = `${API_BASE}/metal-price?metal=${metal}&currency=${currency}${historicDate ? '&date=' + historicDate : ''}`;
  
  const headers = authHeader();
  console.log('getMetalPrice headers:', headers);
  console.log('Token in localStorage:', localStorage.getItem('stackers_token'));
  
  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.log('getMetalPrice error response:', response.status, errorText);
    throw new Error(errorText || 'Failed to fetch metal price');
  }
  
  const result = await response.json();
  
  if (result) {
    result.metalTxt = result.metal === 'XAU' ? 'Gold' : result.metal === 'XAG' ? 'Silver' : '';
    result.forex = FOREX_IMG;
  }
  
  return result;
};

export const getAccountUpdate = async () => {
  try {
    const response = await fetch(`${API_BASE}/account-stats`, {
      method: 'GET',
      headers: authHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch account stats');
    }
    
    return await response.json();
  } catch (error) {
    console.log('error', error);
  }
};
