// Import data
import { data } from './data.js';

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate nickname function
function generateNickname() {
    // OPTIONS - CHANGE!!!
    const useName = true; // true/false
    const useManualName = false; // true/false
    const manualName = "박가온"; // string
    const useManualGender = true; // true/false
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

    // Update
    document.getElementById("nickname-field").innerText = result;

    // Clear copy feedback
    const feedback = '<img src="images/icons/file.svg" class="icon">\n복사';
    document.getElementById("copy-btn").innerHTML = feedback;
}

document.getElementById("generate-btn").addEventListener("click", generateNickname);

generateNickname()

// Copy result function
function copyNickname() {
    // Copy to clipboard
    const nickname = document.getElementById("nickname-field").innerText;
    navigator.clipboard.writeText(nickname);
    document.getElementById("copy-btn").addEventListener("click", copyNickname);

    // Copy feedback
    const feedback = '<img src="images/icons/file-check.svg" class="icon">\n복사 완료!';
    document.getElementById("copy-btn").innerHTML = feedback;
}

document.getElementById("copy-btn").addEventListener("click", copyNickname);