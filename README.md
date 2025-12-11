# Digdir Workout Leaderboard 💪

A modern, interactive web-based leaderboard for tracking workout Personal Records (PRs) - Bench Press, Squat, and Deadlift.

## Features

- **Track Multiple Athletes**: Add and manage multiple athletes with their PRs
- **Four Leaderboards**: Separate rankings for Bench Press, Squat, Deadlift, and Combined Total
- **Local Storage**: All data is saved in your browser's local storage
- **Export/Import**: Backup and restore your data with JSON export/import
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Leaderboards update instantly when you add or edit records
- **Visual Rankings**: Gold 🥇, Silver 🥈, and Bronze 🥉 medals for top 3

## Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser. That's it!

### Option 2: Use a Local Server
For a better development experience:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js (install http-server globally first)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

1. **Add Athletes**: Click the "+ Add Athlete" button to add a new athlete with their PRs
2. **Edit Records**: Click "Edit" next to any athlete to update their records
3. **Delete Athletes**: Click "Delete" to remove an athlete from the leaderboard
4. **Export Data**: Download a backup of all your data as a JSON file
5. **Import Data**: Restore data from a previously exported JSON file

## Data Persistence

All data is stored locally in your browser using localStorage. This means:
- ✅ No server required
- ✅ Works offline
- ✅ Private - your data never leaves your browser
- ⚠️ Data is browser-specific (use Export/Import to transfer between browsers)
- ⚠️ Clearing browser data will erase the leaderboard (make backups!)

## Deployment

### GitHub Pages
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select the branch to deploy (usually `main`)
4. Your leaderboard will be live at `https://yourusername.github.io/digdir-leaderboard`

### Netlify
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments

### Vercel
```bash
npm install -g vercel
vercel
```

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

- **HTML5**: Structure
- **CSS3**: Styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: Logic and interactivity
- **LocalStorage API**: Data persistence

No frameworks, no build tools, no dependencies. Just modern web standards!

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

