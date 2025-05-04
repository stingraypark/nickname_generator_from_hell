// Import data
import { data } from './data.js';

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate nickname function
function generateNickname() {
    // OPTIONS - CHANGE!!!
    const useName = document.getElementById("useName").checked;
    const useManualName = !document.getElementById("dontUseManualName").checked;
    const manualName = document.getElementById("manualName").value;
    const randomNameSelectText = document.getElementById("nameGender").value;
    const useManualGender = !(randomNameSelectText == "MF");
    const nameGender = randomNameSelectText;
    const removeSpace = document.getElementById("removeSpace").checked;

    // Init
    let result = ""

    // Add nicknames
    let randomIconPath = "";
    const nicknameChunk = pickRandom(data.nicknameChunks);
    for (let i = 0; i < nicknameChunk.length; i++) {
        const randomChunkItem = pickRandom(nicknameChunk[i]);
        result += `${randomChunkItem[0]} `;

        if (randomChunkItem[1].length > 0) {
            randomIconPath = `../images/profile_icons/${pickRandom(randomChunkItem[1])}.svg`
        }
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
            if (!useManualGender || nameGender.includes(data.names[i].gender)) {
                names.push(data.names[i].name);
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
    const feedback = '<img src="images/icons/file.svg" class="icon">\n닉네임 복사';
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
    const feedback = '<img src="images/icons/file-check.svg" class="icon">\n닉네임 복사 완료!';
    document.getElementById("copy-btn").innerHTML = feedback;
}

document.getElementById("copy-btn").addEventListener("click", copyNickname);