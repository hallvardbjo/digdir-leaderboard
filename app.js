// Data Management
class LeaderboardApp {
    constructor() {
        this.athletes = [];
        this.editingAthleteId = null;
        this.apiUrl = window.location.origin + '/api/athletes';
        this.avatarSystem = new StickFigureAvatar();
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

        // Manage Athletes button
        document.getElementById('manageAthletesBtn').addEventListener('click', () => {
            this.openManageModal();
        });

        // Close manage modal
        document.querySelector('.close-manage').addEventListener('click', () => {
            this.closeManageModal();
        });

        // Add new athlete from manage modal
        document.getElementById('addNewAthleteBtn').addEventListener('click', () => {
            this.closeManageModal();
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
            const manageModal = document.getElementById('manageModal');
            if (e.target === modal) {
                this.closeModal();
            }
            if (e.target === manageModal) {
                this.closeManageModal();
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

        // Avatar customization listeners
        ['avatarHair', 'avatarFacialHair', 'avatarOutfit', 'avatarAccessory'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.updateAvatarPreview());
            }
        });

        // Gripper checkbox to unlock avatar items
        document.getElementById('gripper90kg').addEventListener('change', (e) => {
            this.toggleGripperUnlocks(e.target.checked);
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
            document.getElementById('gripper90kg').checked = athlete.gripper90kg || false;

            // Set avatar configuration
            const avatar = athlete.avatar || this.avatarSystem.getDefaultConfig();
            document.getElementById('avatarHair').value = avatar.hair;
            document.getElementById('avatarFacialHair').value = avatar.facialHair;
            document.getElementById('avatarOutfit').value = avatar.outfit;
            document.getElementById('avatarAccessory').value = avatar.accessory;

            this.toggleGripperUnlocks(athlete.gripper90kg || false);
            this.editingAthleteId = athleteId;
        } else {
            // Add mode
            modalTitle.textContent = 'Add Athlete';
            form.reset();
            const defaultAvatar = this.avatarSystem.getDefaultConfig();
            document.getElementById('avatarHair').value = defaultAvatar.hair;
            document.getElementById('avatarFacialHair').value = defaultAvatar.facialHair;
            document.getElementById('avatarOutfit').value = defaultAvatar.outfit;
            document.getElementById('avatarAccessory').value = defaultAvatar.accessory;
            this.toggleGripperUnlocks(false);
            this.editingAthleteId = null;
        }

        this.updateAvatarPreview();
        modal.style.display = 'block';
        document.getElementById('athleteName').focus();
    }

    toggleGripperUnlocks(unlocked) {
        const gripperOutfit = document.getElementById('outfitGripper');
        const gripperBadge = document.getElementById('accessoryGripperBadge');

        if (unlocked) {
            gripperOutfit.disabled = false;
            gripperOutfit.textContent = '💪 Gripper Champion Jersey';
            gripperBadge.disabled = false;
            gripperBadge.textContent = '💪 Gripper Badge';
        } else {
            gripperOutfit.disabled = true;
            gripperOutfit.textContent = '🔒 Gripper Champion Jersey';
            gripperBadge.disabled = true;
            gripperBadge.textContent = '🔒 Gripper Badge';

            // Reset to available options if locked item was selected
            const currentOutfit = document.getElementById('avatarOutfit').value;
            const currentAccessory = document.getElementById('avatarAccessory').value;
            if (currentOutfit === 'gripper') {
                document.getElementById('avatarOutfit').value = 'basic';
            }
            if (currentAccessory === 'gripperBadge') {
                document.getElementById('avatarAccessory').value = 'none';
            }
        }
        this.updateAvatarPreview();
    }

    updateAvatarPreview() {
        const config = {
            hair: document.getElementById('avatarHair').value,
            facialHair: document.getElementById('avatarFacialHair').value,
            outfit: document.getElementById('avatarOutfit').value,
            accessory: document.getElementById('avatarAccessory').value
        };

        const preview = document.getElementById('avatarPreview');
        if (preview) {
            preview.innerHTML = this.avatarSystem.render(config, 120);
        }
    }

    closeModal() {
        document.getElementById('athleteModal').style.display = 'none';
        document.getElementById('athleteForm').reset();
        this.editingAthleteId = null;
    }

    openManageModal() {
        const modal = document.getElementById('manageModal');
        modal.style.display = 'block';
        this.renderAthletesList();
    }

    closeManageModal() {
        document.getElementById('manageModal').style.display = 'none';
    }

    renderAthletesList() {
        const container = document.getElementById('athletesList');
        container.innerHTML = '';

        if (this.athletes.length === 0) {
            container.innerHTML = '<p class="empty-state">No athletes yet. Click "Add New Athlete" to get started!</p>';
            return;
        }

        // Sort by name for easier finding
        const sortedAthletes = [...this.athletes].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        sortedAthletes.forEach(athlete => {
            const athleteCard = document.createElement('div');
            athleteCard.className = 'athlete-card';

            const gripperBadge = athlete.gripper90kg
                ? '<span class="gripper-badge">💪 90kg Gripper</span>'
                : '';

            athleteCard.innerHTML = `
                <div class="athlete-card-info">
                    <h3>${this.escapeHtml(athlete.name)} ${gripperBadge}</h3>
                    <div class="athlete-stats">
                        <span>🏋️ Bench: <strong>${athlete.bench.toFixed(1)}</strong> kg</span>
                        <span>🦵 Squat: <strong>${athlete.squat.toFixed(1)}</strong> kg</span>
                        <span>💀 Deadlift: <strong>${athlete.deadlift.toFixed(1)}</strong> kg</span>
                        <span>🏆 Total: <strong>${(athlete.bench + athlete.squat + athlete.deadlift).toFixed(1)}</strong> kg</span>
                    </div>
                </div>
                <div class="athlete-card-actions">
                    <button class="btn btn-edit" onclick="app.editFromManage(${athlete.id})">Edit</button>
                    <button class="btn btn-danger" onclick="app.deleteFromManage(${athlete.id})">Delete</button>
                </div>
            `;
            container.appendChild(athleteCard);
        });
    }

    editFromManage(id) {
        this.closeManageModal();
        this.openModal(id);
    }

    async deleteFromManage(id) {
        if (confirm('Are you sure you want to delete this athlete?')) {
            this.athletes = this.athletes.filter(a => a.id !== id);
            await this.saveData();
            this.renderAthletesList();
            this.render();
            this.showToast('Athlete deleted', 'success');
        }
    }

    async saveAthlete() {
        const name = document.getElementById('athleteName').value.trim();
        const bench = parseFloat(document.getElementById('bench').value) || 0;
        const squat = parseFloat(document.getElementById('squat').value) || 0;
        const deadlift = parseFloat(document.getElementById('deadlift').value) || 0;
        const gripper90kg = document.getElementById('gripper90kg').checked;

        const avatar = {
            hair: document.getElementById('avatarHair').value,
            facialHair: document.getElementById('avatarFacialHair').value,
            outfit: document.getElementById('avatarOutfit').value,
            accessory: document.getElementById('avatarAccessory').value
        };

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
            athlete.gripper90kg = gripper90kg;
            athlete.avatar = avatar;
            await this.saveData();
            this.showToast('Athlete updated successfully!', 'success');
        } else {
            // Add new athlete
            const newAthlete = {
                id: Date.now(),
                name,
                bench,
                squat,
                deadlift,
                gripper90kg,
                avatar
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
        this.renderGripperHallOfFame();
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
                    <td colspan="3" class="empty-state">
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

            const avatarConfig = athlete.avatar || this.avatarSystem.getDefaultConfig();
            const avatarSvg = this.avatarSystem.render(avatarConfig, 80);

            podiumSpot.innerHTML = `
                <div class="podium-athlete">
                    <div class="podium-avatar">${avatarSvg}</div>
                    <div class="podium-medal">${medals[index]}</div>
                    <div class="podium-name">${this.escapeHtml(athlete.name)}</div>
                    <div class="podium-value">${value.toFixed(1)} kg</div>
                </div>
                <div class="podium-stand" style="height: ${heights[index]}">
                    <div class="podium-rank">${actualRank}</div>
                </div>
            `;
            podiumContainer.appendChild(podiumSpot);
        });

        // Insert podium after h2 header but before the table
        const header = section.querySelector('h2');
        if (header) {
            header.after(podiumContainer);
        }
    }

