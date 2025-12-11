// Stick Figure Avatar System
class StickFigureAvatar {
    constructor() {
        this.options = {
            hair: {
                none: { name: 'Bald', unlocked: true },
                short: { name: 'Short Hair', unlocked: true },
                spiky: { name: 'Spiky', unlocked: true },
                long: { name: 'Long Hair', unlocked: true },
                afro: { name: 'Afro', unlocked: true },
                mohawk: { name: 'Mohawk', unlocked: true }
            },
            facialHair: {
                none: { name: 'Clean Shaven', unlocked: true },
                beard: { name: 'Beard', unlocked: true },
                mustache: { name: 'Mustache', unlocked: true },
                goatee: { name: 'Goatee', unlocked: true },
                fullBeard: { name: 'Full Beard', unlocked: true }
            },
            outfit: {
                basic: { name: 'Basic', unlocked: true },
                tank: { name: 'Tank Top', unlocked: true },
                hoodie: { name: 'Hoodie', unlocked: true },
                suit: { name: 'Suit', unlocked: true },
                gripper: { name: 'Gripper Champion Jersey', unlocked: false, achievement: 'gripper90kg' }
            },
            accessory: {
                none: { name: 'None', unlocked: true },
                glasses: { name: 'Glasses', unlocked: true },
                headband: { name: 'Headband', unlocked: true },
                gripperBadge: { name: 'Gripper Badge', unlocked: false, achievement: 'gripper90kg' }
            }
        };
    }

    checkUnlocks(athlete) {
        // Unlock items based on achievements
        if (athlete.gripper90kg) {
            this.options.outfit.gripper.unlocked = true;
            this.options.accessory.gripperBadge.unlocked = true;
        }
        return this.options;
    }

    render(config, size = 100) {
        const svg = `
            <svg viewBox="0 0 100 140" width="${size}" height="${size * 1.4}" xmlns="http://www.w3.org/2000/svg">
                <!-- Head -->
                <circle cx="50" cy="25" r="15" fill="none" stroke="#2c3e50" stroke-width="2"/>
                
                <!-- Hair -->
                ${this.renderHair(config.hair)}
                
                <!-- Face -->
                <circle cx="45" cy="23" r="2" fill="#2c3e50"/> <!-- Left eye -->
                <circle cx="55" cy="23" r="2" fill="#2c3e50"/> <!-- Right eye -->
                <path d="M 45 30 Q 50 32 55 30" fill="none" stroke="#2c3e50" stroke-width="1.5"/> <!-- Smile -->
                
                <!-- Facial Hair -->
                ${this.renderFacialHair(config.facialHair)}
                
                <!-- Body -->
                <line x1="50" y1="40" x2="50" y2="80" stroke="#2c3e50" stroke-width="2"/> <!-- Torso -->
                
                <!-- Outfit -->
                ${this.renderOutfit(config.outfit)}
                
                <!-- Arms -->
                <line x1="50" y1="50" x2="30" y2="70" stroke="#2c3e50" stroke-width="2"/> <!-- Left arm -->
                <line x1="50" y1="50" x2="70" y2="70" stroke="#2c3e50" stroke-width="2"/> <!-- Right arm -->
                
                <!-- Legs -->
                <line x1="50" y1="80" x2="35" y2="115" stroke="#2c3e50" stroke-width="2"/> <!-- Left leg -->
                <line x1="50" y1="80" x2="65" y2="115" stroke="#2c3e50" stroke-width="2"/> <!-- Right leg -->
                
                <!-- Feet -->
                <line x1="35" y1="115" x2="25" y2="115" stroke="#2c3e50" stroke-width="2"/> <!-- Left foot -->
                <line x1="65" y1="115" x2="75" y2="115" stroke="#2c3e50" stroke-width="2"/> <!-- Right foot -->
                
                <!-- Accessory -->
                ${this.renderAccessory(config.accessory)}
            </svg>
        `;
        return svg;
    }

