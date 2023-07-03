import '../css/style.css';
import getProjects from './fetchProjects';
import toggleProjects from './showMoreProjects';

async function init() {
  await getProjects(8);
  toggleProjects();
}

init();
