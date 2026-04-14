import { authMiddleware, adminMiddleware } from './middleware.js';
import { fetchMetalPrice, fetchAccountStats } from './goldapi.js';
import { getUserById, logApiUsage, getAllUsers, updateUserAdminStatus, getPricesByMetal, savePrice, getUserApiKey } from './database.js';

export function apiRoutes(server) {
  server.get('/api/prices', async (request) => {
    try {
      const url = new URL(request.url);
      const metal = url.searchParams.get('metal') || 'XAU';
      const prices = getPricesByMetal(metal);
      return new Response(JSON.stringify(prices), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Prices error:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch prices' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

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
      
      const apiKey = getUserApiKey(auth.user.userId);
      
      const data = await fetchMetalPrice(metal, currency, date, apiKey);
        
        logApiUsage(auth.user.userId, '/api/metal-price', metal, currency);
        
        if (data.price && data.timestamp) {
          const date = new Date(data.timestamp * 1000).toISOString().split('T')[0];
          savePrice(metal, date, data.price);
        }
        
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
      const apiKey = getUserApiKey(auth.user.userId);
      
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

  server.get('/api/admin/users', async (request) => {
    const auth = adminMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const users = getAllUsers();
      console.log('Admin users fetched:', users?.length);
      return new Response(JSON.stringify({ users }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Admin users error:', error, error.stack);
      return new Response(JSON.stringify({ error: 'Failed to fetch users: ' + error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.post('/api/admin/user', async (request) => {
    const auth = adminMiddleware(request);
    if (auth.error) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      const url = new URL(request.url);
      const userId = parseInt(url.searchParams.get('id'));
      const { isAdmin } = await request.json();
      
      if (isNaN(userId)) {
        return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      updateUserAdminStatus(userId, isAdmin ? 1 : 0);
      
      return new Response(JSON.stringify({ message: 'User updated' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Admin update error:', error);
      return new Response(JSON.stringify({ error: 'Failed to update user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });
}
