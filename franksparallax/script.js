const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 5;

const IMAGES = [
  "images/layer-1.png",
  "images/layer-2.png",
  "images/layer-3.png",
  "images/layer-4.png",
  "images/layer-5.png",
];

const MODIFIERS = [0.5, 0.25, 0.2, 0.5, 0.1];

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layerCache = () => {
  let cache = [];
  let layers;
  IMAGES.map((img) => {
    let image = new Image();
    image.src = img;
    cache.push(image);
  });

  layers = cache.map((img, i) => {
    return new Layer(img, MODIFIERS[i]);
  });

  return [layers, cache];
};

let layers = layerCache()[0];
let imgCache = layerCache()[1];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  layers.forEach((layer) => {
    layer.update();
    layer.draw();
  });

  requestAnimationFrame(animate);
}

animate();
