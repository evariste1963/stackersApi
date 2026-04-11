import { hashPassword, verifyPassword, generateToken } from './auth.js';
import { getUserByUsername, createUser, userExists, emailExists } from './database.js';

export function registerRoutes(server) {
  server.post('/api/register', async (request) => {
    try {
      const { username, password, email } = await request.json();
      
      if (!username || !password || !email) {
        return new Response(JSON.stringify({ error: 'Username, email, and password are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (username.length < 3 || password.length < 6) {
        return new Response(JSON.stringify({ error: 'Username must be 3+ chars, password 6+ chars' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (userExists(username)) {
        return new Response(JSON.stringify({ error: 'Username already taken' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      if (emailExists(email)) {
        return new Response(JSON.stringify({ error: 'Email already registered' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const passwordHash = hashPassword(password);
      const userId = createUser(username, email, passwordHash);
      
      return new Response(JSON.stringify({ 
        message: 'User registered successfully',
        userId 
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return new Response(JSON.stringify({ error: 'Registration failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.post('/api/login', async (request) => {
    try {
      const { username, password } = await request.json();
      
      if (!username || !password) {
        return new Response(JSON.stringify({ error: 'Username and password required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const user = getUserByUsername(username);
      if (!user || !verifyPassword(password, user.password_hash)) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const token = generateToken({
        userId: user.id,
        username: user.username,
        isAdmin: !!user.is_admin
      });
      
      return new Response(JSON.stringify({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: !!user.is_admin,
          hasGoldApiKey: !!user.goldapi_key
        }
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return new Response(JSON.stringify({ error: 'Login failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  });

  server.post('/api/logout', async (request) => {
    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0'
      }
    });
  });
}
