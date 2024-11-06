// Get the header elements by IDs
const skillsHeader = document.getElementById("skills-header");
const lanHeader = document.getElementById("lan-header");
const libFrameHeader = document.getElementById("lib-frame-header");
const devToolsHeader = document.getElementById("dev-tools-header");

// Package them for function use
const allElements = [skillsHeader, lanHeader, libFrameHeader, devToolsHeader];

// Get padding values to reference later
const originalPadding = getComputedStyle(skillsHeader).padding;
const originalBottomPadding = getComputedStyle(skillsHeader).paddingBottom;

// Get original font sizes to reference later
const originalFontSize = getComputedStyle(skillsHeader).fontSize;

// Expand the smaller headers on page load
expandToMatch();
// reduceFontThenExpandToMatch();

// Resize headers
window.onresize = function(event) { 
    // Doing so twice fixes a bug where a window can resize twice in rapid succession
    expandToMatch();

    // Alternative option
    // reduceFontThenExpandToMatch(); // Reduces the font sizes of the smallest header, then increases the padding to align
};

/**
 * Expand a given header to match the size of the largest one
 */
function expandToMatch() {
    resetPadding(allElements, originalPadding);
    matchLargestHeaderPadding(allElements, originalBottomPadding);
}

/**
 * Reduce the font of any header larger than the smallest header, then adjust padding to match the volume
 */
function reduceFontThenExpandToMatch() {
    reduceFontToMatch();
    expandToMatch();
}

/**
 * Reduce the font size of any header larger than the smallest until it is <= to the smallest
 */
function reduceFontToMatch() {
    resetFontSizes(allElements, originalFontSize);
    matchSmallestHeader(allElements);
}

/**
 * Increase the font size of any header smaller than the largest header until it is >= to the largest
 */
function increaseFontToMatch() {
    resetFontSizes(allElements, originalFontSize);
    matchLargestHeader(allElements);
}

/**
 * Match a given largest header in size by adding proportional padding 
 * @param {object} elements The elements that you want to match in size
 * @param {string} originalBottomPadding The original bottom padding to factor in padding math
 */
function matchLargestHeaderPadding(elements, originalBottomPadding){
    let maxHeight = getMaxHeightOfElements(elements);

    for (let element of elements) {
        element.style.padding = `${(maxHeight-getHeight(element))/2}px 0px ${(maxHeight-getHeight(element))/2 + parseInt(originalBottomPadding, 10)}px 0px`;
    }
}

/**
 * Match a given smallest header in size by reducing font sizes
 * @param {object} elements The elements that you want to match in size
 */
function matchSmallestHeader(elements) {
    let minHeight = getMinHeightOfElements(elements);
    
    for (let element of elements) {
        while (getHeight(element) > minHeight) {
            console.log(`Libraries and Frameworks height: ${getHeight(element)}`);
            element.style.fontSize = `${parseInt(getFontSize(element), 10)-1}px`;
        }
    }
}

/**
 * Match a given largest header in size by increasing font sizes
 * @param {object} elements The elements that you want to match in size
 */
function matchLargestHeader(elements) {
    let maxHeight = getMaxHeightOfElements(elements);
    
    for (let element of elements) {
        while (getHeight(element) < maxHeight) {
        // console.log(`Skills height : ${getHeight(tooSmallElement)}`);
        // console.log(`Skills fontsize : ${parseInt(getFontSize(tooSmallElement).replace(fontRegex, ""))+1}px`);
            element.style.fontSize = `${parseInt(getFontSize(element), 10)+1}px`;
        }
    }
}

/**
 * Get the height of a given element
 * @param {object} element The element you want the height of
 * @returns {int} The height of the element
 */
function getHeight(element) {
    return parseInt(element.getBoundingClientRect()["height"]);
}

/**
 * Get the font size of a given element
 * @param {object} element The element whose font size you want to get
 * @returns {string} The font size of the element
 */
function getFontSize(element) {
    console.log(typeof window.getComputedStyle(element).fontSize);
    return window.getComputedStyle(element).fontSize;
}

/**
 * Get the smallest height of an array of elements
 * @param {object} elements The array of elements that you want the smallest height of
 * @returns {int} The smallest height of an array of elements
 */
function getMinHeightOfElements(elements) {
    let minHeight = -1;

    for (let element of elements) {
        if (minHeight > getHeight(element) || minHeight == -1) {
            minHeight = getHeight(element);
        }
    }
        
    return minHeight;
}

/**
 * Get the largest height of an array of elements
 * @param {object} elements The array of elements that you want the largest height of
 * @returns {int} The largest height of an array of elements
 */
function getMaxHeightOfElements(elements) {
    let maxHeight = -1;

    for (let element of elements) {
        if (maxHeight < getHeight(element) || maxHeight == -1) {
            maxHeight = getHeight(element);
        }
    }
        
    return maxHeight;
}

/**
 * Reset the font sizes of a set of elements to what they were before JS editing
 * @param {object} elements The elements whose font should be reset
 * @param {string} originalFontSize The original font size of the headers
 */
function resetFontSizes(elements, originalFontSize) {
    for (let element of elements) {
        element.style.fontSize = originalFontSize;
    }
}

/**
 * Reset the padding of a set of elements to what they were before JS editing
 * @param {object} elements The elements whose padding you want reset
 * @param {string} elementsPadding The original padding values
 */
function resetPadding(elements, elementsPadding) {
    for (let element of elements) {
        element.style.padding = elementsPadding;
    }
}