    renderGripperHallOfFame() {
        const container = document.getElementById('gripperHallOfFame');
        if (!container) return;

        container.innerHTML = '';

        // Get athletes who achieved the 90kg gripper
        const achievers = this.athletes.filter(a => a.gripper90kg);

        if (achievers.length === 0) {
            container.innerHTML = `
                <div class="empty-achievement">
                    <p>🏋️ No one has conquered the 90kg gripper yet!</p>
                    <p class="subtitle">Be the first to join the elite club!</p>
                </div>
            `;
            return;
        }

        // Sort alphabetically for fairness since it's binary
        const sortedAchievers = [...achievers].sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        sortedAchievers.forEach(athlete => {
            const badge = document.createElement('div');
            badge.className = 'achievement-badge';

            const avatarConfig = athlete.avatar || this.avatarSystem.getDefaultConfig();
            const avatarSvg = this.avatarSystem.render(avatarConfig, 60);

            badge.innerHTML = `
                <div class="badge-avatar">${avatarSvg}</div>
                <div class="badge-name">${this.escapeHtml(athlete.name)}</div>
                <div class="badge-subtitle">Gripper Master</div>
            `;
            container.appendChild(badge);
        });

        // Add achievement count
        const countDiv = document.createElement('div');
        countDiv.className = 'achievement-count';
        countDiv.textContent = `${achievers.length} ${achievers.length === 1 ? 'person has' : 'people have'} achieved this feat!`;
        container.appendChild(countDiv);
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

