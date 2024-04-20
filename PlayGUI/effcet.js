const container = document.querySelector('.container')
container.addEventListener('animationend', (e) => {
  e.preventDefault();
  container.classList.remove('active');
  
});