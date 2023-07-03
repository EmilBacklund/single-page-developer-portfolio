import getProjects from './fetchProjects';

const showMoreProjects = document.querySelector('#showMoreProjects');
const svgShowMorePath = document.querySelector('#svgShowMorePath');
const showMoreProjectsText = document.querySelector('#showMoreProjectsText');
const plusPath =
  'M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z';
const minusPath = 'M5 10h10v1H5z';

function toggleProjects() {
  showMoreProjects.addEventListener('click', async () => {
    if (showMoreProjectsText.innerHTML === 'Show more') {
      showMoreProjectsText.innerHTML = 'Show less';
      svgShowMorePath.setAttribute('d', minusPath);
      await getProjects(100);
    } else {
      svgShowMorePath.setAttribute('d', plusPath);
      showMoreProjectsText.innerHTML = 'Show more';
      await getProjects(8);
    }
  });
}

export default toggleProjects;
