# Tab Navigation Feature - Added

## What Changed

The leaderboard now has a **tab navigation system** that lets you switch between:
- **Main Lifts** - View Bench, Squat, and Deadlift side by side
- **Total** - Focus on the combined total leaderboard

## Benefits

✅ **Better Focus** - See only what you want to see
✅ **Less Clutter** - No more scrolling between sections  
✅ **Larger Display** - Total leaderboard gets full width when selected
✅ **Clean Layout** - More organized and professional appearance

## How to Use

1. Click **"Main Lifts"** tab to see Bench, Squat, and Deadlift
2. Click **"Total"** tab to see the combined total leaderboard
3. The active tab is highlighted with a blue underline

## Technical Implementation

### Files Modified

1. **index.html**
   - Added tab navigation buttons
   - Wrapped leaderboards in tab content sections
   - Main lifts in `lifts-tab`
   - Total in `total-tab`

2. **styles.css**
   - Tab button styling with hover effects
   - Active tab highlighting
   - Fade-in animation on tab switch
   - Total leaderboard centered and max-width when alone
   - Responsive design for mobile

3. **app.js**
   - Added `switchTab()` method
   - Tab button event listeners
   - Active state management

## UI Features

- **Active Tab**: Blue underline and text color
- **Hover Effect**: Light blue background on hover
- **Smooth Transition**: Fade-in animation when switching tabs
- **Responsive**: Works great on mobile devices
- **Centered Total**: Total leaderboard centered when in focus

## Default View

The app opens with **Main Lifts** tab active by default, showing all three lifts.

## Testing

Refresh your browser and you should see:
1. Two tabs at the top: "Main Lifts" and "Total"
2. "Main Lifts" is active by default
3. Click "Total" to see just the combined leaderboard
4. Click "Main Lifts" to return to the three-lift view

Enjoy the cleaner, more focused interface! 💪

