const burgerButton = document.querySelector('.header__burger');
const navigation = document.querySelector('.navigation');
const separators = document.querySelectorAll('.navigation__separator');
const navigationItems = document.querySelectorAll('.navigation__item');
const logo = document.querySelector('.header__logo');
const shadow = document.querySelector('.header__shadow');

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('header__burger--active');
  burgerButton.classList.toggle('header__burger--not-active');
  navigation.classList.toggle('navigation--mobile');
  logo.classList.toggle('header__logo--active');

  for (const element of separators) {
    element.style.display = 'none';
  }
  for (const element of navigationItems) {
    element.style.display = 'block';
  }
});

for (const element of navigationLinks) {
  element.addEventListener('click', () => {
    burgerButton.classList.remove('header__burger--active');
    burgerButton.classList.add('header__burger--not-active');
    navigation.classList.remove('navigation--mobile');
    logo.classList.remove('header__logo--active');
  });
}

const home = document.querySelector('.header');
const services = document.querySelector('.services');
const portfolio = document.querySelector('.portfolio');

const homePositionY = home.getBoundingClientRect().y + window.pageYOffset;
const servicesPositionY = services.getBoundingClientRect().y + window.pageYOffset;
const portfolioPositionY = portfolio.getBoundingClientRect().y + window.pageYOffset;

const homeLink = document.getElementById('homeId');
const servicesLink = document.getElementById('servicesId');
const portfolioLink = document.getElementById('portfolioId');

window.addEventListener('scroll', () => {
  if (window.pageYOffset >= homePositionY) {
    for (let element of navigationLinks) {
      element.classList.remove('navigation__link--active');
    }
    homeLink.classList.add('navigation__link--active');
  }
  if (window.pageYOffset >= servicesPositionY) {
    for (let element of navigationLinks) {
      element.classList.remove('navigation__link--active');
    }
    servicesLink.classList.add('navigation__link--active');
  }
  if (window.pageYOffset >= portfolioPositionY) {
    for (let element of navigationLinks) {
      element.classList.remove('navigation__link--active');
    }
    portfolioLink.classList.add('navigation__link--active');
  }
})