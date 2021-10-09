const welcomeSlider = () => {

  class SliderCarousel {
    constructor() {
      this.main = document.querySelector(`.welcome-slider-wrapper`);
      this.wrap = this.main.querySelector('.welcome-slider');
      this.slides = this.main.querySelectorAll('.welcome-slider > .slide');
      this.slidesToShow = 1;
      this.currentPosition = this.slides.length;
      this.options = {
        position: this.currentPosition,
        widthSlide: Math.floor(100 / this.slidesToShow),
        maxPosition: this.slides.length - this.slidesToShow,
      };
      this.isTransitioEnd = true;
      this.welcomeSliderNav = document.querySelector('.slider-nav');
      this.prev = this.welcomeSliderNav.querySelector('.left-arrow-button');
      this.next = this.welcomeSliderNav.querySelector('.rigth-arrow-button');
      this.sliderDots = this.welcomeSliderNav.querySelectorAll('.slide-dot');
      this.sliderCounter = this.welcomeSliderNav.querySelector('span');
      this.spaceSym = "\u00A0";
    }

    cloneItems() {
      this.slides.forEach(item => {
        item.classList.add('clone');
        this.slides[0].insertAdjacentElement('beforebegin', item.cloneNode(true));
        item.classList.remove('clone');
        this.lengthAll = this.wrap.querySelectorAll('.slide').length;
      });
    }

    controlSlider() {
      this.prev.addEventListener('click', this.prevSlide.bind(this));
      this.next.addEventListener('click', this.nextSlide.bind(this));
      this.welcomeSliderNav.addEventListener('click', this.controlSliderDots.bind(this))
    }

    controlSliderDots() {
      if (event.target.closest('li')) {
        this.sliderDots.forEach((elem, index) => {
          if (elem.classList.contains("slick-active")) {
            elem.classList.remove("slick-active")
          }
          if (elem == event.target.closest('li')) {
            this.sliderCounter.textContent = `0${index + 1}${this.spaceSym} |${this.spaceSym} 05`;
            elem.classList.add("slick-active")
            if (this.currentPosition >= 5) {
              this.currentPosition = index + 5;
              this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
            } else if (this.currentPosition < 5) {
              this.currentPosition = index + 5;
              this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
            }
          }
        });
      }
    }

    prevSlide() {
      if (this.isTransitioEnd) {
        --this.currentPosition;
        console.log("currentPosition = ", this.currentPosition);
        console.log("slide number = ", this.slides);
        this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
        this.isTransitioEnd = false;
        if (this.currentPosition >= 5) {
          this.sliderDots[(this.currentPosition - 4)].classList.remove('slick-active');
          this.sliderDots[(this.currentPosition - 5)].classList.add('slick-active');
          this.sliderCounter.textContent = `0${this.currentPosition - 4}${this.spaceSym} |${this.spaceSym} 05`;
        } else if (this.currentPosition < 4) {
          this.sliderDots[(this.currentPosition + 1)].classList.remove('slick-active');
          this.sliderDots[(this.currentPosition)].classList.add
          ('slick-active');
          this.sliderCounter.textContent = `0${this.currentPosition + 1}${this.spaceSym} |${this.spaceSym} 05`;
        } else if (this.currentPosition == 4) {
          this.sliderDots[0].classList.remove('slick-active');
          this.sliderDots[4].classList.add('slick-active');
          this.sliderCounter.textContent = `0${this.currentPosition + 1}${this.spaceSym} |${this.spaceSym} 05`;
        }
      }
    }

    nextSlide() {
      if (this.isTransitioEnd) {
        if (this.options.infinity || this.options.position < this.options.widthSlide) {
          ++this.currentPosition;
          console.log("currentPosition = ", (this.currentPosition));
          this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
          if (this.currentPosition > 5) {
            this.sliderDots[(this.currentPosition - 6)].classList.remove('slick-active');
            this.sliderDots[(this.currentPosition - 5)].classList.add('slick-active');
            this.sliderCounter.textContent = `0${this.currentPosition - 4}${this.spaceSym} |${this.spaceSym} 05`;
          } else if (this.currentPosition < 5) {
            this.sliderDots[(this.currentPosition - 1)].classList.remove('slick-active');
            this.sliderDots[(this.currentPosition)].classList.add('slick-active');
            this.sliderCounter.textContent = `0${this.currentPosition + 1}${this.spaceSym} |${this.spaceSym} 05`;
          } else if (this.currentPosition == 5) {
            this.sliderDots[4].classList.remove('slick-active');
            this.sliderDots[0].classList.add('slick-active');
            this.sliderCounter.textContent = `0${this.currentPosition - 4}${this.spaceSym} |${this.spaceSym} 05`;
          }
        }
        this.isTransitioEnd = false;
      }
    }

    addClass() {
      this.main.classList.add('welcome__slider');
      this.wrap.classList.add('welcome__slider__wrap');
      this.slides.forEach(item => {
          item.classList.add('welcome_slide');
      });
    }

    addStyle() {
      const style = document.createElement('style');
      style.id = "slider_style";
      style.textContent = `
      .welcome__slider {
          overflow: hidden !important;
      }

      @media only screen and (max-width:767px) {
          .welcome__slider {
              padding: 0px 0px !important;
          }
      }

      .welcome__slider__wrap {
          transition: transform 0.5s;
          will-change: transform !important;
          padding: 0px 0px !important;
      }

      .welcome_slide {
          flex: 0 0;
          margin: 0 auto !important;
      }
      `;

      document.head.appendChild(style);
    }

    eventListeners() {
      this.wrap.addEventListener('transitionend', () => {
        if (this.currentPosition === this.lengthAll - this.slidesToShow) {
          for (let i = 0; i < this.slides.length; i++) {
              this.wrap.append(this.wrap.children[0]);
          }
          this.currentPosition = this.slides.length - this.slidesToShow;
          this.wrap.style.transition = 'none';
          this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
          setTimeout(() => this.wrap.style.transition = '');
        }
        if (this.currentPosition === 0) {
          for (let i = 0; i < this.slides.length; i++) {
              this.wrap.prepend(this.wrap.lastElementChild);
          }
          this.currentPosition = this.slides.length;
          this.wrap.style.transition = 'none';
          this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
          setTimeout(() => this.wrap.style.transition = '');
        }
        this.isTransitioEnd = true;
      });
    }

    init() {
      this.addStyle();
      this.addClass();
      this.cloneItems();
      this.wrap.style.transform = `translateX(-${this.currentPosition * this.options.widthSlide}%)`;
      this.controlSlider();
      this.eventListeners();
    }
  }

  const carousel = new SliderCarousel();
  carousel.init();
};

welcomeSlider();