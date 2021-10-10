const validation = () => {
  const form = document.querySelector('.popup-form');

  const connectFormValidation = (e) => {
      const target = e.target,
          targetForm = target.closest('form');
      if (target.matches('input[name="name"]')) {
          if (!target.value.match(/^[A-Za-zА-Яа-я ]{3,15}$/)) {
              showError(target, targetForm);
          } else {
              showSuccess(target, targetForm);
          }
      }
      if (target.matches('input[name="email"]')) {
        if (!target.value.match(/^([\S]{3,15})@([A-Za-z]{4,})\.([A-Za-z]{2, })$/)) {
            showError(target, targetForm);
        } else {
            showSuccess(target, targetForm);
        }
    }
      if (target.matches('input[name="phone"]')) {
          let regex = /\d+/g;
          let matches = target.value.match(regex); 
          let resStr = matches.join('');
          console.log("количество цифр = ", resStr.length);
          if (!target.value.match(/^(\s*)?([- ]?\d{2,3}[- ]?){1, }(\s*)?$/) && resStr.length < 11) {
              showSuccess(target, targetForm);
          } else {
              showError(target, targetForm);
          }
      }
      let targetFormInputs = targetForm.querySelectorAll('input');
      targetFormInputs.forEach((item) => {
          if (item.classList.contains('error')) {
              targetForm.querySelector('button').setAttribute("disabled", "disabled");
          }
      });
  };

  const showError = (elem, targetForm) => {
      elem.classList.remove('success');
      elem.classList.add('error');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
          return;
      }
      if (elem.matches('input[name="name"]') && targetForm.querySelector('.name-error')) {
          return;
      }
      if (elem.matches('input[name="phone"]') && targetForm.querySelector('.phone-error')) {
          return;
      }
      const errorDiv = document.createElement('div');
      if (elem.matches('input[name="name"]')) {
          errorDiv.textContent = 'Проверьте правильность ввода имени';
          errorDiv.classList.add('name-error');
      } else if (elem.matches('input[name="phone"]')) {
          errorDiv.textContent = 'Номер не больше 10 цифр';
          errorDiv.classList.add('phone-error');
      } else if (elem.matches('input[type="email"]')) {
          errorDiv.textContent = 'Введен некорректный email';
      }
      errorDiv.classList.add('validator-error');
      elem.insertAdjacentElement('afterend', errorDiv);

  };

  const showSuccess = (elem, targetForm) => {
      elem.classList.remove('error');
      elem.classList.add('success');
      if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
          elem.nextElementSibling.remove();
      }
  };

  const applyStyle = () => {
      const style = document.createElement('style');
      style.textContent = `
      input.error {
        border: 2px solid red  !important;
      }

      .validator-error {
        font-size: 14px;
        font-weight: bold;
        padding-top: 10px;
        font-family: sans-serif;
        color: red;
      }
      `;

      document.head.appendChild(style);
  };
  applyStyle();

  const eventListeners = () => {
      form.addEventListener('focusout', connectFormValidation);
  };

  eventListeners();

};

validation();