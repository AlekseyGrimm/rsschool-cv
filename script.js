
/*Navigation Color*/
  const homeHeader = document.querySelector('#homeHeader');
  const servicesHeader = document.querySelector('#servicesHeader');
  const portfolioHeader = document.querySelector('#portfolioHeader');
  const aboutHeader = document.querySelector('#aboutHeader');
  const contactHeader = document.querySelector('#contactHeader') ;


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
    const home = document.getElementById("homeHeader");
    const services = document.getElementById("servicesHeader");
    const portfolio = document.getElementById("portfolioHeader");
    const about = document.getElementById("aboutHeader");
    const contact = document.getElementById("contactHeader");
 
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

        /*Sort Images*/ 
        const imagesOne = document.querySelector('#imagesOne');
        const tagAll = document.querySelector('#tagAll');
        const tagWebDesign = document.querySelector('#tagWebDesign');
        const tagGraphicDesign = document.querySelector('#tagGraphicDesign');
        const tagArtWork = document.querySelector('#tagArtWork');

          tagAll.addEventListener('click', () => {
            resetChangeColor();
          tagAll.classList.add('colorTag');
          imagesOne.classList.toggle('changeImages');
          });

          tagWebDesign.addEventListener('click', () => {
            resetChangeColor();
            tagWebDesign.classList.add('colorTag');
            imagesOne.classList.toggle('changeImages');
          });

          tagGraphicDesign.addEventListener('click', () => {
            resetChangeColor();
            tagGraphicDesign.classList.add('colorTag');
            imagesOne.classList.toggle('changeImages');
          });

          tagArtWork.addEventListener('click', () => {
            resetChangeColor();
            tagArtWork.classList.add('colorTag');
            imagesOne.classList.toggle('changeImages');
          });




  









