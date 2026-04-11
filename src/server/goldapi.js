import { config } from 'dotenv';

config();

export async function fetchMetalPrice(metal, currency, date = null, apiKey = null) {
  const key = apiKey || process.env.GOLDAPI_KEY;
  const url = date 
    ? `https://www.goldapi.io/api/${metal}/${currency}/${date}`
    : `https://www.goldapi.io/api/${metal}/${currency}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-access-token': key,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GoldAPI error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function fetchAccountStats(apiKey = null) {
  const key = apiKey || process.env.GOLDAPI_KEY;
  
  const response = await fetch('https://www.goldapi.io/api/stat', {
    method: 'GET',
    headers: {
      'x-access-token': key,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GoldAPI error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function validateApiKey(apiKey) {
  try {
    const response = await fetch('https://www.goldapi.io/api/stat', {
      method: 'GET',
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
      }
    });
    return response.ok;
  } catch {
    return false;
  }
}
