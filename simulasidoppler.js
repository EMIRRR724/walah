const canvas = document.getElementById('dopplerCanvas');
const ctx = canvas.getContext('2d');

let speed = 5;
let wavelength = 300;

document.getElementById('speed').addEventListener('input', function() {
    speed = parseFloat(this.value);
    document.getElementById('speedValue').textContent = speed;
});

document.getElementById('wavelength').addEventListener('input', function() {
    wavelength = parseInt(this.value);
    document.getElementById('wavelengthValue').textContent = wavelength;
});

let sourceX = 50;
let waveX = 50;

function drawSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw source
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(sourceX, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();

    // Draw waves
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(waveX + i * wavelength, canvas.height / 2, 20, 0, Math.PI * 2);
        ctx.strokeStyle = (i % 2 === 0) ? '#FF0000' : '#0000FF';
        ctx.stroke();
    }

    // Update positions
    sourceX += speed;
    waveX += speed;

    if (sourceX > canvas.width) sourceX = 0;
    if (waveX > canvas.width) waveX = 0;

    requestAnimationFrame(drawSimulation);
}

drawSimulation();
