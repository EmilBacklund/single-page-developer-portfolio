import { GET_PROJECTS } from './settings/API';
import axios from 'axios';
import toggleProjectView from './toggleProjectView';

const projectsContainer = document.querySelector('#projects');
const loader = document.querySelector('#loader');

const API_KEY = import.meta.env.VITE_API_KEY;

export default async function getProjects() {
  loader.classList.remove('hidden');
  loader.classList.add('block');

  try {
    const response = await axios.get(GET_PROJECTS, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.data;

      const sortedProjects = data.records
        .slice()
        .sort((a, b) => a.fields.DisplayOrder - b.fields.DisplayOrder);

      projectsContainer.innerHTML = `
        <div class="grid grid-cols-1 tablet:grid-cols-2 gap-x-6 gap-y-10 tablet:gap-y-[60px]">
            ${sortedProjects
              .map(
                (project) => `
              <div>
                <div
                class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
                tabindex="0"
              >
                <img
                src="${project.fields.screenshot[0].thumbnails.large.url}"
                alt="Detailed fullscreen printscreen of landingpage on ${project.fields.title}" />
                <div
      class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
    >
      <a href="${project.fields.webpage_url}" target="_blank">
        <button
          class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
          tabindex="-1"
        >
          VIEW PROJECT
        </button>
      </a>
      <a href="${project.fields.repository}" target="_blank">
        <button
          class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
          tabindex="-1"
        >
          VIEW CODE
        </button>
      </a>
    </div>
    <div
    class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
  ></div>
    </div>
    <div class="flex flex-col gap-2 uppercase">
    <h3 class="text-2xl tracking-tight leading-8 ">${project.fields.title}</h3>
    <div
      class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
    >
      ${project.fields.tools.map((tool) => `<p>${tool}</p>`).join('')}
    </div>
    <div class="flex gap-[30px] computer:hidden">
      <a href="${project.fields.webpage_url}" target="_blank">
        <button
          class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
          tabindex="-1"
        >
          VIEW PROJECT
        </button>
      </a>
      <a href="${project.fields.repository}" target="_blank">
        <button
          class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
          tabindex="-1"
        >
          VIEW CODE
        </button>
      </a>
    </div>
  </div>
    </div>`
              )
              .join('')}
              
        </div>
        `;

      loader.classList.remove('block');
      loader.classList.add('hidden');
      toggleProjectView();
    }
  } catch (error) {
    loader.classList.remove('block');
    loader.classList.add('hidden');
  }
}
