import { DateTime } from 'luxon';
import { SUBMIT_ENDPOINT, VERYFY_RECAPTCHA_TOKEN } from './settings/API';

const API_KEY = import.meta.env.VITE_API_KEY;
const reCAPTCHA_site_key = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const contactForm = document.querySelector('#contactForm');

const contactName = document.querySelector('#contactName');
const nameSection = document.querySelector('#nameSection');
const nameError = document.querySelector('#nameError');
const nameErrorImage = document.querySelector('#nameErrorImage');

const contactEmail = document.querySelector('#contactEmail');
const emailSection = document.querySelector('#emailSection');
const emailError = document.querySelector('#emailError');
const emailErrorFormat = document.querySelector('#emailErrorFormat');
const emailErrorImage = document.querySelector('#emailErrorImage');

const contactMessage = document.querySelector('#contactMessage');
const messageError = document.querySelector('#messageError');
const messageErrorImage = document.querySelector('#messageErrorImage');

const generalMessage = document.querySelector('#generalMessage');
const loadingIndicator = document.querySelector('#loadingIndicator');

const contactBtn = document.querySelectorAll('.contactBtn');

for (let i = 0; i < contactBtn.length; i += 1) {
  contactBtn[i].addEventListener('click', () => {
    contactForm.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
}

function validateEmail(mail) {
  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (mail.match(regEx)) {
    return true;
  }
  return false;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isNameValid = false;
  if (contactName.value.trim().length) {
    nameError.classList.add('hidden');
    nameErrorImage.classList.add('hidden');
    nameSection.classList.remove('border-red-400');
    nameSection.classList.add('border-portfolioGreen');
    isNameValid = true;
  } else {
    nameError.classList.remove('hidden');
    nameErrorImage.classList.remove('hidden');
    nameSection.classList.remove('border-portfolioGreen');
    nameSection.classList.add('border-red-400');
  }

  let isEmailValid = false;
  if (contactEmail.value.trim().length) {
    emailError.classList.add('hidden');
    emailErrorImage.classList.add('hidden');
    if (validateEmail(contactEmail.value) && contactEmail.value.trim().length) {
      emailErrorFormat.classList.add('hidden');
      emailSection.classList.remove('border-red-400');
      emailSection.classList.add('border-portfolioGreen');
      isEmailValid = true;
    } else {
      emailErrorFormat.classList.remove('hidden');
      emailErrorImage.classList.remove('hidden');
    }
  } else {
    emailError.classList.remove('hidden');
    emailErrorImage.classList.remove('hidden');
    emailErrorFormat.classList.add('hidden');
    emailSection.classList.remove('border-portfolioGreen');
    emailSection.classList.add('border-red-400');
  }

  let isMessageValid = false;
  if (contactMessage.value.trim().length) {
    messageError.classList.add('hidden');
    messageErrorImage.classList.add('hidden');
    contactMessage.classList.remove('border-red-400');
    contactMessage.classList.add('border-portfolioGreen');
    isMessageValid = true;
  } else {
    messageError.classList.remove('hidden');
    messageErrorImage.classList.remove('hidden');
    contactMessage.classList.add('border-red-400');
    contactMessage.classList.remove('border-portfolioGreen');
  }

  const formIsValid = isNameValid && isEmailValid && isMessageValid;

  if (formIsValid) {
    loadingIndicator.classList.remove('hidden');

    grecaptcha.ready(function () {
      grecaptcha.execute(reCAPTCHA_site_key, { action: 'submit' }).then(async function (token) {
        loadingIndicator.classList.remove('hidden');

        try {
          const verifyResponse = await fetch('/.netlify/functions/verify-recaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });

          const result = await verifyResponse.json();

          const requiredScore = 0.5;

          if (result.success && result.score > requiredScore) {
            const timeNow = DateTime.now().toISO();

            const userData = JSON.stringify({
              fields: {
                Name: contactName.value,
                Email: contactEmail.value,
                Message: contactMessage.value,
                'Date Recieved': timeNow,
              },
            });

            const response = await fetch(SUBMIT_ENDPOINT, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: userData,
            });

            if (response.ok) {
              contactEmail.value = '';
              contactName.value = '';
              contactMessage.value = '';

              generalMessage.classList.remove('text-red-400');
              generalMessage.classList.add('text-portfolioGreen');
              generalMessage.innerHTML = 'Message submitted, thank you!';
            } else {
              throw new Error('Form submission failed.');
            }
          } else {
            generalMessage.classList.remove('text-portfolioGreen');
            generalMessage.classList.add('text-red-400');
            generalMessage.innerHTML = `Hmm... that reCAPTCHA score looks a little low. You scored ${result.score}, and I need ${requiredScore} from you. If you're human, try refreshing or sending your message another way 🧠
   `;
          }
        } catch (error) {
          generalMessage.classList.remove('text-portfolioGreen');
          generalMessage.classList.add('text-red-400');
          generalMessage.innerHTML = 'Something went wrong. Please try again later.';
          console.error('Submit error:', error);
        } finally {
          generalMessage.classList.remove('hidden');
          loadingIndicator.classList.add('hidden');
        }
      });
    });
  }
});

function loadReCaptchaScript(reCAPTCHA_site_key) {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${reCAPTCHA_site_key}`;
  script.async = true;
  document.head.appendChild(script);
}

// Load the script when the page is ready
window.addEventListener('DOMContentLoaded', () => {
  loadReCaptchaScript(reCAPTCHA_site_key);
});
