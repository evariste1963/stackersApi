# Stackers API - Deployment Plan

## Project Overview
- **Project**: Stackers API - Precious Metals Tracker
- **Tech Stack**: Bun server, SQLite, HTML/CSS/JS frontend
- **Repository**: https://github.com/evariste1963/stackersApi

## Current Implementation Status

### Phase 1: Secure API Key Management ✅
- API key moved from client-side to server-side
- API key stored in `.env` file (not in code)
- Proxy endpoints created: `/api/metal-price`, `/api/account-stats`

### Phase 2: User Authentication System ✅
- User registration, login, logout implemented
- Passwords hashed with bcrypt (12 rounds)
- JWT-based session management
- Admin account created: username=`thisme`, password=`thisme`

### Phase 3: Per-User GoldAPI Configuration ✅
- Users can store their own GoldAPI key in settings
- Falls back to admin key if user hasn't configured one
- Settings page: `/settings.html`

### Phase 4: Route Protection ✅
- All `/api/*` endpoints protected (except auth endpoints)
- Auth middleware validates JWT tokens

### Phase 5: Frontend Updates ✅
- Login page: `/login.html`
- Register page: `/register.html`
- Settings page: `/settings.html`
- Navigation updates based on auth state
- Data caching to avoid unnecessary API calls

## File Structure

```
stackersApi/
├── server.js              # Main Bun server
├── .env                   # Environment variables (API key, JWT secret)
├── .gitignore             # Excludes node_modules, .env, *.db
├── package.json           # Dependencies
├── stackers.db            # SQLite database
├── index.html             # Main application page
├── login.html            # Login page
├── register.html         # Registration page
├── settings.html         # User settings page
├── scripts/
│   └── setup.js          # Database initialization script
└── src/
    ├── server/          # Backend modules
    │   ├── auth.js      # Password/token utilities
    │   ├── authRoutes.js # Auth API routes
    │   ├── apiRoutes.js  # Protected API routes
    │   ├── database.js   # SQLite operations
    │   ├── goldapi.js    # GoldAPI proxy
    │   └── middleware.js  # Auth middleware
    ├── js/
    │   ├── auth.js       # Client-side auth utilities
    │   ├── config.js     # Frontend configuration
    │   ├── controller.js # Main controller
    │   ├── model.js      # Data fetching (uses proxy)
    │   ├── helpers.js    # Utility functions
    │   ├── priceData.js  # Historical price data
    │   └── views/        # View components
    └── css/
        ├── main.css
        ├── page.css      # Auth page styles
        ├── modal.css
        └── spinner.css
```

## API Endpoints

### Public Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User authentication

### Protected Endpoints (require JWT token)
- `POST /api/logout` - End session
- `GET /api/metal-price?metal=XAU&currency=GBP` - Fetch metal price
- `GET /api/account-stats` - Fetch GoldAPI usage stats
- `GET /api/user/profile` - Get user profile
- `POST /api/user/settings` - Update user settings

## Environment Variables (.env)

```env
GOLDAPI_KEY=goldapi-xxxxx      # Admin GoldAPI key
JWT_SECRET=your-secret-key      # JWT signing secret
PORT=3000                       # Server port
NODE_ENV=development            # Environment
```

## Running the Application

```bash
# Install dependencies
bun install

# Initialize database and admin user
bun run scripts/setup.js

# Start development server
bun run dev

# Or
bun run server.js
```

## Deployment Checklist

### Pre-Deployment
- [ ] Change JWT_SECRET in production
- [ ] Set NODE_ENV=production
- [ ] Use strong GoldAPI key
- [ ] Enable HTTPS
- [ ] Set secure cookie flags

### Recommended Hosting Options
1. **Railway** - Simple Node.js/Bun deployment
2. **Render** - Managed hosting with auto-deploy
3. **VPS** - Full control with PM2/systemd
4. **Bun Deploy** - If using Bun's hosting

### Security Considerations
- [ ] Enable HTTPS
- [ ] Set secure HttpOnly cookies
- [ ] Add rate limiting
- [ ] Add CORS restrictions
- [ ] Implement CSRF protection
- [ ] Regular dependency updates

## Future Enhancements
- Password reset functionality
- Email verification
- User-specific metal/currency preferences
- Historical data charts
- Mobile responsive design
- API rate limiting per user
