import { API_KEY, API_URL, metal, currency, historicDate } from './config.js';
import { AJAX } from './helpers.js';

const FOREX_IMG = '/src/img/forex.webp';

const myHeaders = new Headers();
myHeaders.append('x-access-token', API_KEY);
myHeaders.append('Content-Type', 'application/json');

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export const getMetalPrice = async () => {
  const url = `${API_URL}/${metal}/${currency}${historicDate ? '/' + historicDate : ''}`;
  const result = await AJAX(url, requestOptions);
  if (result) {
    result.metalTxt = result.metal === 'XAU' ? 'Gold' : result.metal === 'XAG' ? 'Silver' : '';
    result.forex = FOREX_IMG;
  }
  return result;
};

export const getAccountUpdate = async () => {
  try {
    const result = await AJAX(`${API_URL}/stat`, requestOptions);
    return result;
  } catch (error) {
    console.log('error', error);
  }
};
