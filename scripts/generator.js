// Import data
import { data } from './data.js';

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNickname() {
    // OPTIONS - CHANGE!!!
    const useName = true;
    const useManualName = true;
    const manualName = "박가온";
    const nameGender = "M";
    const removeSpace = true;

    // Init
    let result = ""

    // Add location
    const location = pickRandom(data.locations);
    result += `${location.name} `;

    // Add suffix
    const suffixGroup = data.suffixGroups[location.suffixGroupIndex];
    for (let i = 0; i < suffixGroup.length; i++) {
        result += `${pickRandom(suffixGroup[i])} `;
    }

    // Add manual name
    if (useName && useManualName) {
        result += manualName;
    }

    // Add random name
    if (useName && !useManualName) {
        result += pickRandom(data.familyNames);
    }

    // Space removal
    if (removeSpace) {
        result = result.replace(/\s/g, '');
    }

    // Return
    return result;
}

console.log(generateNickname());