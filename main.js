// Improved main.js
// Store constants and elements we'll need
const body = document.body;
const nameToRepeat = 'nick reali';

// Define the list of available fonts we loaded in the <head>
const fontFamilies = [
    "'Inter', sans-serif",
    "'Roboto Mono', monospace",
    "'Playfair Display', serif",
    "'Bungee', cursive",
    "'Chakra Petch', sans-serif",
    "'Shadows Into Light', cursive",
    "'Montserrat', sans-serif",
    "'Special Elite', monospace"
];

// Utilities
const getRandom = (min, max) => Math.random() * (max - min) + min;

const getOptimalNameCount = () => {
    const width = window.innerWidth;
    if (width <= 480) return 30;
    if (width <= 768) return 45;
    return 60;
};

const getOptimalDelay = () => {
    return 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 150
        : 60;
};

let numberOfNames = getOptimalNameCount();
let animationDelay = getOptimalDelay();
let namesAdded = 0;
let animationIntervalId = null;

function getResponsiveFontSize() {
    const width = window.innerWidth;
    if (width <= 480) return getRandom(1, 3);
    if (width <= 768) return getRandom(1.25, 3.5);
    return getRandom(1.5, 4.5);
}

function createAndPlaceName() {
    const span = document.createElement('span');
    span.className = 'name-span';
    span.textContent = nameToRepeat;
    span.setAttribute('aria-hidden', 'true');
    span.setAttribute('title', nameToRepeat);

    // Padding so text doesn't overflow off edges
    const padding = 8; // percent
    const x = getRandom(padding, 100 - padding);
    const y = getRandom(padding, 100 - padding);
    const rotation = getRandom(-90, 90);
    const fontSize = getResponsiveFontSize();
    const hue = getRandom(0, 360);
    const saturation = getRandom(72, 96);
    const lightness = getRandom(52, 74);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const fontFamily = fontFamilies[Math.floor(getRandom(0, fontFamilies.length))];

    span.style.left = `${x}vw`;
    span.style.top = `${y}vh`;
    span.style.fontSize = `${fontSize}rem`;
    span.style.color = color;
    span.style.fontFamily = fontFamily;
    span.style.setProperty('--rotation', `${rotation}deg`);

    // Bring tapped element forward slightly on pointerdown, but keep it below the FAB
    span.addEventListener('pointerdown', (e) => {
        // Use a high-but-not-top z-index so the FAB (z-index:2000) remains clickable
        span.style.zIndex = 1500;
    });
    // Restore z-index after pointerup so other hover actions still work
    span.addEventListener('pointerup', () => {
        setTimeout(() => { span.style.zIndex = ''; }, 600);
    });

    body.appendChild(span);
}

function startAddingNames() {
    if (animationIntervalId) return;
    // (recompute in case of resize)
    numberOfNames = getOptimalNameCount();
    animationDelay = getOptimalDelay();
    animationIntervalId = setInterval(() => {
        if (namesAdded < numberOfNames) {
            createAndPlaceName();
            namesAdded++;
        } else {
            clearInterval(animationIntervalId);
            animationIntervalId = null;
        }
    }, animationDelay);
}

function stopAddingNames() {
    if (!animationIntervalId) return;
    clearInterval(animationIntervalId);
    animationIntervalId = null;
}

function clearNames() {
    document.querySelectorAll('.name-span').forEach(n => n.remove());
    namesAdded = 0;
}

// Wire up page controls after DOM ready
window.addEventListener('DOMContentLoaded', () => {
    // Floating action button that clears names (trash) or restarts (refresh)
    let fab = document.getElementById('fab-toggle');
    let fabIcon = document.getElementById('fab-icon');

    // SVG for refresh icon
    const refreshSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.14-3.36L23 10"></path><path d="M20.49 15a9 9 0 0 1-14.14 3.36L1 14"></path></svg>';
    const trashSVG = fabIcon ? fabIcon.outerHTML : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>';

    const setFabToTrash = () => {
        if (!fab) return;
        fab.innerHTML = trashSVG;
        fab.setAttribute('aria-label', 'Clear names');
        fab.setAttribute('title', 'Clear names');
    };

    const setFabToRefresh = () => {
        if (!fab) return;
        fab.innerHTML = refreshSVG;
        fab.setAttribute('aria-label', 'Start names');
        fab.setAttribute('title', 'Start names');
    };

    // Ensure the FAB exists. If not found (for whatever reason), create it so controls still work.
    if (!fab) {
        fab = document.createElement('button');
        fab.id = 'fab-toggle';
        fab.className = 'fab';
        document.body.appendChild(fab);
    }
    // Ensure we have the correct icon inside the FAB element reference
    fabIcon = document.getElementById('fab-icon');

    // Start animation by default
    startAddingNames();
    setFabToTrash();

    fab.addEventListener('click', () => {
        // Decide by presence of name elements rather than relying solely on the interval id.
        const hasNames = document.querySelectorAll('.name-span').length > 0;
        if (hasNames) {
            // If names exist, clear them and stop any running animation
            stopAddingNames();
            clearNames();
            setFabToRefresh();
        } else {
            // If no names present, start adding names again
            startAddingNames();
            setFabToTrash();
        }
    });

    // Recompute on resize
    window.addEventListener('resize', () => {
        numberOfNames = getOptimalNameCount();
    });
});