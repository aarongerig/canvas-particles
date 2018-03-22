const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Context
const c = canvas.getContext('2d');

// Events
const mouse = {
  x: undefined,
  y: undefined
};

const colorArray = [
  '#2C3E50',
  '#E74C3C',
  '#ECF0F1',
  '#3498DB',
  '#2980B9',
];

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Circle
class Circle {

  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 40;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < this.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }

}

let circleArray = [];

// Init
const init = () => {
  circleArray = [];

  for (let i = 0; i < 1200; i++) {
    const radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};

// Animate
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (const circle of circleArray) {
    circle.update();
  }
};

init();
animate();
