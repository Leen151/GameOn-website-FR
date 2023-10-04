//////// DOM Elements //////////////
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector("modal-body")
const modalBtn = document.querySelectorAll(".btn-signup");
const iconeMenu = document.querySelector(".icon");
const reductedMenu = document.getElementById("myTopnav");
const closeBtn = document.querySelector(".close");

//éléments DOM du formulaire
//const formData = document.querySelectorAll(".formData");
//const submitBtn = document.querySelector(".btn-submit");
const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const nbEvent = document.getElementById("quantity");
let locationChoice = document.querySelectorAll('input[name="location"]');
const cguCheck = document.getElementById("checkbox1");


//////// Gestion du menu responsive /////////////
/*
fonction qui permet de gérer l'ajout ou le retrait de la classe "responsive" :
quand la classe CSS "responsive" est présente, le menu est affiché
toggle : ajoute la classe passée en paramètre si elle n'est pas présente et sinon la retire
*/
function toggleResponsiveClass() {
  reductedMenu.classList.toggle("responsive");
}
//au clic sur l'icône du menu, la fonction est appelée et permet d'afficher ou de cacher le menu
iconeMenu.addEventListener("click", toggleResponsiveClass);



//////// Apparition de la modale /////////////
//launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//launch modal form
function launchModal(){
  modalbg.style.display = "block";
}


//////// Fermeture de la modale ////////////////
//création de l'événement : au clic, appel de la fonction "closeModal"
closeBtn.addEventListener("click", closeModal);
//fonction qui repasse la modale en display none : la modale disparait
function closeModal() {
  modalbg.style.display = "none";
}


//////// Fonction de validation du formulaire /////////
form.addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    console.log("submit");

    const regExEmail = new RegExp("^[\w\.\-]{2,64}@([\w-]+\.)+([a-zA-Z]{2,4})$"); // regEx pour une adresse mail
    const regExName = new RegExp("^[A-Za-z-]{2,64}$"); //regEx pour avoir au moins 2 lettres et 64 max (accepte le -)
    const regExQuantity = new RegExp("^[0-9]{1,3}$"); //regEx pour avoir un nombre entre 1 et 3 chiffres)

    const messages = {
      first: "Le prénom doit comporter au moins 2 caractères",
      last: "Le nom doit comporter au moins 2 caractères",
      email: "L'adresse email n'est pas valide",
      quantity: "Veuillez entrer un nombre valide"
    };

    //verif prenom et nom
    verifierChamp(firstName, regExName, messages.first);
    verifierChamp(lastName, regExName, messages.last);
    // console.log("prenom verifié")

    //verif mail
    verifierChamp(email, regExEmail, messages.email);
    // console.log("mail verifié")

    //verif nb de concours
    verifierChamp(nbEvent, regExQuantity, messages.quantity);

    //vérification qu'un bouton radio est sélectionné
    let locationSelected = false;
    for (let i = 0; i < locationChoice.length; i++) {
      if (locationChoice[i].checked) {
        locationSelected = true;
        console.log(locationChoice[i].value)
        break;
      }
    }
    if (!locationSelected) {
      throw new Error("Veuillez sélectionner une ville");
    }

    //vérification que les conditions d'utilisation sont validées
    if (!cguCheck.checked) {
      throw new Error("Vous devez accepter les conditions d'utilisation");
    }

    //alert("Formulaire soumis avec succès!");


  } catch (error) {
    console.error("Une erreur est survenue : " + error.message);

  }
})

function verifierChamp(champ, regEx, message) {
  if (!regEx.test(champ.value.trim())) {
    throw new Error(message);
  }
}


