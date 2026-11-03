const pages = Array.from(document.querySelectorAll(".page"));
const nextButtons = document.querySelectorAll("[data-next]");
const restartButton = document.getElementById("restart");

function showPage(pageId) {
  pages.forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle("active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });

  // Reset the new chapter's scroll position so it opens at the top.
  const selectedPage = document.getElementById(pageId);
  if (selectedPage) selectedPage.scrollTop = 0;
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextPage = button.dataset.next;
    if (nextPage) showPage(nextPage);
  });
});

restartButton.addEventListener("click", () => showPage("intro"));

// Simple decorative matrix-style animation for the credits screen.
const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");
const characters = "01PALAKKISHAN{}<>LOVE";
const fontSize = 14;
let columns = [];
let canvasWidth = 0;
let canvasHeight = 0;
let animationFrame;

function resizeMatrix() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth * pixelRatio;
  canvas.height = canvasHeight * pixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const columnCount = Math.ceil(canvasWidth / fontSize);
  columns = Array.from({ length: columnCount }, () =>
    Math.floor(Math.random() * (canvasHeight / fontSize))
  );
}

function drawMatrix() {
  context.fillStyle = "rgba(3, 17, 12, 0.10)";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "#65e99a";
  context.font = `${fontSize}px monospace`;

  columns.forEach((y, index) => {
    const character = characters[Math.floor(Math.random() * characters.length)];
    const x = index * fontSize;
    context.fillText(character, x, y * fontSize);

    if (y * fontSize > canvasHeight && Math.random() > 0.975) {
      columns[index] = 0;
    } else {
      columns[index] = y + 1;
    }
  });

  animationFrame = window.requestAnimationFrame(drawMatrix);
}

resizeMatrix();
drawMatrix();

window.addEventListener("resize", resizeMatrix);
window.addEventListener("pagehide", () => {
  if (animationFrame) window.cancelAnimationFrame(animationFrame);
});
