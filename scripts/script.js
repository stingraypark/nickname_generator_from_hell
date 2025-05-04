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
    document.getElementById("profile-img").src = randomIconPath;

    // Update profile bg color
    const randomColor = pickRandom(data.profileBackgroundColors);
    document.getElementsByClassName("profile-background")[0].style.backgroundColor = randomColor;

    // Clear copy feedback
    const copyFeedback = '<img src="images/icons/file.svg" class="icon">\n닉네임 복사';
    document.getElementById("copy-btn").innerHTML = copyFeedback;

    // Clear profile download feedback
    const profileDownloadFeedback = '<img src="images/icons/download.svg" class="icon">\n프로필 다운로드';
    document.getElementById("download-profile-btn").innerHTML = profileDownloadFeedback;
}

document.getElementById("generate-btn").addEventListener("click", generateNickname);

generateNickname()

// Copy result function
function copyNickname() {
    // Copy to clipboard
    const nickname = document.getElementById("nickname-field").innerText;
    navigator.clipboard.writeText(nickname);

    // Copy feedback
    const feedback = '<img src="images/icons/file-check.svg" class="icon">\n닉네임 복사 완료!';
    document.getElementById("copy-btn").innerHTML = feedback;
}

document.getElementById("copy-btn").addEventListener("click", copyNickname);

// Download profile function
function downloadProfile() {
    const profileFull = document.getElementById("profile-full");
    const profileImg = document.getElementById("profile-img");

    // Resize
    profileFull.style.width = "512px";
    profileFull.style.height = "512px";
    profileFull.style.borderRadius = "0px";
    profileImg.style.width = "394px";
    profileImg.style.height = "394px";

    html2canvas(profileFull).then(canvas => {
        const link = document.createElement("a");
        const nickname = document.getElementById("nickname-field").innerText;

        link.download = `${nickname}.png`;

        link.href = canvas.toDataURL("image/png");
        link.click();
    });

    // Download feedback
    const feedback = '<img src="images/icons/download.svg" class="icon">\n프로필 다운로드 완료!';
    document.getElementById("download-profile-btn").innerHTML = feedback;

    // Resize
    profileFull.style.width = "65px";
    profileFull.style.height = "65px";
    profileFull.style.borderRadius = "100%";
    profileImg.style.width = "50px";
    profileImg.style.height = "50px";
}

document.getElementById("download-profile-btn").addEventListener("click", downloadProfile);