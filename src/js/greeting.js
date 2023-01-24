const greetingMessage = document.querySelector('#greeting');

let mobile = false;
let tablet = false;
let computer = false;

if (
  window.matchMedia('(min-width: 1110px)').matches ||
  window.matchMedia('(max-width: 708px)').matches
) {
  computer = true;
  tablet = false;
  greetingMessage.innerHTML = `Nice to meet you! <br /> I'm
    <span class="underline decoration-portfolioGreen">Emil Backlund</span>.`;
} else {
  computer = false;
  tablet = true;
  greetingMessage.innerHTML = `Nice to <br /> meet you! I'm <br />
    <span class="underline decoration-portfolioGreen">Emil Backlund</span>.`;
}

window.addEventListener('resize', () => {
  if (window.matchMedia('(min-width: 1110px)').matches) {
    if (!computer) {
      computer = true;
      tablet = false;
      mobile = false;
      greetingMessage.innerHTML = `Nice to meet you! <br /> I'm
        <span class="underline decoration-portfolioGreen">Emil Backlund</span>.`;
    }
  } else if (window.matchMedia('(min-width: 708px)').matches) {
    if (!tablet) {
      tablet = true;
      computer = false;
      mobile = false;
      greetingMessage.innerHTML = `Nice to <br /> meet you! I'm <br />
      <span class="underline decoration-portfolioGreen">Emil Backlund</span>.`;
    }
  } else if (window.matchMedia('(max-width: 708px)').matches) {
    if (!mobile) {
      mobile = true;
      computer = false;
      tablet = false;
      greetingMessage.innerHTML = `Nice to meet you! <br /> I'm
      <span class="underline decoration-portfolioGreen">Emil Backlund</span>.`;
    }
  }
});
