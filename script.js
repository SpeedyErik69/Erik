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
    if (currentLevelIndex >= levels.length) {
        const oldImage = document.getElementById("item-image");
        if (oldImage) {
            oldImage.remove();
        }
        
        // Entferne den alten Neustart-Knopf, falls vorhanden
        const oldRestartButton = document.getElementById("restart-button");
        if (oldRestartButton) {
            oldRestartButton.remove();
        }

        levelTitle.textContent = "You Win!";
        itemHealthDisplay.textContent = "All devices destroyed!";
        destroyButton.style.display = "none";

        const winImage = document.createElement("img");
        winImage.src = "win.png";
        winImage.classList.add("win-image");
        gameContainer.insertBefore(winImage, destroyButton);
        
        // HIER FÜGEN WIR DEN NEUSTART-KNOPF HINZU
        const restartButton = document.createElement("button");
        restartButton.textContent = "Neustart";
        restartButton.id = "restart-button";
        gameContainer.appendChild(restartButton);

        restartButton.addEventListener("click", () => {
            currentLevelIndex = 0; // Setzt den Level-Zähler zurück
            startLevel(); // Startet das Spiel neu
        });

        return;
    }

    // Entferne den Neustart-Knopf, falls vorhanden
    const oldRestartButton = document.getElementById("restart-button");
    if (oldRestartButton) {
        oldRestartButton.remove();
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
    
    destroyButton.style.display = "none";
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
