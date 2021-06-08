//Global Variable
var ideas = [];

//Query Selectors
var ideaGallery = document.querySelector("#ideaGalleryGrid");
var submitIdeaButton = document.querySelector("#submitIdeaButton");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var filterFavoritedButton = document.querySelector("#filterFavoritedButton");

//Event Listeners
window.addEventListener("load", fetchLocalStorage);
submitIdeaButton.addEventListener("click", createIdea);
titleInput.addEventListener("keyup", checkForm);
bodyInput.addEventListener("keyup", checkForm);
ideaGallery.addEventListener("click", clickRender);
filterFavoritedButton.addEventListener("click", filterFavorited);

//Event Handlers
function createIdea() {
  var userIdea = new Idea(titleInput.value, bodyInput.value);
  userIdea.saveToStorage(ideas);
  displayGallery();
  clearValues();
  checkForm();
};

function clickRender(event) {
  if (event.target.classList.contains("remove-card")) {
    deleteCard();
  }
  if (event.target.classList.contains("favorite-card")) {
    favoriteCard();
  }
};

function deleteCard() {
  var cardID = Number(event.target.closest(".idea-card").id);
  for (var i = 0; i<ideas.length; i++) {
    if (ideas[i].id === cardID) {
      ideas.splice(i, 1);
      var arrayPayload = JSON.stringify(ideas);
      localStorage.setItem("userIdeas", arrayPayload);
      displayGallery();
    }
  }
console.log(ideas);
};

function favoriteCard() {
  var ideaCard = event.target.closest(".idea-card");
  for (var i = 0; i < ideas.length; i++) {
       if (ideas[i].id === Number(ideaCard.id) && !ideas[i].isFavorited) {
         ideas[i].isFavorited = true;
         event.target.src = "assets/icons/star-active.svg";
       }
       else if (ideas[i].id === Number(ideaCard.id) && ideas[i].isFavorited) {
         ideas[i].isFavorited = false;
         event.target.src = "assets/icons/star.svg";
       }
     }
     var arrayPayload = JSON.stringify(ideas);
     localStorage.setItem("userIdeas", arrayPayload);
  console.log(ideas);
};


function displayGallery() {
  ideaGallery.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].isFavorited) {
      ideaGallery.innerHTML +=
      `  <div class="idea-card" id="${ideas[i].id}">
            <section class="idea-card-head">
              <img src="assets/icons/star-active.svg" alt="filled star" class="favorite-card">
              <img src="assets/icons/delete.svg" alt="delete" class="remove-card">
            </section>
            <article class="idea-card-body">
              <h4>${ideas[i].title}</h4>
              <p>${ideas[i].body}</p>
            </article>
            <section class="idea-card-foot">
              <img src="assets/icons/comment.svg" alt="comment">
              <p>Comment</p>
            </section>
        </div>
      `
    } else {
    ideaGallery.innerHTML +=
    `  <div class="idea-card" id="${ideas[i].id}">
          <section class="idea-card-head">
            <img src="assets/icons/star.svg" alt="empty star" class="favorite-card">
            <img src="assets/icons/delete.svg" alt="delete" class="remove-card">
          </section>
          <article class="idea-card-body">
            <h4>${ideas[i].title}</h4>
            <p>${ideas[i].body}</p>
          </article>
          <section class="idea-card-foot">
            <img src="assets/icons/comment.svg" alt="comment">
            <p>Comment</p>
          </section>
      </div>
    `
  }
}
};

function clearValues() {
  titleInput.value = "";
  bodyInput.value = "";
};

function checkForm() {
  if (titleInput.value.length > 0 && bodyInput.value.length > 0) {
    submitIdeaButton.disabled = false;
  } else {
    submitIdeaButton.disabled = true;
  }
};

function fetchLocalStorage(){
  if (localStorage.getItem("userIdeas")) {
    var response = localStorage.getItem("userIdeas");
    ideas = JSON.parse(response);
    displayGallery();
  }
};

function filterFavorited() {
  var buttonText = filterFavoritedButton;
  if (buttonText.innerText === "Show Starred Ideas") {
    buttonText.innerText = "Show All Ideas";
    console.log(buttonText);
    displayFilteredGallery();
  } else {
    buttonText.innerText = "Show Starred Ideas";
    displayGallery();
  }
};

function displayFilteredGallery(){
  ideaGallery.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].isFavorited) {
      ideaGallery.innerHTML +=
      `  <div class="idea-card" id="${ideas[i].id}">
            <section class="idea-card-head">
              <img src="assets/icons/star-active.svg" alt="filled star" class="favorite-card">
              <img src="assets/icons/delete.svg" alt="delete" class="remove-card">
            </section>
            <article class="idea-card-body">
              <h4>${ideas[i].title}</h4>
              <p>${ideas[i].body}</p>
            </article>
            <section class="idea-card-foot">
              <img src="assets/icons/comment.svg" alt="comment">
              <p>Comment</p>
            </section>
        </div>
      `
    }
  }
};
