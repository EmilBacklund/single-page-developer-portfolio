const profileImage = document.querySelector('#profileImage');
const cursor = document.querySelector('.cursor');

const rectCursor = cursor.getBoundingClientRect();
const cursorWidth = rectCursor.width;
const cursorHeight = rectCursor.height;

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const speed = 20;

profileImage.addEventListener('mousemove', (e) => {
  const rect = profileImage.getBoundingClientRect();

  targetX = e.clientX - rect.left - cursorWidth / 2;
  targetY = e.clientY - rect.top - cursorHeight / 2;
});

function animate() {
  const dx = targetX - mouseX;
  const dy = targetY - mouseY;
  const angle = Math.atan2(dy, dx);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;

  mouseX += vx;
  mouseY += vy;

  cursor.style.top = `${mouseY}px`;
  cursor.style.left = `${mouseX}px`;

  requestAnimationFrame(animate);
}

animate();
