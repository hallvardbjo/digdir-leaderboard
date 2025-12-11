# Dynamic Sizing for Focus Mode - Implemented

## What Changed

The leaderboard sections now **dynamically resize** based on focus state!

## How It Works

### Size Distribution

**When a lift is FOCUSED:**
- **Focused section**: Takes up **50%** of the width
- **Unfocused sections**: Each takes up **25%** of the width (split the remaining 50%)

This creates a 1:2:1 ratio (25% : 50% : 25%) when Bench is focused.

### Visual Breakdown

```
┌──────────┬────────────────────┬──────────┐
│  Squat   │   Bench (FOCUS)    │ Deadlift │
│   25%    │        50%         │   25%    │
│  List    │   Podium + List    │  List    │
└──────────┴────────────────────┴──────────┘
```

## Size Changes

### Focused Section
- **Width**: 50% of available space
- **Min-width**: 400px
- **Room for**: Podium + runner-up list
- **No hover lift**: Stays grounded when focused

### Unfocused Sections
- **Width**: 25% each
- **Min-width**: 280px
- **Displays**: Compact list view
- **Hover lift**: Still has subtle lift effect

### Podium Optimizations

To fit in the 50% width, podium elements are now more compact:

- **Athlete cards**: 120-150px (was 140-180px)
- **Podium stands**: 120px wide (was 140px)
- **Gap between spots**: 10px (was 15px)
- **Medals**: 2rem (was 2.5rem)
- **Name text**: 0.9rem (was 1rem)
- **Value text**: 1.1rem (was 1.2rem)
- **Rank numbers**: 1.5rem (was 2rem)
- **Padding**: Reduced throughout

## Layout System

Changed from **Grid** to **Flexbox**:

**Before:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
```

**After:**
```css
display: flex;
gap: 20px;
align-items: flex-start;
```

This allows dynamic sizing based on the `.focused` class!

## Responsive Behavior

### Desktop (> 768px)
- Flex layout with dynamic sizing
- Focused: 50%, Unfocused: 25% each

### Mobile/Tablet (≤ 768px)
- Stacks vertically (`flex-direction: column`)
- All sections: 100% width
- No size difference between focused/unfocused

## Benefits

✅ **Room for Podium**: Focused section has 50% width - plenty of space!
✅ **No Overflow**: Podium fits perfectly within bounds
✅ **Visual Hierarchy**: Focused lift is clearly bigger
✅ **Smooth Transitions**: All sizing changes are animated (0.5s ease)
✅ **Space Efficient**: Unfocused lifts shrink but still show all data
✅ **Responsive**: Adapts to screen size

## Technical Details

### CSS Transitions
```css
transition: all 0.5s ease;
```
All size changes animate smoothly when clicking headers!

### Flex Properties
- **Focused**: `flex: 0 1 50%`
- **Unfocused**: `flex: 0 1 25%`
- **Total tab**: `flex: 1 1 100%`

### Min-widths
- **Focused**: 400px minimum
- **Unfocused**: 280px minimum
- Ensures readability even on smaller screens

## What to Expect

**Refresh your browser** and you'll see:

1. **Bench Press** (middle) is larger (50% width)
2. **Squat & Deadlift** are smaller (25% each)
3. Podium fits perfectly in Bench's wider section
4. Click **Squat** header → Squat grows, Bench shrinks
5. Click **Deadlift** header → Deadlift grows, others shrink
6. Smooth animated transitions between states

## Total Tab

The Total tab shows only one leaderboard, so it takes **100% width** with the podium displayed prominently in the center.

Enjoy the dynamic, space-efficient layout! 🎉

