window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  const togglePopUp = () => {
    const popup = document.querySelector('.popup-form'),
          popupBtn = document.querySelector('.popup-btn'),
          popupContent = document.querySelector('.full-form-container');


    popupBtn.addEventListener('click', () => {
      popup.style.display = 'block';
      const draw = (timePassed) => {
        popupContent.style.left = timePassed / 30 + 'px';
      };

      const start = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= 2000) {
            clearInterval(timer);
            return;
        }
        draw(timePassed);
      }, 20);
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('close')) {
          popup.style.display = 'none';
      } else {
        target = target.closest('.full-form-container');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopUp();
});