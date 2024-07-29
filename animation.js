let backСolor = "#EBEFF8";
let textColor = "#344966";
let extraColor = "#B4CDEC";
let darkExtraColor = "#7D92AD";
let infoColor = "#CD8E49";
let darkInfoColor = "#E2C08B";

const checkbox = document.getElementById('dark-light');
const root = document.documentElement;
let color = getComputedStyle(root).getPropertyValue('--extra-color');
let colorText = getComputedStyle(root).getPropertyValue('--text-color');
const canvas = document.getElementById('u');
const canvasE = document.getElementById('e');
const ctx = canvas.getContext('2d');
const ctxE = canvasE.getContext('2d');

function drawCenteredText(context, text, x, y) {
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    context.fillText(text, x - textWidth / 2, y + textHeight / 2);
}

const centerX = canvas.width / 2;  // Центр квадрата по X
const centerY = canvas.height / 2;  // Центр квадрата по Y
const size = 150;     // Розмір квадрата


function drawR(){
    ctx.clearRect(0, 0, canvasE.width, canvasE.height);
    ctx.fillStyle = color;
    ctx.strokeStyle = colorText;
    ctx.beginPath();
    ctx.moveTo(centerX - size / 2, centerY);          // Ліва середина
    ctx.lineTo(centerX, centerY - size / 2);          // Верхня середина
    ctx.lineTo(centerX + size / 2, centerY);          // Права середина
    ctx.lineTo(centerX, centerY + size / 2);          // Нижня середина
    ctx.lineTo(centerX - size / 2, centerY);          // Повертаємось до початкової точки
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.font = '16px Roboto';
    ctx.fillStyle = colorText;
    drawCenteredText(ctx, 'Native', centerX, centerY);
}

let phase = 0;

function draw() {
    ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    ctxE.beginPath();
    ctxE.strokeStyle = colorText;
    ctxE.moveTo(centerX - size / 2, centerY);          // Ліва середина
    ctxE.lineTo(centerX, centerY - size / 2);          // Верхня середина
    ctxE.lineTo(centerX + size / 2, centerY);          // Права середина
    ctxE.lineTo(centerX, centerY + size / 2);          // Нижня середина
    ctxE.lineTo(centerX - size / 2, centerY);          // Повертаємось до початкової точки
    ctxE.closePath();
    ctxE.stroke();

    ctxE.clip();

    const frequency = 0.03; 
    const amplitude = 15; 

    ctxE.fillStyle = color;
    ctxE.beginPath();
    ctxE.moveTo(centerX - size / 2, centerY);

    for (let x = 0; x <= size; x++) {
        let y = Math.sin((x * frequency) + phase) * amplitude;
        ctxE.lineTo(centerX - size / 2 + x, centerY + y);
    }

    ctxE.lineTo(centerX + size / 2, centerY); 
    ctxE.lineTo(centerX, centerY + size / 2); 
    ctxE.lineTo(centerX - size / 2, centerY); 
    ctxE.closePath();
    ctxE.fill(); 

    ctxE.font = '16px Roboto';
    ctxE.fillStyle = colorText;
    drawCenteredText(ctxE, 'Intermediate', centerX, centerY);

    phase += 0.02;
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

drawR();
animate();

function changeTheme(){      

    if(checkbox.checked){
        root.style.setProperty('--back-color', textColor);
        root.style.setProperty('--text-color', backСolor);
        root.style.setProperty('--extra-color', darkExtraColor);
        root.style.setProperty('--info-color', darkInfoColor);
    }
    else{
        root.style.setProperty('--back-color', backСolor);
        root.style.setProperty('--text-color', textColor);
        root.style.setProperty('--extra-color', extraColor);      
        root.style.setProperty('--info-color', infoColor);
    }
    color = getComputedStyle(root).getPropertyValue('--extra-color');
    colorText = getComputedStyle(root).getPropertyValue('--text-color');
    drawR();
}

checkbox.addEventListener('change', changeTheme);
changeTheme();
