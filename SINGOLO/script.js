
/*Navigation Color*/
const homeHeader = document.querySelector('#homeHeader');
const servicesHeader = document.querySelector('#servicesHeader');
const portfolioHeader = document.querySelector('#portfolioHeader');
const aboutHeader = document.querySelector('#aboutHeader');
const contactHeader = document.querySelector('#contactHeader');
const tabs = document.getElementsByClassName('tab');
const sections = document.getElementsByClassName('section');
const home = document.getElementById("homeHeader");
const services = document.getElementById("servicesHeader");
const portfolio = document.getElementById("portfolioHeader");
const about = document.getElementById("aboutHeader");
const contact = document.getElementById("contactHeader");

function resetChangeColor() {
  homeHeader.classList.remove('changeColor');
  servicesHeader.classList.remove('changeColor');
  portfolioHeader.classList.remove('changeColor');
  aboutHeader.classList.remove('changeColor');
  contactHeader.classList.remove('changeColor');

  tagAll.classList.remove('colorTag');
  tagWebDesign.classList.remove('colorTag');
  tagGraphicDesign.classList.remove('colorTag');
  tagArtWork.classList.remove('colorTag');

  body.classList.remove('active');
};

homeHeader.addEventListener('click', () => {
  resetChangeColor();
  homeHeader.classList.add('changeColor');
});

servicesHeader.addEventListener('click', () => {
  resetChangeColor();
  servicesHeader.classList.add('changeColor');
});

portfolioHeader.addEventListener('click', () => {
  resetChangeColor();
  portfolioHeader.classList.add('changeColor');
});

aboutHeader.addEventListener('click', () => {
  resetChangeColor();
  aboutHeader.classList.add('changeColor');
});

contactHeader.addEventListener('click', () => {
  resetChangeColor();
  contactHeader.classList.add('changeColor');
});


// Scroll

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= 0 && window.pageYOffset < 365) {
    home.classList.add("changeColor");
    services.classList.remove("changeColor");
    portfolio.classList.remove("changeColor");
    about.classList.remove("changeColor");
    contact.classList.remove("changeColor");
  } else if (window.pageYOffset >= 500 && window.pageYOffset < 1000) {
    services.classList.add("changeColor");
    home.classList.remove("changeColor");
    portfolio.classList.remove("changeColor");
    about.classList.remove("changeColor");
    contact.classList.remove("changeColor");
  } else if (window.pageYOffset >= 754) {
    services.classList.remove("changeColor");
    home.classList.remove("changeColor");
    portfolio.classList.add("changeColor");
    about.classList.remove("changeColor");
    contact.classList.remove("changeColor");
  } else {
    services.classList.remove("changeColor");
  }
});


//tab img

for (let i = 0; i < tabs.length; i++) {
  tabs[i].onclick = tabclick
};

const imageNodes = document.querySelectorAll('section > img');

function tabclick(event) {
  let tab = event.target;
  let tabId = tab.dataset.id;

  for (let x = 0; x < tabs.length; x++) {
    tabs[x].classList.remove('active');
  }
  this.classList.add('active');
  imageNodes.forEach(img => {
    if (img.dataset.id === tabId || tabId === 'all') {
      return img.classList.add('active')
    } else {
       return img.classList.remove('active')
    }
  });
};
















