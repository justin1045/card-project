const form = document.querySelector("form");
const cardContainer = document.querySelector(".card-container");
const inputs = document.getElementsByTagName("input");
console.log(inputs);

// this will give us localstorage data when we reload the page and show that data to our screen if we have any data in localstorage

window.addEventListener("load", (e) => {
  if (localStorage.getItem("cardData")) {
    form.style.display = "none";
    displayCard(JSON.parse(localStorage.getItem("cardData")));
  }
});

// whenever we submit the form this will give us that as object and then we extract those details from it and display those data

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let card = {
    "First Name": inputs[0].value,
    "Last Name": inputs[1].value,
    Country: inputs[2].value,
    "Phone Number": inputs[3].value,
    State: inputs[4].value,
    City: inputs[5].value,
    Village: inputs[6].value,
  };

  // console.log(card);
  // for (const key in card) {
  //     console.log(key , card[key]);

  // }

  localStorage.setItem("cardData", JSON.stringify(card));

  displayCard(card);
});

// this is an simple dislay funcion that show us the data we have entered in a form

function displayCard(obj) {
  form.style.display = "none";

  const fragment = document.createDocumentFragment();

  const resultDiv = document.createElement("div");

  for (const key in obj) {
    const details = document.createElement("p");
    details.innerText = key + " : " + obj[key];
    fragment.append(details);
  }

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttonDiv");

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";

  editButton.addEventListener("click", (e) => {
    resultDiv.style.display = "none";
    form.style.display = "block";
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.style.backgroundColor = "red";

  deleteButton.addEventListener("click" , (e) => {
    localStorage.removeItem("data");
    form.style.display = "block";
    resultDiv.style.display = "none";

  });

  buttonDiv.append(editButton, deleteButton);

  resultDiv.append(fragment, buttonDiv);
  cardContainer.append(resultDiv);
}
