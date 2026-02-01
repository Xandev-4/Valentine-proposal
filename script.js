// Preload the celebration image
const celebrationImg = new Image();
celebrationImg.src =
  "https://media.giphy.com/media/UVk5yzljef0kGiayL1/giphy.gif";

let yesButtonScale = 1;
let noClickCount = 0;

// Messages that appear on the "No" button
const noButtonTexts = [
  "No",
  "Really?",
  "Try again",
  "You sure?",
  "Ha ha nice try",
  "Think again",
  "Nope!",
  "Not convinced?",
  "Come on...",
  "Still no?",
  "Don't be shy",
  "Click Yes!",
  "No escape",
  "Last chance...",
  "Seriously?",
  "Pretty please?",
  "Wrong answer!",
  "Try harder",
  "Nah uh",
  "Keep trying",
  "Almost there...",
  "So close!",
  "One more try?",
  "You're stubborn!",
  "I can wait...",
  "Forever? 🥺",
  "But why not?",
  "Just say yes!",
  "This is silly",
  "Stop playing!",
  "You know you want to",
  "Give up yet?",
  "I won't stop",
  "Nice dodge!",
  "Getting tired?",
  "Final answer?",
  "Really really?",
  "OK fine... NOT!",
  "No isn't an option",
  "Yes is better ❤️",
];

// Sweet messages below
const sweetMessages = [
  "Every moment with you feels like a dream come true...",
  "Come on, you know you want to say yes! 💕",
  "The Yes button is looking pretty tempting now... 😏",
  "I promise to make you smile every day! 🥰",
  "You're making this harder than it should be! 😂",
  "Just one click on Yes, that's all I ask! 💝",
  "I've got all day, but do you? 😘",
  "Your heart knows the answer... ❤️",
  "The No button seems scared of commitment 🙈",
  "Plot twist: there's only one right answer! 💕",
];

// Create background floating hearts
function createBackgroundHearts() {
  const heartsContainer = document.querySelector(".hearts-container");
  const heartCount = 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.className = "bg-heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heartsContainer.appendChild(heart);
  }
}

// Create heart particles that follow No button
function createHeartParticle(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-particle";
  heart.innerHTML = ["💕", "💖", "💗", "💝"][Math.floor(Math.random() * 4)];
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

function sayYes() {
  document.body.innerHTML = `
    <div style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: linear-gradient(135deg, #e63946 0%, #f4a6b0 50%, #ffd7e0 100%);
      text-align: center;
      padding: 20px;">
      <h1 style="
        font-size: 52px;
        color: #fff;
        margin-bottom: 30px;
        font-weight: 700;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);">YAY! 🎉</h1>
      <img src="https://media.giphy.com/media/UVk5yzljef0kGiayL1/giphy.gif" 
           style="max-width: 400px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);"
           alt="celebration">
      <p style="
        font-size: 24px;
        color: #fff;
        margin-top: 20px;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">You just made me the happiest person alive! 💕</p>
    </div>
  `;
}

function moveNo() {
  const noButton = document.getElementById("no");
  const yesButton = document.getElementById("yes");
  const message = document.getElementById("message");

  // Get button position for heart particles BEFORE moving
  const rect = noButton.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Create heart particles at current position
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createHeartParticle(
        centerX + (Math.random() - 0.5) * 40,
        centerY + (Math.random() - 0.5) * 40,
      );
    }, i * 100);
  }

  // Increase Yes button size
  yesButtonScale += 0.15;
  yesButton.style.transform = `scale(${yesButtonScale})`;

  // Update No button text
  const textIndex = Math.min(noClickCount, noButtonTexts.length - 1);
  noButton.textContent = noButtonTexts[textIndex];

  // Update message
  const messageIndex = Math.min(noClickCount, sweetMessages.length - 1);
  message.textContent = sweetMessages[messageIndex];

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

  noClickCount++;
}

// Initialize background hearts when page loads
window.addEventListener("load", createBackgroundHearts);
