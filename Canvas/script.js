var buttonClear = document.getElementById('clearArea');
var buttonApply = document.getElementById('checkClientRequest');
var sav = document.getElementById('save-coords');
var rep = document.getElementById('replay-coords')

var
    canv = document.getElementById('canvasPaint'),
    ctx = canv.getContext('2d');
coords = [];

// Canvas window size
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Code
buttonClear.addEventListener('click', function clears() {
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
    coords.push('mouseup');
});

sav.addEventListener('click', function () {
    localStorage.setItem('coords', JSON.stringify(coords));
    console.log('saved!');
});



rep.addEventListener('click', function () {
    console.log('replaing');
    JSON.parse(localStorage.getItem('coords'));
    
    var timer = setInterval(function () {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        var crd = coords.shift(),
            
            evt = { clientX: crd["0"], clientY: crd["1"] };

        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = bc;
        ctx.arc(evt.offsetX, evt.offsetY, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = br * 2;
        ctx.strokeStyle = bc;

        ctx.beginPath();
        ctx.moveTo(evt.offsetX, evt.offsetY);

    }, 30);
});


canv.addEventListener('mousemove', function (evt) {

    if (isMouseDown) {

        coords.push([evt.offsetX, evt.offsetY]);

        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = bc;
        ctx.arc(evt.offsetX, evt.offsetY, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = br * 2;
        ctx.strokeStyle = bc;

        ctx.beginPath();
        ctx.moveTo(evt.offsetX, evt.offsetY);
    }


});
