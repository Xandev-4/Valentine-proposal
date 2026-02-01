// Preload the celebration image
const celebrationImg = new Image();
celebrationImg.src =
  "https://media.giphy.com/media/UVk5yzljef0kGiayL1/giphy.gif";

let yesButtonScale = 1;
let noClickCount = 0;

function sayYes() {
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: linear-gradient(135deg, #f5e6e8 0%, #d5c6e0 100%);
      text-align: center;
      padding: 20px;">
      <h1 style="
        font-size: 48px;
        color: #ff6b9d;
        margin-bottom: 30px;
        font-weight: 700;">YAY! 🎉</h1>
      <img src="https://media.giphy.com/media/UVk5yzljef0kGiayL1/giphy.gif" 
           style="max-width: 400px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"
           alt="celebration">
      <p style="
        font-size: 20px;
        color: #333;
        margin-top: 20px;
        font-weight: 500;">You just made me the happiest! 💕</p>
    </div>
  `;
}

function moveNo() {
  const noButton = document.getElementById("no");
  const yesButton = document.getElementById("yes");
  const hint = document.getElementById("hint");
  const container = document.querySelector(".container");

  // Increase Yes button size
  yesButtonScale += 0.15;
  yesButton.style.transform = `scale(${yesButtonScale})`;

  // Add moved class to change position type
  noButton.classList.add("moved");

  // Get Yes button boundaries to avoid overlap
  const yesRect = yesButton.getBoundingClientRect();
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  let randomX, randomY;
  let attempts = 0;
  const maxAttempts = 20;

  // Keep trying until we find a position that doesn't overlap with Yes button
  do {
    randomX = Math.max(
      20,
      Math.random() * (window.innerWidth - buttonWidth - 20),
    );
    randomY = Math.max(
      20,
      Math.random() * (window.innerHeight - buttonHeight - 20),
    );

    // Check if new position overlaps with Yes button
    const wouldOverlap =
      randomX < yesRect.right + 50 &&
      randomX + buttonWidth > yesRect.left - 50 &&
      randomY < yesRect.bottom + 50 &&
      randomY + buttonHeight > yesRect.top - 50;

    if (!wouldOverlap) break;
    attempts++;
  } while (attempts < maxAttempts);

  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";

  // Update hint text
  noClickCount++;
  const hints = [
    '"No" seems a bit shy 🙈',
    "Are you sure about that? 🤔",
    'The "Yes" button is looking pretty good now... 😏',
    "Come on, you know you want to click Yes 💕",
    "Just click Yes already! 😂",
  ];

  if (noClickCount < hints.length) {
    hint.textContent = hints[noClickCount - 1];
  } else {
    hint.textContent = hints[hints.length - 1];
  }
}
