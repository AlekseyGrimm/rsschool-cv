let buttonClear = document.getElementById('clearArea');
let buttonApply = document.getElementById('checkClientRequest');
let sav = document.getElementById('save-coords');
let rep = document.getElementById('replay-coords');

let
    canv = document.getElementById('canvasPaint'),
    ctx = canv.getContext('2d'),
    coords = [];

// Canvas window size
canv.width = window.innerWidth;
canv.height = window.innerHeight;

// Clear
buttonClear.addEventListener ('click', function ()
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';  
});

let
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

//save coords
sav.addEventListener('click', function () {
    localStorage.setItem('coords', JSON.stringify(coords));
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
    };


});

//replay
rep.addEventListener('click', function (){
    let timer = setInterval(function () {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
            let crd = coords.shift(),
            
            evt = { offsetX: crd["0"], offsetY: crd["1"] };

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