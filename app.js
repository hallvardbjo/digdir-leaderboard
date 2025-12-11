// Data Management
class LeaderboardApp {
    constructor() {
        this.athletes = this.loadData();
        this.editingAthleteId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
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

    loadData() {
        const data = localStorage.getItem('leaderboardData');
        return data ? JSON.parse(data) : [];
    }

    saveData() {
        localStorage.setItem('leaderboardData', JSON.stringify(this.athletes));
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

    saveAthlete() {
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
            this.showToast('Athlete added successfully!', 'success');
        }

        this.saveData();
        this.closeModal();
        this.render();
    }

    deleteAthlete(id) {
        if (confirm('Are you sure you want to delete this athlete?')) {
            this.athletes = this.athletes.filter(a => a.id !== id);
            this.saveData();
            this.render();
            this.showToast('Athlete deleted', 'success');
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
        const tbody = document.querySelector(`#${tableId} tbody`);
        tbody.innerHTML = '';

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
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <p>No athletes yet. Add your first athlete to get started!</p>
                    </td>
                </tr>
            `;
            return;
        }

        sortedAthletes.forEach((athlete, index) => {
            const rank = index + 1;
            let rankClass = '';
            if (rank === 1) rankClass = 'gold';
            else if (rank === 2) rankClass = 'silver';
            else if (rank === 3) rankClass = 'bronze';

            const value = liftType === 'total'
                ? athlete.bench + athlete.squat + athlete.deadlift
                : athlete[liftType];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="rank ${rankClass}">${this.getRankDisplay(rank)}</span></td>
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
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    if (confirm('This will replace all current data. Continue?')) {
                        this.athletes = data;
                        this.saveData();
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

