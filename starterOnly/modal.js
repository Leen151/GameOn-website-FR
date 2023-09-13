function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// Fermeture de la modale

//récupération du bouton X servant à fermer la modale
const closeBtn = document.querySelector(".close");
//création de l'evenement : au clic appel la fonction "closeModal"
closeBtn.addEventListener("click", closeModal);

//fonction qui repasse la modale en display none : la modale disparait
function closeModal() {
  modalbg.style.display = "none";
}

