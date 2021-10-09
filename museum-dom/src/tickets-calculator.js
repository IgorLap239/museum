const calculator = () => {

  const ticketsSectionForm = document.querySelector('.tickets-section .tickets-form'),
      ticketTypes = ticketsSectionForm.querySelectorAll('.radio-input'),
      basicInput = ticketsSectionForm.querySelector('.basic'),
      seniorInput = ticketsSectionForm.querySelector('.senior'),
      totalPrice = ticketsSectionForm.querySelector('.total-price');


  const ticketTypeSelect = () => {
      let typeNumber = 0;
      ticketTypes.forEach((item, index) => {
          if (item.checked) {
            typeNumber = index;
          }
      });
      return typeNumber;
  };

  const countSum = () => {
    let typeNumber = ticketTypeSelect(),
        factor = 0;
        basicNumber = 0,
        seniorNumber = 0;
    if (typeNumber == 0) {
      factor = 20;
    }
    if (typeNumber == 1) {
        factor = 25;
    }
    if (typeNumber == 2) {
        factor = 40;
    }
      seniorNumber = seniorInput.value;
      basicNumber = basicInput.value;
    totalPrice.textContent = `Total €${factor*seniorNumber*0.5 + factor*basicNumber}`;
  };

  ticketsSectionForm.addEventListener('change', countSum);
  ticketsSectionForm.addEventListener('click', (e) => {
      if (e.target.classList.contains("button")) {
          countSum();
      }
  })
  countSum();
}

calculator();