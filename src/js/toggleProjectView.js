const viewButtonsContainer = document.querySelectorAll('.viewButtonsContainer');
const viewButtons = document.querySelectorAll('.viewButtons');
const overlay = document.querySelectorAll('.overlay');

for (let i = 0; i < viewButtonsContainer.length; i += 1) {
  viewButtonsContainer[i].addEventListener('click', (e) => {
    console.log(e.target.nodeName);
    if (e.target.nodeName === 'BUTTON') {
      viewButtonsContainer[i].stopPropagation();
    }
    viewButtons[i].classList.toggle('computer:flex');
    overlay[i].classList.toggle('computer:block');
    viewButtonsContainer[i].classList.toggle('computer:ring-2');
  });
}