const canvas = document.getElementById('dilatasiCanvas');
const ctx = canvas.getContext('2d');

let speed = 50;  // Initial speed as a percentage of the speed of light (0.5c)

document.getElementById('speed').addEventListener('input', function() {
    speed = parseInt(this.value);
    document.getElementById('speedValue').textContent = (speed / 100).toFixed(2);
});

let timeElapsed = 0;
let movingObjectX = 50;
let stationaryObjectX = 50;

function calculateTimeDilation() {
    // Using the time dilation formula
    const c = 300000;  // Speed of light in km/s (arbitrary)
    const v = (speed / 100) * c;
    const timeDilationFactor = 1 / Math.sqrt(1 - (v * v) / (c * c));
    return timeDilationFactor;
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate time dilation factor
    const timeDilationFactor = calculateTimeDilation();

    // Draw the moving object (moving at the speed v)
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(movingObjectX, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw the stationary object
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(stationaryObjectX, canvas.height / 2 + 50, 10, 0, Math.PI * 2);
    ctx.fill();

    // Update positions of the moving object
    movingObjectX += (speed / 10);
    if (movingObjectX > canvas.width) movingObjectX = 0;

    // Show time dilation effect (display as a visual representation)
    ctx.fillStyle = 'black';
    ctx.font = "18px Arial";
    ctx.fillText(`Waktu yang dialami objek yang bergerak: ${timeElapsed.toFixed(2)} detik`, 20, 50);
    ctx.fillText(`Faktor dilatasi waktu: ${timeDilationFactor.toFixed(2)}`, 20, 80);

    // Update time elapsed based on the time dilation factor
    timeElapsed += timeDilationFactor * 0.1;  // Simulate the time passing more slowly for the moving object

    requestAnimationFrame(drawSimulation);
}

drawSimulation();
