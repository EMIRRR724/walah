const canvas = document.getElementById('abersiCanvas');
const ctx = canvas.getContext('2d');

let speed = 50;  // Initial speed as a percentage of the speed of light (0.5c)
let angle = 0;  // Initial angle of light source

document.getElementById('speed').addEventListener('input', function() {
    speed = parseInt(this.value);
    document.getElementById('speedValue').textContent = (speed / 100).toFixed(2);
    angle = calculateAberrationAngle();
});

function calculateAberrationAngle() {
    const c = 300000;  // Speed of light in km/s (arbitrary)
    const v = (speed / 100) * c;
    return Math.atan(v / c);
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the light source as a yellow circle
    ctx.fillStyle = 'yellow';
    const lightX = canvas.width / 2 + Math.cos(angle) * 100;
    const lightY = canvas.height / 2 + Math.sin(angle) * 100;
    ctx.beginPath();
    ctx.arc(lightX, lightY, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw the path of the light source (dashed line)
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(lightX, lightY);
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    // Display the angle of aberration
    ctx.fillStyle = 'black';
    ctx.font = "18px Arial";
    ctx.fillText(`Sudut Aberasi: ${(angle * (180 / Math.PI)).toFixed(2)}°`, 20, 50);

    requestAnimationFrame(drawSimulation);
}

drawSimulation();
