import { GET_PROJECTS } from './settings/API';
import axios from 'axios';

const projectsContainer = document.querySelector('#projects');
let numberOfProjects = 8;

const API_KEY = import.meta.env.VITE_API_KEY;

async function getProjects() {
  try {
    const response = await axios.get(GET_PROJECTS, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      params: {
        maxRecords: numberOfProjects,
      },
    });

    if (response.status === 200) {
      const data = await response.data;

      const sortedProjects = data.records
        .slice()
        .sort((a, b) => a.fields.position - b.fields.position);

      console.log('sortedProjects', sortedProjects);
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
    </div>
                    `
              )
              .join('')}
              
        </div>
        `;
    }
  } catch (error) {
    console.log(error);
  }
}

getProjects();

// const asd = `

// <div>

//     <img
//       src="images/holidaze.webp"
//       alt="Detailed fullscreen printscreen of landingpage on www.emil-backlund.com."
//     />
// <div
//   class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
// >
//   <a href="https://charming-dolphin-31618b.netlify.app/" target="_blank">
//     <button
//       class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//       tabindex="-1"
//     >
//       VIEW PROJECT
//     </button>
//   </a>
//   <a href="https://github.com/EmilBacklund/PROJECT-EXAM-2" target="_blank">
//     <button
//       class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//       tabindex="-1"
//     >
//       VIEW CODE
//     </button>
//   </a>
// </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">BOOK ACCOMMODATIONS</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>REACT</p>
//       <p>REDUX</p>
//       <p>VITE</p>
//       <p>TAILWIND</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://charming-dolphin-31618b.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/PROJECT-EXAM-2" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/www.focusart.info_.webp"
//       alt="detailed fullscreen printscreen of landingpage on www.focusart.info"
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://www.focusart.info/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/Noroff-Fagskole/project-exam-1-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">SHARE ART WEBSITE</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>WORDPRESS</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://www.focusart.info/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/Noroff-Fagskole/project-exam-1-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/artfriender.webp"
//       alt="detailed fullscreen printscreen on Emil Backlund's project Artfriender"
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://glistening-gnome-5521e5.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/Noroff-Fagskole/css-frameworks-ca-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">SOCIAL MEDIA PLATFORM</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>TAILWIND</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://glistening-gnome-5521e5.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/Noroff-Fagskole/css-frameworks-ca-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/auction-house.webp"
//       alt="detailed fullscreen printscreen of a item on sale on Auction House school project"
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://splendid-cactus-12d76c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/semester-project-2" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">AUCTION WEBSITE</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>TAILWIND</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://splendid-cactus-12d76c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/semester-project-2" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>

// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/booking.webp"
//       alt="detailed fullscreen printscreen of the calendar system on booking page project"
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://joyful-froyo-fd387c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/react-interface-2880067" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">BOOKING SYSTEM</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>REACT</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://joyful-froyo-fd387c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/react-interface-2880067" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/frontendmentor.webp"
//       alt="Detailed fullscreen printscreen of a code challenge from Frontendmentor website. The challenge was to make a New's Landingpage."
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://delightful-jalebi-21bbe3.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/news-homepage" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">FRONTEND MENTOR PROJECT</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>TAILWIND</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://delightful-jalebi-21bbe3.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/news-homepage" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/calculator.png"
//       alt="Detailed fullscreen printscreen of landingpage on calculator website."
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://preeminent-fudge-00a560.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/EmilBacklund/calculator-react-frontendmentor"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">REACT CALCULATOR</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>JAVASCRIPT</p>
//       <p>REACT</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://preeminent-fudge-00a560.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/EmilBacklund/calculator-react-frontendmentor"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>

// <div>
//   <div
//     class="viewButtonsContainer mb-5 relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/result-summary-component.png"
//       alt="Detailed fullscreen printscreen of result summary component."
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://jovial-parfait-c1561c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/result-summary-component" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">PERFORMANCE COMPONENT</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>JAVASCRIPT</p>
//       <p>REACT</p>
//       <p>TAILWIND</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://jovial-parfait-c1561c.netlify.app/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a href="https://github.com/EmilBacklund/result-summary-component" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// <div id="extraProjects" class="h-0 overflow-hidden opacity-0 transition-all duration-300">
//   <div
//     class="mb-5 viewButtonsContainer relative computer:cursor-pointer computer:hover:ring-2 computer:ring-portfolioGreen computer:transition computer:duration-200"
//     tabindex="0"
//   >
//     <img
//       src="images/www.emil-backlund.com_.webp"
//       alt="Detailed fullscreen printscreen of landingpage on www.emil-backlund.com."
//     />
//     <div
//       class="viewButtons hidden flex-col absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max text-center gap-12 z-20"
//     >
//       <a href="https://www.emil-backlund.com/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/EmilBacklund/interaction-design-course-assignment-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//     <div
//       class="overlay hidden absolute h-full w-full bg-black top-0 left-0 opacity-70 z-10"
//     ></div>
//   </div>
//   <div class="flex flex-col gap-2">
//     <h3 class="text-2xl tracking-tight leading-8">BUY VIDEO GAMES</h3>
//     <div
//       class="flex flex-wrap gap-5 text-lg leading-7 tracking-normal text-portfolioLightGrey"
//     >
//       <p>HTML</p>
//       <p>CSS</p>
//       <p>WORDPRESS</p>
//     </div>
//     <div class="flex gap-[30px] computer:hidden">
//       <a href="https://www.emil-backlund.com/" target="_blank">
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW PROJECT
//         </button>
//       </a>
//       <a
//         href="https://github.com/EmilBacklund/interaction-design-course-assignment-EmilBacklund"
//         target="_blank"
//       >
//         <button
//           class="border-b-2 tracking-widest border-portfolioGreen hover:text-portfolioGreen pb-1"
//           tabindex="-1"
//         >
//           VIEW CODE
//         </button>
//       </a>
//     </div>
//   </div>
// </div>
// </div>
// <div class="relative mb-20 tablet:mb-[100px] computer:mb-[139px] mt-10 tablet:mt-20">
// <div class="absolute inset-0 flex items-center" aria-hidden="true">
//   <div class="w-full border-t border-gray-300"></div>
// </div>
// <div class="relative flex justify-center">
//   <button
//     id="showMoreProjects"
//     type="button"
//     class="inline-flex items-center hover:ring-2 hover:ring-portfolioGreen gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-portfolioBlack shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//   >
//     <svg
//       class="-ml-1 -mr-0.5 h-5 w-5 text-gray-400"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       aria-hidden="true"
//     >
//       <path
//         id="svgShowMorePath"
//         d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
//       />
//     </svg>
//     <span id="showMoreProjectsText">Show more</span>
//   </button>
// </div>
// </div>
// `;
