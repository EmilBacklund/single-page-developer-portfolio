const showMoreProjects = document.querySelector('#showMoreProjects');
const extraProjects = document.querySelector('#extraProjects');
const svgShowMorePath = document.querySelector('#svgShowMorePath');
const showMoreProjectsText = document.querySelector('#showMoreProjectsText');
const plusPath =
  'M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z';
const minusPath = 'M5 10h10v1H5z';

showMoreProjects.addEventListener('click', () => {
  if (extraProjects.classList.contains('h-0')) {
    showMoreProjectsText.innerHTML = 'Show less';
    svgShowMorePath.setAttribute('d', minusPath);
    extraProjects.classList.remove('h-0');
    extraProjects.classList.remove('opacity-0');
    extraProjects.classList.add('opacity-100');
    extraProjects.classList.remove('overflow-hidden');
    extraProjects.classList.add('h-[330px]');
  } else {
    svgShowMorePath.setAttribute('d', plusPath);
    showMoreProjectsText.innerHTML = 'Show more';
    extraProjects.classList.remove('h-[330px]');
    extraProjects.classList.add('h-0');
    extraProjects.classList.remove('opacity-100');
    extraProjects.classList.add('opacity-0');
    extraProjects.classList.add('overflow-hidden');
  }
});