    renderHair(style) {
        switch(style) {
            case 'short':
                return `<path d="M 35 15 Q 35 10 50 10 Q 65 10 65 15" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1"/>`;
            case 'spiky':
                return `
                    <line x1="40" y1="12" x2="38" y2="5" stroke="#3d3d3d" stroke-width="2"/>
                    <line x1="50" y1="10" x2="50" y2="3" stroke="#3d3d3d" stroke-width="2"/>
                    <line x1="60" y1="12" x2="62" y2="5" stroke="#3d3d3d" stroke-width="2"/>
                `;
            case 'long':
                return `
                    <path d="M 35 15 Q 35 10 50 10 Q 65 10 65 15" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1"/>
                    <path d="M 35 15 L 32 35" stroke="#3d3d3d" stroke-width="3"/>
                    <path d="M 65 15 L 68 35" stroke="#3d3d3d" stroke-width="3"/>
                `;
            case 'afro':
                return `<circle cx="50" cy="18" r="18" fill="#3d3d3d" opacity="0.8"/>`;
            case 'mohawk':
                return `<path d="M 50 5 L 45 10 L 50 10 L 55 10 Z" fill="#ff4444" stroke="#cc0000" stroke-width="1"/>`;
            default:
                return '';
        }
    }

    renderFacialHair(style) {
        switch(style) {
            case 'beard':
                return `<path d="M 40 30 Q 50 38 60 30" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1"/>`;
            case 'mustache':
                return `<path d="M 42 28 Q 50 30 58 28" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1.5"/>`;
            case 'goatee':
                return `<path d="M 47 30 Q 50 35 53 30" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1"/>`;
            case 'fullBeard':
                return `
                    <path d="M 42 28 Q 50 30 58 28" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1.5"/>
                    <path d="M 38 28 Q 50 40 62 28" fill="#3d3d3d" stroke="#2c3e50" stroke-width="1"/>
                `;
            default:
                return '';
        }
    }

    renderOutfit(style) {
        switch(style) {
            case 'tank':
                return `
                    <rect x="42" y="42" width="16" height="25" fill="#4a90e2" stroke="#2c3e50" stroke-width="1"/>
                `;
            case 'hoodie':
                return `
                    <rect x="40" y="42" width="20" height="28" fill="#e74c3c" stroke="#2c3e50" stroke-width="1"/>
                    <circle cx="50" cy="25" r="18" fill="none" stroke="#e74c3c" stroke-width="3" opacity="0.3"/>
                `;
            case 'suit':
                return `
                    <rect x="42" y="42" width="16" height="30" fill="#34495e" stroke="#2c3e50" stroke-width="1"/>
                    <line x1="50" y1="42" x2="50" y2="72" stroke="#ecf0f1" stroke-width="2"/>
                    <rect x="48" y="42" width="4" height="4" fill="#e74c3c"/>
                `;
            case 'gripper':
                return `
                    <rect x="40" y="42" width="20" height="28" fill="#f39c12" stroke="#2c3e50" stroke-width="1"/>
                    <text x="50" y="58" font-size="12" text-anchor="middle" fill="#fff" font-weight="bold">💪</text>
                `;
            default:
                return '';
        }
    }

    renderAccessory(style) {
        switch(style) {
            case 'glasses':
                return `
                    <circle cx="45" cy="23" r="4" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
                    <circle cx="55" cy="23" r="4" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
                    <line x1="49" y1="23" x2="51" y2="23" stroke="#2c3e50" stroke-width="1.5"/>
                `;
            case 'headband':
                return `<rect x="38" y="18" width="24" height="3" fill="#e74c3c" stroke="#c0392b" stroke-width="0.5"/>`;
            case 'gripperBadge':
                return `
                    <circle cx="60" cy="55" r="5" fill="#f39c12" stroke="#d68910" stroke-width="1"/>
                    <text x="60" y="58" font-size="6" text-anchor="middle" fill="#fff">💪</text>
                `;
            default:
                return '';
        }
    }

    getDefaultConfig() {
        return {
            hair: 'short',
            facialHair: 'none',
            outfit: 'basic',
            accessory: 'none'
        };
    }
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StickFigureAvatar;
}

