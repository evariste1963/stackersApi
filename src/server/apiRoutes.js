import { authMiddleware, adminMiddleware } from './middleware.js';
import { fetchMetalPrice, fetchAccountStats } from './goldapi.js';
import { getUserById, logApiUsage } from './database.js';

export function apiRoutes(server) {
  server.get('/api/metal-price', async (request) => {
    const auth = authMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const url = new URL(request.url);
      const metal = url.searchParams.get('metal') || 'XAU';
      const currency = url.searchParams.get('currency') || 'GBP';
      const date = url.searchParams.get('date') || null;
      
      const user = getUserById(auth.user.userId);
      const apiKey = user?.goldapi_key || null;
      
      const data = await fetchMetalPrice(metal, currency, date, apiKey);
      
      logApiUsage(auth.user.userId, '/api/metal-price', metal, currency);
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    } catch (error) {
      console.error('Metal price error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.get('/api/account-stats', async (request) => {
    const auth = authMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const user = getUserById(auth.user.userId);
      const apiKey = user?.goldapi_key || null;
      
      const data = await fetchAccountStats(apiKey);
      
      logApiUsage(auth.user.userId, '/api/account-stats', null, null);
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
    } catch (error) {
      console.error('Account stats error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.get('/api/user/profile', async (request) => {
    const auth = authMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const user = getUserById(auth.user.userId);
      
      return new Response(JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        defaultMetal: user.default_metal,
        defaultCurrency: user.default_currency,
        hasGoldApiKey: !!user.goldapi_key,
        isAdmin: !!user.is_admin,
        createdAt: user.created_at
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Profile error:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.post('/api/user/settings', async (request) => {
    const auth = authMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const { metal, currency, goldapiKey, goldapiSecret } = await request.json();
      const db = await import('./database.js');
      
      if (metal || currency) {
        db.updateUserSettings(auth.user.userId, { metal, currency });
      }
      
      if (goldapiKey) {
        db.updateUserGoldApiKey(auth.user.userId, goldapiKey, goldapiSecret || null);
      }
      
      return new Response(JSON.stringify({ message: 'Settings updated' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Settings error:', error);
      return new Response(JSON.stringify({ error: 'Failed to update settings' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });
}
