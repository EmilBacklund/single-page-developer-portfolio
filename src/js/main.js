import '../css/style.css';
import getProjects from './fetchProjects';

async function init() {
  await getProjects(8);
}

init();
