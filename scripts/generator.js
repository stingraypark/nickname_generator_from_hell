// Import data
import { data } from './data.js';

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNickname() {
    // OPTIONS - CHANGE!!!
    const useName = true; // true/false
    const useManualName = false; // true/false
    const manualName = "박가온"; // string
    const useManualGender = true; // true/false
    const namefeature = ""; // CHANGE!!!!CHANGE!!!!CHANGE!!!!
    const nameGender = "M"; // F/M
    const removeSpace = true; // true/false

    // Init
    let result = ""

    // Add nicknames
    const nicknameChunk = pickRandom(data.nicknameChunks);
    for (let i = 0; i < nicknameChunk.length; i++) {
        result += `${pickRandom(nicknameChunk[i])} `;
    }

    // Add manual name
    if (useName && useManualName) {
        result += manualName;
    }

    // Add random name
    if (useName && !useManualName) {
        result += pickRandom(data.familyNames);

        let names = [];

        for (let i = 0; i < data.names.length; i++) {
            if (!useManualGender || data.names[i].gender == nameGender) {
                names.push(data.names[i].name)
            }
        }

        result += pickRandom(names);
    }

    // Space removal
    if (removeSpace) {
        result = result.replace(/\s/g, '');
    }

    // Return
    return result;
}

// TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
for (let i = 0; i < 20; i++){
    let nickname = generateNickname();
    document.getElementById("nickname-field").innerText = nickname;
}
