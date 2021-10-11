document.querySelectorAll('.player__slider').forEach(range => range.addEventListener('input', function () {
  console.log("range = ", this)
  const value = this.value;
  if (this.id == "volume") {
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
  } else {
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
  }
  
}));