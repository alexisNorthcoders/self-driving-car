const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
window.addEventListener("load", function () {
  loadInputValues();
});
const inputs = document.querySelectorAll("input[type='number']");
inputs.forEach((input) => {
  input.addEventListener("change", saveInputValues);
});
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

let N = parseInt(localStorage.getItem("AIcarsNumber")) || 100;
let maxSpeed = parseInt(localStorage.getItem("maxSpeed")) || 5;
let brainMutation = parseInt(localStorage.getItem("brainMutation")) || 10;
const highScore = localStorage.getItem("highScore");

   
    if (highScore !== null) {
        
        const highScoreValue = document.getElementById("highScoreValue");
        highScoreValue.textContent = highScore
    }
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
let cars = generateCars(N, maxSpeed);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, brainMutation / 100);
    }
  }
}
let traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, "red")];

let isPause = false;
function stopAnimation(message = "PAUSED") {
  cancelAnimationFrame(animationFrameId);
  drawPause(message);
}
function drawPause(message) {
  isPause = true;
  const canvas = document.getElementById("carCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}
function showDistance() {
  const canvas = document.getElementById("carCanvas");
  const ctx = canvas.getContext("2d");
  const distance = Math.floor(Math.abs(bestCar.y)) + "m";

  ctx.fillStyle = "gray";
  ctx.rect(canvas.width / 2 - road.x, canvas.height * 0.06, 200, 50);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "48px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(distance, canvas.width / 2, canvas.height * 0.1);
}
function saveInputValues() {
  const maxSpeedInput = document.getElementById("maxSpeed");
  const AIcarsNumberInput = document.getElementById("AIcarsNumber");
  const brainMutationInput = document.getElementById("brainMutation");

  localStorage.setItem("maxSpeed", maxSpeedInput.value);
  localStorage.setItem("AIcarsNumber", AIcarsNumberInput.value);
  localStorage.setItem("brainMutation", brainMutationInput.value);
}
function loadInputValues() {
  const maxSpeedInput = document.getElementById("maxSpeed");
  const AIcarsNumberInput = document.getElementById("AIcarsNumber");
  const brainMutationInput = document.getElementById("brainMutation");

  maxSpeedInput.value = localStorage.getItem("maxSpeed") || 5;
  AIcarsNumberInput.value = localStorage.getItem("AIcarsNumber") || 100;
  brainMutationInput.value = localStorage.getItem("brainMutation") || 10;
}
function resetValues() {
  document.getElementById("maxSpeed").value = 5;
  document.getElementById("AIcarsNumber").value = 100;
  document.getElementById("brainMutation").value = 10;
  saveInputValues()
}

function spawnTrafficCar() {
  let yPos = bestCar.y - 600;
  while (traffic.length < 10) {
    for (let i = 0; i < 20; i++) {
      const randomLane = Math.floor(Math.random() * 3);
      const car = new Car(
        road.getLaneCenter(randomLane),
        yPos,
        30,
        50,
        "DUMMY",
        2,
        getRandomColour()
      );
      traffic.push(car);
      yPos -= 100;
    }
  }
}

function removeOutOfViewCars() {
  if (traffic.length !== 0)
    traffic.forEach((car) => {
      if (bestCar.y - car.y < -600) {
        traffic.shift();
      }
    });
}
let spacePressed = false 
document.addEventListener("keydown", (event) => {
  
  if (event.key === " " && !spacePressed) {
    spacePressed = true
    stopAnimation();
  } else if (event.key === " " && spacePressed) {
    animate();
    isPause = false;
    spacePressed = false
  }
});

function start() {
  location.reload();
}
function record(){
  localStorage.setItem("AIcarsNumber", 1);
  location.reload()
}
function save() {
  localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
  console.log("bestBrain saved in localStorage");
}
function discard() {
  localStorage.removeItem("bestBrain");
}
function increaseAICarSpeed() {
  Car.increaseMaxSpeed();
  console.log(bestCar.maxSpeed);
}
function decreaseAICarSpeed() {
  Car.decreaseMaxSpeed();
  console.log(bestCar.maxSpeed);
}
function generateCars(N, speed = 5) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI", speed));
  }

  return cars;
}
animate();
function animate(time) {
  if (N === 1 && bestCar.damaged) {
    const distance = Math.floor(Math.abs(bestCar.y));
    if (localStorage.getItem("highScore")) {
      const previousScore = JSON.parse(localStorage.getItem("highScore"));
      if (distance > previousScore) {
        localStorage.setItem("highScore", JSON.stringify(distance));
        stopAnimation("New HighScore!");
      } else {
        stopAnimation("Try Again!");
      }
    } else {
      localStorage.setItem("highScore", JSON.stringify(distance));
      stopAnimation("New HighScore!");
    }
    return;
  }
  removeOutOfViewCars();

  spawnTrafficCar();

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find((car) => car.y === Math.min(...cars.map((car) => car.y)));
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  carCtx.save();
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);
  road.draw(carCtx);

  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx);
  }
  carCtx.globalAlpha = 0.2;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx);
  }
  carCtx.globalAlpha = 1;
  bestCar.draw(carCtx, true);

  carCtx.restore();

  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  if (N === 1) {
    showDistance();
  }

  animationFrameId = requestAnimationFrame(animate);
}
