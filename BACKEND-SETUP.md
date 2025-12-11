# Running the Leaderboard with Persistent Backend

## Quick Start

1. **Install dependencies** (only needed once):
```bash
npm install
```

2. **Start the server**:
```bash
npm start
```

3. **Open your browser** and go to:
```
http://localhost:3000
```

That's it! The leaderboard is now running with persistent storage.

## What Changed?

### ✅ Benefits
- **Shared Data**: Everyone on your network can access the same leaderboard
- **Persistent Storage**: Data is saved to a file on the server, not in the browser
- **No More Browser Lock-in**: Switch browsers, devices, or computers - same data!
- **Automatic Backups**: The data file can be easily backed up
- **Multi-user**: Everyone can update the leaderboard simultaneously

### 🔧 Technical Changes
- Added Node.js backend server (Express)
- Data now stored in `data/leaderboard-data.json` file
- API endpoints for CRUD operations
- Frontend updated to use fetch API instead of localStorage

## Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you make changes.

## Deployment Options

### Option 1: Local Network (Office)
Keep the server running on one computer in your office:

```bash
npm start
```

Find your computer's IP address:
```bash
# On Mac/Linux
ifconfig | grep "inet "

# On Windows
ipconfig
```

Everyone can access it at `http://YOUR_IP:3000`

### Option 2: Cloud Hosting (Free Options)

#### Render.com (Recommended - Free Tier)
1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy!

#### Railway.app (Free Tier)
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Railway auto-detects Node.js and deploys
5. Done!

#### Heroku (Free with Credit Card)
```bash
# Install Heroku CLI first
heroku create digdir-leaderboard
git push heroku main
heroku open
```

### Option 3: VPS (Your Own Server)
If you have a server:

```bash
# Install Node.js
# Clone your repo
npm install
npm install -g pm2
pm2 start server.js --name leaderboard
pm2 startup
pm2 save
```

## Data Management

### Data Location
All athlete data is stored in: `data/leaderboard-data.json`

### Manual Backup
```bash
cp data/leaderboard-data.json data/backup-$(date +%Y%m%d).json
```

### Restore from Backup
```bash
cp data/backup-YYYYMMDD.json data/leaderboard-data.json
```

### Automatic Backups (Optional)
Add to crontab for daily backups:
```bash
0 2 * * * cp /path/to/data/leaderboard-data.json /path/to/backups/backup-$(date +\%Y\%m\%d).json
```

## Environment Variables

You can customize the port:

```bash
PORT=8080 npm start
```

Or create a `.env` file:
```
PORT=8080
```

## API Endpoints

The backend provides these endpoints:

- `GET /api/athletes` - Get all athletes
- `POST /api/athletes` - Save all athletes
- `POST /api/athletes/add` - Add a single athlete
- `PUT /api/athletes/:id` - Update a single athlete
- `DELETE /api/athletes/:id` - Delete a single athlete

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
PORT=8080 npm start
```

### Can't Connect from Other Devices
1. Check firewall settings
2. Make sure server is running
3. Use correct IP address (not localhost)
4. Both devices must be on same network

### Data Not Persisting
1. Check that `data/` directory exists
2. Check file permissions
3. Look at server console for errors

## Security Notes

### For Production Use:
1. **Add Authentication**: Currently anyone can edit the leaderboard
2. **Use HTTPS**: Encrypt traffic with SSL certificate
3. **Add Rate Limiting**: Prevent abuse
4. **Validate Input**: Add more robust validation
5. **Use Environment Variables**: For sensitive config

### Quick Auth Addition (Optional)
You can add basic authentication by creating a `.env` file:
```
ADMIN_PASSWORD=your_password_here
```

Then protect write operations with a password check.

## Need Help?

- Server won't start: Check if Node.js is installed (`node --version`)
- Port conflicts: Use a different port with `PORT=8080 npm start`
- Network access: Make sure firewall allows the port
- Data issues: Check `data/leaderboard-data.json` permissions

Enjoy your persistent leaderboard! 💪

