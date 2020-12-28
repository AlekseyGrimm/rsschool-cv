const keys = document.querySelectorAll('.key');


function play(keyCode) {
	const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
	if(!audio) return;
	audio.currentTime = 0;
    audio.play();
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    key.classList.add('playing');
};

// Play drum by keyboard press
function playDrum(e) {
    play(e.keyCode)
};
window.addEventListener('keydown' , playDrum);


// Remove .playing class after transition action over
keys.forEach( key => key.addEventListener('transitionend' , removePlayingClass ) );
function removePlayingClass(e){
    if( e.propertyName != 'transform' ) return;
    this.classList.remove('playing');
};

// Play music by mouse click
keys.forEach( key => key.addEventListener('click' , playByMouse ));
function playByMouse (){
    const keyCode = this.getAttribute('data-key');
    play(keyCode);
};