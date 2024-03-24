// format birthday date
export function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10);
}

// format availibity date
export function formatAvailibityDate(date) {
  const dateObject = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(dateObject);
}

// format reservation date
export function formatReservationDate(date) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// format mybookings date
export function formatMyBookingDate(date) {
  const dateObject = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dateObject);
}

// create dates array from n to n+5
export function makeDatesArray() {
  const datesArray = [];
  const today = new Date();

  for (let i = 0; i < 6; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formatedDate = date.toLocaleString("fr-FR", {
      weekday: "short",
      day: "numeric",
    });

    datesArray.push(formatedDate);
  }

  return datesArray;
}

// display header title depending on url path
function checkLastChar(str) {
  return str.slice(-1) === "/";
}

function selectTitle(str) {
  switch (str) {
    case "favorite":
      return "Mes favoris";
    case "children":
      return "Mes enfants";
    case "addchildren":
      return "Ajouter un enfant";
    case "mybooking":
      return "Mes reservations";
    case "account":
      return "Mon profil";
    default:
      return "Modifier mon enfant";
  }
}

export function displayTitle(path) {
  let trimmedPath = path.toLowerCase();

  if (checkLastChar(path)) {
    trimmedPath = path.slice(0, -1);
  }
  const lastIndex = trimmedPath.lastIndexOf("/");
  const lastWord = trimmedPath.substring(lastIndex + 1);
  return selectTitle(lastWord);
}

// check password format

/* function checkPasswordFormat(e) {
  const newPassword = e.target.value;
  setFirstPassword(newPassword);
  const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (validPassword.test(newPassword)) {
    setMessage("");
  } else {
    if (newPassword.length < 8) {
      setMessage("Veuillez saisir au minimum 8 caractères");
    }
    if (!/[!@#$%^&*()_+\-=[\]{}|;:',.<>?/]/.test(newPassword)) {
      setMessage("Veuillez saisir au minimum 1 caractère spécial");
    }
    if (!/[A-Z]/.test(newPassword)) {
      setMessage("Veuillez saisir au minimum 1 majuscule.");
    }
    if (!/[0-9]/.test(newPassword)) {
      setMessage("Veuillez saisir au minimum 1 chiffre");
    }
  }
} */
