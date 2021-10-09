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
      if (target.matches('input[name="phone"]')) {
          if ((target.value[0] !== '+' && target.value.length === 7) || (target.value[0] !== '+' && target.value.length === 11) || (target.value[0] === '+' && target.value.length === 12)) {
              showSuccess(target, targetForm);
              targetForm.querySelector('button').removeAttribute("disabled");
              targetForm.querySelector('button').style.display = 'inline-block';
          } else {
              showError(target, targetForm);
              targetForm.querySelector('button').setAttribute("disabled", "disabled");
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
          errorDiv.textContent = 'Длина от 3 до 15 символов. Допустимые сиволы: буквы(рус./англ.) и пробел';
          errorDiv.classList.add('name-error');
      } else if (elem.matches('input[name="phone"]')) {
          errorDiv.textContent = 'Введите номер длинной от 7 до 13 цифр';
          errorDiv.classList.add('phone-error');
      } else if (elem.matches('input[type="checkbox"]')) {
          errorDiv.textContent = 'Для отправки формы отметьте согласие на обработку персональных данных';
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
      if (targetForm === bannerForm) {
          if (elem.matches('input[name="name"]')) {
              targetForm.querySelector('.name-error').remove();
          } else if (elem.matches('input[name="phone"]')) {
              targetForm.querySelector('.phone-error').remove();
          }
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