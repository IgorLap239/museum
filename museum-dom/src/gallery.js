
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
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    imgContainer.classList.add('_anim-items')
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.classList.add('_anim-show')
    img.src = `${e}`;
    img.alt = ``;
    imgContainer.append(img);
    pictureInnerContainer.append(imgContainer);
    return;
  });
}

galleryShaffle();
