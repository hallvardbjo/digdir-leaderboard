# Digdir Workout Leaderboard 💪

A modern, interactive web-based leaderboard for tracking workout Personal Records (PRs) - Bench Press, Squat, and Deadlift.

## Features

- **Track Multiple Athletes**: Add and manage multiple athletes with their PRs
- **Four Leaderboards**: Separate rankings for Bench Press, Squat, Deadlift, and Combined Total
- **Persistent Storage**: Data saved to server file - works across all browsers and devices!
- **Shared Access**: Everyone on your network can access and update the same leaderboard
- **Export/Import**: Backup and restore your data with JSON export/import
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Leaderboards update instantly when you add or edit records
- **Visual Rankings**: Gold 🥇, Silver 🥈, and Bronze 🥉 medals for top 3

## Quick Start

### With Backend (Recommended - Persistent Data)

1. **Install dependencies**:
```bash
npm install
```

2. **Start the server**:
```bash
npm start
```

3. **Open your browser** and navigate to:
```
http://localhost:3000
```

**That's it!** Your data is now saved on the server and accessible from any browser.

📖 **See [BACKEND-SETUP.md](BACKEND-SETUP.md) for detailed backend documentation**

### Without Backend (Browser-Only Mode)

If you just want to try it out locally without installing Node.js:

Simply open `index.html` in your web browser. 

⚠️ Note: This mode uses browser localStorage, so data is browser-specific and not shared.

## Usage

1. **Add Athletes**: Click the "+ Add Athlete" button to add a new athlete with their PRs
2. **Edit Records**: Click "Edit" next to any athlete to update their records
3. **Delete Athletes**: Click "Delete" to remove an athlete from the leaderboard
4. **Export Data**: Download a backup of all your data as a JSON file
5. **Import Data**: Restore data from a previously exported JSON file

## Data Persistence

### With Backend Server (Default)
All data is stored in `data/leaderboard-data.json` on the server. This means:
- ✅ Works across all browsers and devices
- ✅ Shared among all users on the network
- ✅ Survives browser restarts and updates
- ✅ Easy to backup (just copy the file)
- ✅ No data loss when clearing browser cache

**Network Access:** Once the server is running, anyone on your network can access it at:
- Local: `http://localhost:3000`
- Network: `http://YOUR_IP_ADDRESS:3000`

**Data Location:** `data/leaderboard-data.json`

### Browser-Only Mode (Fallback)
If you open `index.html` directly without the server:
- ⚠️ Data stored in browser's localStorage
- ⚠️ Browser-specific (use Export/Import to transfer)
- ⚠️ Lost when clearing browser data
- ℹ️ Good for testing or personal use only

## Deployment

### Easy Cloud Deployment (Free)

#### Render.com (Recommended)
1. Push to GitHub
2. Create account at [render.com](https://render.com)
3. New → Web Service
4. Connect your repo
5. Build: `npm install`
6. Start: `npm start`
7. Deploy! 🚀

#### Railway.app
1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Auto-detects and deploys
5. Done! 🎉

### Local Network (Office)
Keep server running on one office computer:
```bash
npm start
```

Everyone access at: `http://COMPUTER_IP:3000`

**See [BACKEND-SETUP.md](BACKEND-SETUP.md) for detailed deployment options**

## Customization

### Change Weight Units
Edit `index.html` to change "kg" to "lbs" in the form labels and table headers.

### Modify Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Change main theme color */
    --success-color: #10b981;  /* Change success color */
    /* ... etc */
}
```

### Add More Lifts
To add additional exercises (e.g., Overhead Press):
1. Add the form field in `index.html`
2. Add a new leaderboard section in `index.html`
3. Update the athlete object in `app.js` to include the new lift
4. Add rendering logic for the new leaderboard

## Tech Stack

**Frontend:**
- **HTML5**: Structure
- **CSS3**: Styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Logic and interactivity
- **Fetch API**: Communication with backend

**Backend:**
- **Node.js**: Runtime environment
- **Express**: Web server framework
- **File System**: JSON file-based database

Minimal dependencies, easy to understand and maintain!

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT License - feel free to use this for your own leaderboard!

## Contributing

This is a simple project, but feel free to submit issues or pull requests if you have ideas for improvements!

