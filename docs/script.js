const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let offsetX = 0, offsetY = 0;
let dragging = false;
let dragStartX, dragStartY;

// 星を作る
function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 3000,
      y: Math.random() * 3000,
      radius: Math.random() * 1.5 + 0.5,
      twinkle: Math.random()
    });
  }
}

// 星を描画する
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    const twinkle = Math.sin(Date.now() * 0.002 + star.twinkle * 100) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(star.x - offsetX, star.y - offsetY, star.radius * (0.5 + twinkle), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * twinkle})`;
    ctx.fill();
  }
}

// アニメーションのループ（背景の星）
function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

// ドラッグ操作
canvas.addEventListener('mousedown', (e) => {
  dragging = true;
  dragStartX = e.clientX + offsetX;
  dragStartY = e.clientY + offsetY;
});

canvas.addEventListener('mouseup', () => {
  dragging = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    offsetX = dragStartX - e.clientX;
    offsetY = dragStartY - e.clientY;
  }
});

// 小さな星を散りばめる（背景）
createStars(1000); 
animate();

//マウスのカーソルグーにする
canvas.addEventListener('mousedown', (e) => {
    dragging = true;
    dragStartX = e.clientX + offsetX;
    dragStartY = e.clientY + offsetY;
    document.body.classList.add('dragging');
});


//マウスのカーソルパーにする
canvas.addEventListener('mouseup', () => {
    dragging = false;
    document.body.classList.remove('dragging');
});

canvas.addEventListener('mouseleave', () => {
    dragging = false;
    document.body.classList.remove('dragging');
});

// 3秒後に非表示
window.addEventListener('load', () => {
  setTimeout(() => {
    const title = document.getElementById('title');
    if (title) {
      title.style.display = 'none';
    }
  }, 3000); 
});
