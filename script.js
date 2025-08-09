const levels = [
    { name: "Laptop", health: 10, image: "laptop.png" },
    { name: "TV", health: 20, image: "tv.png" },
    { name: "Mouse", health: 5, image: "mouse.png" }
];

let currentLevelIndex = 0;
let currentItemHealth;

const levelTitle = document.getElementById("level-title");
const itemHealthDisplay = document.getElementById("item-health");
const destroyButton = document.getElementById("destroy-button");
const gameContainer = document.getElementById("game-container");

function startLevel() {
    const winImage = document.querySelector(".win-image");
    if (winImage) {
        winImage.remove();
    }
    
    const oldRestartButton = document.getElementById("restart-button");
    if (oldRestartButton) {
        oldRestartButton.remove();
    }

    if (currentLevelIndex >= levels.length) {
        const oldImage = document.getElementById("item-image");
        if (oldImage) {
            oldImage.remove();
        }

        levelTitle.textContent = "You Win!";
        itemHealthDisplay.textContent = "All devices destroyed!";
        
        const newWinImage = document.createElement("img");
        newWinImage.src = "win.png";
        newWinImage.classList.add("win-image");
        gameContainer.insertBefore(newWinImage, destroyButton);
        
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.id = "restart-button";
        gameContainer.appendChild(restartButton);

        restartButton.addEventListener("click", () => {
            currentLevelIndex = 0;
            startLevel();
        });

        return;
    }
    
    const currentLevel = levels[currentLevelIndex];
    currentItemHealth = currentLevel.health;
    
    levelTitle.textContent = `Level ${currentLevelIndex + 1}: Destroy the ${currentLevel.name}`;
    itemHealthDisplay.textContent = `Health: ${currentItemHealth}`;
    
    const imageElement = document.createElement("img");
    imageElement.src = currentLevel.image;
    imageElement.id = "item-image";
    imageElement.style.cursor = "pointer";
    
    const oldImage = document.getElementById("item-image");
    if (oldImage) {
        oldImage.remove();
    }
    
    gameContainer.insertBefore(imageElement, destroyButton);
    
    imageElement.addEventListener("click", onDestroyClick);
}

function onDestroyClick() {
    currentItemHealth--;
    itemHealthDisplay.textContent = `Health: ${currentItemHealth}`;
    
    if (currentItemHealth <= 0) {
        alert("Level complete!");
        currentLevelIndex++;
        startLevel();
    }
}

startLevel();
