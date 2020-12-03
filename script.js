var buttonClear = document.getElementById('clearArea');
var buttonApply = document.getElementById('checkClientRequest');

var
    canv = document.getElementById('canvasPaint'),
    ctx = canv.getContext('2d');
coords = [];

// Canvas window size
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Code
buttonClear.addEventListener('click', function () {
    ctx.clearRect(0, 0, canv.width, canv.height);
});



var
    br = document.getElementById('clientBrushSize').value,// Brush radius
    bc = ''; // Brush color

isMouseDown = false;

buttonApply.addEventListener('click', function () {
    br = document.getElementById('clientBrushSize').value;
    bc = document.getElementById('clientColor').value;
});

document.addEventListener('mousedown', function () {
    isMouseDown = true;
});

document.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath();
});

function save() {
    localStorage.setItem('coords', JSON.stringify(coords));
}

canv.addEventListener('mousemove', function (evt) {

    if (isMouseDown) {

        console.log('x=', evt.clientX);
        console.log('y=', evt.clientY);
        coords.push([evt.offsetX, evt.offsetY]);
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.lineWidth = br * 2;
        ctx.stroke();
        ctx.strokeStyle = bc;


        ctx.beginPath();
        ctx.fillStyle = bc;
        ctx.arc(evt.clientX, evt.clientY, br, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(evt.clientX, evt.clientY);
    }


});

document.addEventListener('keypress', function (e) {
    if (evt.keyCode == 83) {
        save();
    }
}) 