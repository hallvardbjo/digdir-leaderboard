# Project Structure

```
digdir-leaderboard/
├── index.html          # Main HTML file - the entry point
├── styles.css          # All styling and responsive design
├── app.js              # JavaScript logic and data management
├── README.md           # Comprehensive documentation
├── QUICKSTART.md       # Quick start guide for new users
├── sample-data.json    # Sample data for testing import feature
└── .gitignore          # Git ignore rules
```

## File Descriptions

### index.html
- Main application structure
- Modal form for adding/editing athletes
- Four leaderboard tables (Bench, Squat, Deadlift, Total)
- Links to CSS and JavaScript files

### styles.css
- Modern, clean design with CSS variables
- Responsive grid layout for leaderboards
- Modal and form styling
- Animations and transitions
- Mobile-friendly responsive design

### app.js
- `LeaderboardApp` class manages all functionality
- CRUD operations (Create, Read, Update, Delete)
- LocalStorage integration for data persistence
- Export/Import functionality
- Real-time leaderboard rendering and sorting

### sample-data.json
- Example data with 5 athletes
- Use for testing the import feature
- Shows the correct data format

## Architecture

**Data Flow:**
1. User interacts with UI (buttons, forms)
2. App class methods handle the logic
3. Data is saved to localStorage
4. UI is re-rendered to reflect changes

**Storage:**
- All data stored in browser's localStorage
- Key: 'leaderboardData'
- Format: JSON array of athlete objects

**Rendering:**
- Four separate leaderboards rendered independently
- Each table sorted by respective lift or total
- Rankings and medals assigned based on position

## No Dependencies!

This project uses only vanilla web technologies:
- No npm packages
- No build process
- No frameworks
- Just HTML, CSS, and JavaScript

## Future Enhancement Ideas

- Add date tracking for PRs
- Show PR history/progression
- Add more lifts (OHP, etc.)
- Add athlete photos
- Dark mode toggle
- Print functionality
- PWA support for offline use
- Social sharing features

