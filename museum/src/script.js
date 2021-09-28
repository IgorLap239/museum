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

  function createRipple(event) {
    const button = event.currentTarget;
  
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
  
    const ripple = button.getElementsByClassName("ripple")[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
  }
  
  const rippleButton = document.querySelector(".book-button");
  rippleButton.addEventListener("click", createRipple);
});