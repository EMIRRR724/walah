const canvas = document.getElementById('kontraksiCanvas');
const ctx = canvas.getContext('2d');

let speed = 50;  // Initial speed as a percentage of the speed of light (0.5c)
let originalLength = 200;  // Original length of the object (at rest)
let contractedLength = originalLength;  // Length of the object when moving

document.getElementById('speed').addEventListener('input', function() {
    speed = parseInt(this.value);
    document.getElementById('speedValue').textContent = (speed / 100).toFixed(2);
    contractedLength = calculateLengthContraction();
});

function calculateLengthContraction() {
    const c = 300000;  // Speed of light in km/s (arbitrary)
    const v = (speed / 100) * c;
    const contractionFactor = Math.sqrt(1 - (v * v) / (c * c));
    return originalLength * contractionFactor;
}

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the contracted object
    ctx.fillStyle = 'red';
    ctx.fillRect(150, canvas.height / 2 - 20, contractedLength, 40);  // Draw the moving object with contracted length

    // Draw the original length
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, canvas.height / 2 + 50, originalLength, 40);  // Draw the object at rest

    // Display the contracted length and original length
    ctx.fillStyle = 'black';
    ctx.font = "18px Arial";
    ctx.fillText(`Panjang objek yang bergerak: ${contractedLength.toFixed(2)} px`, 20, 50);
    ctx.fillText(`Panjang objek saat diam: ${originalLength}px`, 20, 80);

    requestAnimationFrame(drawSimulation);
}

drawSimulation();
