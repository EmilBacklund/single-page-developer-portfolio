import { DateTime } from 'luxon';
import SUBMIT_ENDPOINT from './settings/API';

const apiToken = process.env.API_TOKEN;
console.log(apiToken);

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
    const timeNow = DateTime.now().toISO();

    const userData = `
    {
        "fields": {
            "Name": "${contactName.value}",
            "Email": "${contactEmail.value}",
            "Message": "${contactMessage.value}",
            "Date Recieved": "${timeNow}"
        }
    }`;

    (async function submitForm() {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: userData,
      });
      if (response.ok) {
        contactEmail.value = '';
        contactName.value = '';
        contactMessage.value = '';

        generalMessage.classList.remove('hidden');
        generalMessage.classList.remove('text-red-400');
        generalMessage.classList.add('text-portfolioGreen');
        generalMessage.innerHTML = 'Message submitted, thank you!';
      } else {
        generalMessage.classList.remove('hidden');
        generalMessage.classList.remove('text-portfolioGreen');
        generalMessage.classList.add('text-red-400');
        generalMessage.innerHTML = 'Something unexpected happened, try again soon';
      }
    })().catch((err) => {
      console.log(err);
    });
  }
});
