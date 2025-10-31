// Store constants and elements we'll need
const body = document.body;
const nameToRepeat = "nick reali";

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

// Adjust number of names based on screen size
const getOptimalNameCount = () => {
    const width = window.innerWidth;
    if (width <= 480) return 30;
    if (width <= 768) return 45;
    return 60;
};

// Adjust animation timing based on device capability
const getOptimalDelay = () => {
    return 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 100  // Slower for reduced motion preference
        : 60;  // Default speed
};

const numberOfNames = getOptimalNameCount();
const animationDelay = getOptimalDelay();

let namesAdded = 0;

/**
 * Generates a random number between a min and max value.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random number in the specified range.
 */
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Creates a single "Nick Reali" span and adds it
 * to a random spot on the page.
 */
function createAndPlaceName() {
    // 1. Create a new <span> element
    const span = document.createElement('span');
    span.textContent = nameToRepeat;
    span.classList.add('name-span');

    // 2. Generate random properties
    
    // Random position (x and y) using viewport units
    const x = getRandom(0, 100); // 0% to 100% of viewport width
    const y = getRandom(0, 100); // 0% to 100% of viewport height

    // Random rotation
    const rotation = getRandom(-90, 90); // Between -90 and +90 degrees

    // Responsive font size based on viewport
    const getResponsiveFontSize = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            return getRandom(1, 3);
        } else if (width <= 768) {
            return getRandom(1.25, 3.5);
        }
        return getRandom(1.5, 4.5);
    };
    const fontSize = getResponsiveFontSize();

    // Random color using HSL with mobile-optimized contrast
    const hue = getRandom(0, 360);
    const saturation = getRandom(80, 100); // Increased for better visibility on mobile
    const lightness = getRandom(55, 75); // Adjusted for better contrast
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Randomly select one of the defined fonts
    const randomFontIndex = Math.floor(getRandom(0, fontFamilies.length));
    const fontFamily = fontFamilies[randomFontIndex];

    // 3. Apply the random styles to the span
    span.style.left = `${x}vw`;
    span.style.top = `${y}vh`;
    span.style.fontSize = `${fontSize}rem`;
    span.style.color = color;
    // Apply the random font family
    span.style.fontFamily = fontFamily;
    // Store rotation as a CSS variable for use in both base and :hover states
    span.style.setProperty('--rotation', `${rotation}deg`);
    
    // 4. Add the new span to the page
    body.appendChild(span);
}

// Wait for the page to load before running the script
window.onload = function() {
    // This interval will run the code inside it every `animationDelay` milliseconds
    const addNameInterval = setInterval(() => {
        
        if (namesAdded < numberOfNames) {
            // If we haven't added all the names, add one...
            createAndPlaceName();
            namesAdded++; // ...and increment the counter
        } else {
            // Once all names are added, stop the interval
            clearInterval(addNameInterval);
        }

    }, animationDelay);
};

/**
 * Creates a single "Nick Reali" span and adds it
 * to a random spot on the page.
 */
function createAndPlaceName() {
    // 1. Create a new <span> element
    const span = document.createElement('span');
    span.textContent = nameToRepeat;
    span.classList.add('name-span');

    // 2. Generate random properties
    
    // Random position (x and y) using viewport units with padding to prevent overflow
    const padding = 10; // Keep names 10% away from edges
    const x = getRandom(padding, 100 - padding); // Ensure names don't overflow horizontally
    const y = getRandom(padding, 100 - padding); // Ensure names don't overflow vertically

    // Random rotation
    const rotation = getRandom(-90, 90); // Between -90 and +90 degrees

    // Responsive font size based on viewport
    const getResponsiveFontSize = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            return getRandom(1, 3);
        } else if (width <= 768) {
            return getRandom(1.25, 3.5);
        }
        return getRandom(1.5, 4.5);
    };
    const fontSize = getResponsiveFontSize();

    // Random color using HSL with mobile-optimized contrast
    const hue = getRandom(0, 360);
    const saturation = getRandom(80, 100); // Increased for better visibility on mobile
    const lightness = getRandom(55, 75); // Adjusted for better contrast
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Randomly select one of the defined fonts
    const randomFontIndex = Math.floor(getRandom(0, fontFamilies.length));
    const fontFamily = fontFamilies[randomFontIndex];

    // 3. Apply the random styles to the span
    span.style.left = `${x}vw`;
    span.style.top = `${y}vh`;
    span.style.fontSize = `${fontSize}rem`;
    span.style.color = color;
    // Apply the random font family
    span.style.fontFamily = fontFamily;
    // Store rotation as a CSS variable for use in both base and :hover states
    span.style.setProperty('--rotation', `${rotation}deg`);
    
    // 4. Add the new span to the page
    body.appendChild(span);
}

// Wait for the page to load before running the script
window.onload = function() {
    // This interval will run the code inside it every `animationDelay` milliseconds
    const addNameInterval = setInterval(() => {
        
        if (namesAdded < numberOfNames) {
            // If we haven't added all the names, add one...
            createAndPlaceName();
            namesAdded++; // ...and increment the counter
        } else {
            // Once all names are added, stop the interval
            clearInterval(addNameInterval);
        }

    }, animationDelay);
};