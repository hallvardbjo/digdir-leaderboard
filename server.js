const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'leaderboard-data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory and file exist
async function ensureDataFile() {
    const dataDir = path.dirname(DATA_FILE);
    try {
        await fs.mkdir(dataDir, { recursive: true });
        try {
            await fs.access(DATA_FILE);
        } catch {
            // File doesn't exist, create it with empty array
            await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
            console.log('Created new data file');
        }
    } catch (error) {
        console.error('Error ensuring data file:', error);
    }
}

// API Routes

// Get all athletes
app.get('/api/athletes', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Save all athletes (replaces entire dataset)
app.post('/api/athletes', async (req, res) => {
    try {
        const athletes = req.body;
        await fs.writeFile(DATA_FILE, JSON.stringify(athletes, null, 2));
        res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Add a single athlete
app.post('/api/athletes/add', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const athletes = JSON.parse(data);
        const newAthlete = req.body;
        athletes.push(newAthlete);
        await fs.writeFile(DATA_FILE, JSON.stringify(athletes, null, 2));
        res.json({ success: true, athlete: newAthlete });
    } catch (error) {
        console.error('Error adding athlete:', error);
        res.status(500).json({ error: 'Failed to add athlete' });
    }
});

// Update a single athlete
app.put('/api/athletes/:id', async (req, res) => {
    try {
        const athleteId = parseInt(req.params.id);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let athletes = JSON.parse(data);
        const index = athletes.findIndex(a => a.id === athleteId);

        if (index === -1) {
            return res.status(404).json({ error: 'Athlete not found' });
        }

        athletes[index] = { ...athletes[index], ...req.body };
        await fs.writeFile(DATA_FILE, JSON.stringify(athletes, null, 2));
        res.json({ success: true, athlete: athletes[index] });
    } catch (error) {
        console.error('Error updating athlete:', error);
        res.status(500).json({ error: 'Failed to update athlete' });
    }
});

// Delete a single athlete
app.delete('/api/athletes/:id', async (req, res) => {
    try {
        const athleteId = parseInt(req.params.id);
        const data = await fs.readFile(DATA_FILE, 'utf8');
        let athletes = JSON.parse(data);
        athletes = athletes.filter(a => a.id !== athleteId);
        await fs.writeFile(DATA_FILE, JSON.stringify(athletes, null, 2));
        res.json({ success: true, message: 'Athlete deleted' });
    } catch (error) {
        console.error('Error deleting athlete:', error);
        res.status(500).json({ error: 'Failed to delete athlete' });
    }
});

// Start server
async function startServer() {
    await ensureDataFile();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 Leaderboard available at http://localhost:${PORT}`);
        console.log(`💾 Data stored in: ${DATA_FILE}`);
    });
}

startServer();

