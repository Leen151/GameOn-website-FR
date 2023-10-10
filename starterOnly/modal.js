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
const dateBirthday = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
let locationChoice = document.querySelectorAll('input[name="location"]');
const cguCheck = document.getElementById("checkbox1");
//éléments DOM pour l'affichage des erreurs
const errorFirst = document.getElementById("erreurFirst");
const errorLast = document.getElementById("erreurLast");
const errorEmail = document.getElementById("erreurEmail");
const errorDate = document.getElementById("erreurDate");
const errorQuantity = document.getElementById("erreurQuantity");
const errorLocation = document.getElementById("erreurLocation");
const errorCGU = document.getElementById("erreurCheckbox1");

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


/////////// Apparition de la modale /////////////
//launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//launch modal form
function launchModal() {
    modalbg.style.display = "block";
}


//////// Fermeture de la modale ////////////////
//création de l'événement : au clic, appel de la fonction "closeModal"
closeBtn.addEventListener("click", closeModal);

//fonction qui repasse la modale en display none : la modale disparait
function closeModal() {
    modalbg.style.display = "none";
}

// Déclaration des constantes pour le traitement du formulaire
const regExEmail = new RegExp("^[\w\.\-]{2,64}@([\w-]+\.)+([a-zA-Z]{2,4})$"); // regEx pour une adresse mail
const regExName = new RegExp("^[A-Za-z-]{2,64}$"); //regEx pour avoir au moins 2 lettres et 64 max (accepte le -)
const regExQuantity = new RegExp("^[0-9]{1,3}$"); //regEx pour avoir un nombre entre 1 et 3 chiffres)
const regExDate = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");

const messages = {
    empty: "Ce champ est obligatoire",
    first: "Le prénom doit comporter au moins 2 caractères",
    last: "Le nom doit comporter au moins 2 caractères",
    email: "L'adresse email n'est pas valide",
    date: "Veuillez entrer une date de naissance",
    quantity: "Veuillez entrer un nombre valide",
    location: "Veuillez sélectionner une ville",
    cgu: "Vous devez accepter les conditions d'utilisation"
};

const informations = {
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    quantity: "",
    location: ""
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit");

    // vérification du Prénom
    // if (firstName.value.trim() === "") {
    //     errorFirst.innerHTML = messages.empty
    // } else if (!regExName.test(firstName.value.trim())) {
    //     errorFirst.innerHTML = messages.first;
    // } else {
    //     errorFirst.innerHTML = "";
    //     informations.firstName = firstName.value.trim();
    //     console.log(informations.firstName)
    // }
    verifierChamp(firstName,regExName,messages.first,errorFirst)

    // vérification du Nom
    // if (lastName.value.trim() === "") {
    //     errorLast.innerHTML = messages.empty
    // } else if (!regExName.test(lastName.value.trim())) {
    //     errorLast.innerHTML = messages.last;
    // } else {
    //     errorLast.innerHTML = "";
    //     informations.lastName = lastName.value.trim();
    //     console.log(informations.lastName);
    // }
    verifierChamp(lastName,regExName,messages.last,errorLast)

    // vérification de l'adresse mail
    // if (email.value.trim() === "") {
    //     errorEmail.innerHTML = messages.empty
    // } else if (!regExEmail.test(email.value.trim())) {
    //     errorEmail.innerHTML = messages.email;
    // } else {
    //     errorEmail.innerHTML = "";
    //     informations.email = email.value.trim();
    //     console.log(informations.email);
    // }
    verifierChamp(email,regExEmail,messages.email,errorEmail)

    // vérification de la date
    // durée d'une année en milliseconde
    const oneYearTime = 365*24*60*60*1000;
    // nombre de millisecondes écoulées depuis le premier janvier 1970 à minuit UTC jusqu'au jour actuel
    const todayTime = new Date().getTime();
    // nombre de millisecondes écoulées depuis la date renseignée
    const birthdayTime = new Date(dateBirthday.value).getTime();
    // age de l'utilisateur
    let age = (todayTime - birthdayTime)/oneYearTime

    if (dateBirthday.value.trim === null){
        errorDate.innerHTML = messages.empty
    } else if (!regExDate.test(dateBirthday.value)){
        errorDate.innerHTML = messages.date
    } else if (age < 15){
        errorDate.innerHTML = "Tu es trop jeune pour participer"
    } else {
        errorDate.innerHTML = "";
        informations.date = dateBirthday.value.trim();
        console.log(informations.date);
    }

    // vérification du nombre de tournois
    if (quantity.value.trim() === "") {
        errorQuantity.innerHTML = messages.empty
    } else if (!regExQuantity.test(quantity.value.trim())) {
        errorQuantity.innerHTML = messages.quantity;
    } else {
        errorQuantity.innerHTML = "";
        informations.quantity = quantity.value.trim();
        console.log(informations.quantity);
    }

    //vérification qu'une ville est sélectionnée
    let locationSelected = false;
    let location = "";
    for (let i = 0; i < locationChoice.length; i++) {
        if (locationChoice[i].checked) {
            locationSelected = true;
            location = locationChoice[i].value;
            console.log(location);
            break;
        }
    }
    if (!locationSelected) {
        errorLocation.innerHTML = messages.location;
    } else {
        errorLocation.innerHTML = "";
        informations.location = location;
    }

    //vérification que les conditions d'utilisation sont validées
    if (!cguCheck.checked) {
        errorCGU.innerHTML = messages.cgu;
    } else {
        errorCGU.innerHTML = "";
    }

    console.log(informations)

})

function verifierChamp(champ, regEx, message, champErreur) {
    if (champ.value.trim() === "") {
        champErreur.innerHTML = messages.empty
    } else if (!regEx.test(champ.value.trim())) {
        champErreur.innerHTML = message;
    } else {
        champErreur.innerHTML = "";
    }
}




