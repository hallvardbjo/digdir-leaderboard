# Project Structure

```
digdir-leaderboard/
├── index.html          # Main HTML file - the entry point
├── styles.css          # All styling and responsive design
├── app.js              # Frontend JavaScript logic
├── server.js           # Backend Node.js server
├── package.json        # Node.js dependencies and scripts
├── README.md           # Main documentation
├── BACKEND-SETUP.md    # Backend deployment guide
├── QUICKSTART.md       # Quick start guide for new users
├── sample-data.json    # Sample data for testing import feature
├── data/               # Data storage directory (gitignored)
│   └── leaderboard-data.json  # Persistent athlete data
└── .gitignore          # Git ignore rules
```

## File Descriptions

### Frontend Files

#### index.html
- Main application structure
- Modal form for adding/editing athletes
- Four leaderboard tables (Bench, Squat, Deadlift, Total)
- Links to CSS and JavaScript files

#### styles.css
- Modern, clean design with CSS variables
- Responsive grid layout for leaderboards
- Modal and form styling
- Animations and transitions
- Mobile-friendly responsive design

#### app.js
- `LeaderboardApp` class manages all functionality
- API communication with backend server
- CRUD operations via fetch API
- Export/Import functionality
- Real-time leaderboard rendering and sorting

### Backend Files

#### server.js
- Express.js web server
- RESTful API endpoints for athlete data
- File-based data storage
- CORS enabled for development
- Serves static frontend files

#### package.json
- Node.js project configuration
- Dependencies: express, cors
- Dev dependencies: nodemon
- Start scripts for server

#### data/leaderboard-data.json
- JSON file storing all athlete data
- Auto-created on first run
- Easy to backup and restore
- Not committed to git (in .gitignore)

### Documentation Files

#### README.md
- Comprehensive project documentation
- Quick start guide
- Deployment options
- Feature list

#### BACKEND-SETUP.md
- Detailed backend setup instructions
- Deployment guides for various platforms
- Network configuration help
- Backup and restore procedures

#### QUICKSTART.md
- Quick reference for new users
- Basic usage instructions
- Tips and tricks

#### sample-data.json
- Example data with 5 athletes
- Use for testing the import feature
- Shows the correct data format

## Architecture

**Data Flow:**
1. User interacts with UI (buttons, forms)
2. Frontend JavaScript makes API call to backend
3. Backend server updates `data/leaderboard-data.json`
4. Backend responds with success/failure
5. Frontend re-renders UI to reflect changes

**Storage:**
- All data stored in `data/leaderboard-data.json` on server
- Format: JSON array of athlete objects
- Persistent across all browsers and devices
- Shared among all users

**API Communication:**
- Frontend uses Fetch API for HTTP requests
- Backend provides RESTful endpoints
- JSON format for all data exchange
- CORS enabled for development

**Rendering:**
- Four separate leaderboards rendered independently
- Each table sorted by respective lift or total
- Rankings and medals assigned based on position
- Real-time updates when data changes

## Dependencies

**Backend:**
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `nodemon` - Auto-restart during development (dev only)

**Frontend:**
- No dependencies - vanilla JavaScript, HTML, CSS

## Future Enhancement Ideas

- Add user authentication and profiles
- Add date tracking for PRs
- Show PR history/progression over time
- Add more lifts (OHP, etc.)
- Add athlete photos/avatars
- Dark mode toggle
- Print functionality
- Real-time updates with WebSockets
- Email notifications for new records
- Leaderboard history and statistics
- PWA support for offline use
- Social sharing features
- Mobile apps (React Native/Flutter)
- Database integration (PostgreSQL, MongoDB)

