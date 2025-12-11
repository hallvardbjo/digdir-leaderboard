// Data Management
class LeaderboardApp {
    constructor() {
        this.athletes = [];
        this.editingAthleteId = null;
        this.apiUrl = window.location.origin + '/api/athletes';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadData();
        this.render();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Lift header clicks for focus mode
        document.querySelectorAll('.lift-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const liftType = e.target.dataset.lift;
                this.focusLift(liftType);
            });
        });

        // Add athlete button
        document.getElementById('addAthleteBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Modal close button
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // Form submission
        document.getElementById('athleteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveAthlete();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('athleteModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Import button
        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e);
        });
    }

    async loadData() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Failed to load data');
            this.athletes = await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showToast('Failed to load data from server', 'error');
            this.athletes = [];
        }
    }

    async saveData() {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.athletes)
            });
            if (!response.ok) throw new Error('Failed to save data');
        } catch (error) {
            console.error('Error saving data:', error);
            this.showToast('Failed to save data to server', 'error');
        }
    }

    openModal(athleteId = null) {
        const modal = document.getElementById('athleteModal');
        const form = document.getElementById('athleteForm');
        const modalTitle = document.getElementById('modalTitle');

        if (athleteId !== null) {
            // Edit mode
            const athlete = this.athletes.find(a => a.id === athleteId);
            modalTitle.textContent = 'Edit Athlete';
            document.getElementById('athleteName').value = athlete.name;
            document.getElementById('bench').value = athlete.bench;
            document.getElementById('squat').value = athlete.squat;
            document.getElementById('deadlift').value = athlete.deadlift;
            this.editingAthleteId = athleteId;
        } else {
            // Add mode
            modalTitle.textContent = 'Add Athlete';
            form.reset();
            this.editingAthleteId = null;
        }

        modal.style.display = 'block';
        document.getElementById('athleteName').focus();
    }

    closeModal() {
        document.getElementById('athleteModal').style.display = 'none';
        document.getElementById('athleteForm').reset();
        this.editingAthleteId = null;
    }

    async saveAthlete() {
        const name = document.getElementById('athleteName').value.trim();
        const bench = parseFloat(document.getElementById('bench').value) || 0;
        const squat = parseFloat(document.getElementById('squat').value) || 0;
        const deadlift = parseFloat(document.getElementById('deadlift').value) || 0;

        if (!name) {
            this.showToast('Please enter a name', 'error');
            return;
        }

        if (this.editingAthleteId !== null) {
            // Update existing athlete
            const athlete = this.athletes.find(a => a.id === this.editingAthleteId);
            athlete.name = name;
            athlete.bench = bench;
            athlete.squat = squat;
            athlete.deadlift = deadlift;
            await this.saveData();
            this.showToast('Athlete updated successfully!', 'success');
        } else {
            // Add new athlete
            const newAthlete = {
                id: Date.now(),
                name,
                bench,
                squat,
                deadlift
            };
            this.athletes.push(newAthlete);
            await this.saveData();
            this.showToast('Athlete added successfully!', 'success');
        }

        this.closeModal();
        this.render();
    }

    async deleteAthlete(id) {
        if (confirm('Are you sure you want to delete this athlete?')) {
            this.athletes = this.athletes.filter(a => a.id !== id);
            await this.saveData();
            this.render();
            this.showToast('Athlete deleted', 'success');
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    focusLift(liftType) {
        // Only apply to main lifts tab, not total
        const mainLiftsTab = document.getElementById('lifts-tab');
        if (!mainLiftsTab.classList.contains('active')) return;

        // Remove focus from all lifts in main tab
        mainLiftsTab.querySelectorAll('.leaderboard-section').forEach(section => {
            section.classList.remove('focused');
        });

        // Add focus to clicked lift
        const targetSection = mainLiftsTab.querySelector(`[data-lift="${liftType}"]`);
        if (targetSection) {
            targetSection.classList.add('focused');
            // Re-render to show/hide podium
            this.render();
        }
    }

    render() {
        this.renderLeaderboard('bench');
        this.renderLeaderboard('squat');
        this.renderLeaderboard('deadlift');
        this.renderLeaderboard('total');
    }

    renderLeaderboard(liftType) {
        const tableId = liftType + 'Table';
        const section = document.querySelector(`#${tableId}`).closest('.leaderboard-section');

        let sortedAthletes;
        if (liftType === 'total') {
            sortedAthletes = [...this.athletes].sort((a, b) => {
                const totalA = a.bench + a.squat + a.deadlift;
                const totalB = b.bench + b.squat + b.deadlift;
                return totalB - totalA;
            });
        } else {
            sortedAthletes = [...this.athletes].sort((a, b) => b[liftType] - a[liftType]);
        }

        if (sortedAthletes.length === 0) {
            // Remove any existing podium
            const existingPodium = section.querySelector('.podium-container');
            if (existingPodium) existingPodium.remove();

            const tbody = document.querySelector(`#${tableId} tbody`);
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <p>No athletes yet. Add your first athlete to get started!</p>
                    </td>
                </tr>
            `;
            return;
        }

        // Check if this section should show podium (focused or total)
        const shouldShowPodium = section.classList.contains('focused');

        if (shouldShowPodium) {
            // Get top 3 and rest
            const top3 = sortedAthletes.slice(0, 3);
            const rest = sortedAthletes.slice(3);

            // Render podium for top 3
            this.renderPodium(section, top3, liftType);

            // Render table for rest
            const tbody = document.querySelector(`#${tableId} tbody`);
            tbody.innerHTML = '';

            // Always show table header
            const thead = document.querySelector(`#${tableId} thead`);
            if (thead) thead.style.display = '';

            rest.forEach((athlete, index) => {
                const rank = index + 4; // Starts at 4th place
                const value = liftType === 'total'
                    ? athlete.bench + athlete.squat + athlete.deadlift
                    : athlete[liftType];

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="rank">${rank}</span></td>
                    <td><span class="athlete-name">${this.escapeHtml(athlete.name)}</span></td>
                    <td><span class="pr-value">${value.toFixed(1)}</span></td>
                    <td class="actions">
                        <button class="btn btn-edit" onclick="app.openModal(${athlete.id})">Edit</button>
                        <button class="btn btn-danger" onclick="app.deleteAthlete(${athlete.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            // Remove podium if exists
            const existingPodium = section.querySelector('.podium-container');
            if (existingPodium) existingPodium.remove();

            // Show all athletes in table format
            const tbody = document.querySelector(`#${tableId} tbody`);
            tbody.innerHTML = '';

            const thead = document.querySelector(`#${tableId} thead`);
            if (thead) thead.style.display = '';

            sortedAthletes.forEach((athlete, index) => {
                const rank = index + 1;
                const value = liftType === 'total'
                    ? athlete.bench + athlete.squat + athlete.deadlift
                    : athlete[liftType];

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><span class="rank">${this.getRankDisplay(rank)}</span></td>
                    <td><span class="athlete-name">${this.escapeHtml(athlete.name)}</span></td>
                    <td><span class="pr-value">${value.toFixed(1)}</span></td>
                    <td class="actions">
                        <button class="btn btn-edit" onclick="app.openModal(${athlete.id})">Edit</button>
                        <button class="btn btn-danger" onclick="app.deleteAthlete(${athlete.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    renderPodium(section, top3, liftType) {
        // Remove existing podium if any
        const existingPodium = section.querySelector('.podium-container');
        if (existingPodium) existingPodium.remove();

        if (top3.length === 0) return;

        // Create podium container
        const podiumContainer = document.createElement('div');
        podiumContainer.className = 'podium-container';

        // Order for podium display: 2nd, 1st, 3rd (visual order)
        const podiumOrder = [
            top3[1], // 2nd place
            top3[0], // 1st place
            top3[2]  // 3rd place
        ].filter(athlete => athlete); // Remove undefined if less than 3 athletes

        const positions = ['second', 'first', 'third'];
        const medals = ['🥈', '🥇', '🥉'];
        const heights = ['140px', '180px', '120px'];

        podiumOrder.forEach((athlete, index) => {
            if (!athlete) return;

            const actualRank = positions[index] === 'first' ? 1 : positions[index] === 'second' ? 2 : 3;
            const value = liftType === 'total'
                ? athlete.bench + athlete.squat + athlete.deadlift
                : athlete[liftType];

            const podiumSpot = document.createElement('div');
            podiumSpot.className = `podium-spot ${positions[index]}`;
            podiumSpot.innerHTML = `
                <div class="podium-athlete">
                    <div class="podium-medal">${medals[index]}</div>
                    <div class="podium-name">${this.escapeHtml(athlete.name)}</div>
                    <div class="podium-value">${value.toFixed(1)} kg</div>
                    <div class="podium-actions">
                        <button class="btn btn-edit btn-small" onclick="app.openModal(${athlete.id})">Edit</button>
                        <button class="btn btn-danger btn-small" onclick="app.deleteAthlete(${athlete.id})">Del</button>
                    </div>
                </div>
                <div class="podium-stand" style="height: ${heights[index]}">
                    <div class="podium-rank">${actualRank}</div>
                </div>
            `;
            podiumContainer.appendChild(podiumSpot);
        });

        // Insert podium after sort controls but before the table
        const sortControls = section.querySelector('.sort-controls');
        if (sortControls) {
            sortControls.after(podiumContainer);
        }
    }

    getRankDisplay(rank) {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return rank;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    exportData() {
        const dataStr = JSON.stringify(this.athletes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `leaderboard-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.showToast('Data exported successfully!', 'success');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    if (confirm('This will replace all current data. Continue?')) {
                        this.athletes = data;
                        await this.saveData();
                        this.render();
                        this.showToast('Data imported successfully!', 'success');
                    }
                } else {
                    this.showToast('Invalid data format', 'error');
                }
            } catch (error) {
                this.showToast('Error reading file', 'error');
            }
            event.target.value = '';
        };
        reader.readAsText(file);
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new LeaderboardApp();
});

