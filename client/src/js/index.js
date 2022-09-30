import { initDb, getDb, postDb, deleteDb } from './database';
import { fetchCards } from './cards';
import { toggleForm, clearForm } from './form';

// Import Modules
import "./form";

// Import CSS files
import "../css/index.css";
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

// Add images on load
window.addEventListener('load', function () {
  initDb();
  fetchCards();
  document.getElementById('logo').src = Logo;
  document.getElementById('bearThumbnail').src = Bear;
  document.getElementById('dogThumbnail').src = Dog;
});

// Form functionality
const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
 toggleForm()
})

form.addEventListener('submit', (event) => {
  // handle the form data
  event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {

  // Obtains values passed into the form element
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

   // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
   editDb(profileId, name, email, phone, profile);

   fetchCards();

   // Toggles the submit button back to POST functionality
   submitBtnToUpdate = false;
  }
  
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
});

window.deleteCard = (e) => {
  let id = parseInt(e.id);
  deleteDb(id);

  fetchCards(); // reloads the DOM
}

window.editCard = (e) => {
  // gets id from the button el attached to the contact card
  // sets a global variable that will be used in the form element
  profileId = parseInt(e.dataset.id);

  // grabs info to pre-populate edit form
  let editName = e.dataset.name;
  let editPhone = e.dataset.phone;
  let editEmail = e.dataset.email;

  document.getElementById("name").value = editName;
  document.getElementById("phone").value = editPhone;
  document.getElementById("email").value = editEmail;

  form.style.display = 'block';

  submitBtnToUpdate = true;
}

if ('serviceWorker' in navigator) {
  // use the window load event to keep the page load perfomant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
};

// Install button
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';

  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});


