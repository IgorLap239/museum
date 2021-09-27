
'use strict';

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
}

const galleryShaffle = () => {
  const pictureInnerContainer = document.querySelector('.picture-inner-container');

  let imgAdress = [];
  for (let i = 0; i < 15; i++) {
    let arrElement = `assets/img/gallery/galery${i+1}.jpg`;
    imgAdress.push(arrElement);
  }

  shuffle(imgAdress);
  imgAdress.map(function(e) {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `${e}`;
    img.alt = ``;
    pictureInnerContainer.append(img);
    return;
  });
}

galleryShaffle();
