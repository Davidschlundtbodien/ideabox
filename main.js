//Global Variable
var ideas = [];

//Query Selectors
var ideaGallery = document.querySelector("#idea-gallery");
var submitIdeaButton = document.querySelector("#submit-idea-button");
var titleInput = document.querySelector("#title-input");
var bodyInput = document.querySelector("#body-input");
// var ideaCard = document.querySelector(".idea-card");
// below two lines for favorite attempt
var favorite = document.querySelectorAll(".star-filled");
var unfavorite = document.querySelectorAll(".star-empty");

//Event Listeners
submitIdeaButton.addEventListener("click", createIdea);
titleInput.addEventListener("keyup", checkForm);
bodyInput.addEventListener("keyup", checkForm);
ideaGallery.addEventListener("click", clickRender);

//Event Handlers
function createIdea() {
  var userIdea = new Idea(titleInput.value, bodyInput.value);
  userIdea.saveToStorage(ideas);
  displayGallery();
  clearValues();
  checkForm();
};

// ---- can delete the below commented section, updated code is below that ----
//
// function clickRender(event) {
//   var click = event.target;
//   if (event.target.classList.contains("remove-card")) {
//     var cardDate = Number(event.target.closest(".idea-card").id);
//     for (var i = 0; i<ideas.length; i++) {
//       if (ideas[i].id === cardDate) {
//         ideas.splice(i, 1);
//         displayGallery();
//       }
//     }
//   console.log(ideas);
//   }
// }


// ----- start of updated functions ------
function clickRender(event) {
  // var click = event.target;
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
      displayGallery();
    }
  }
console.log(ideas);
};

//  *** the below toggles isFavorited but doesn't change image yet ***
function favoriteCard() {
  var cardID = Number(event.target.closest(".idea-card").id);
  console.log('this will be a favorite function');
  for (var i = 0; i < ideas.length; i++) {
       if (ideas[i].id === cardID && !ideas[i].isFavorited) {
         ideas[i].isFavorited = true;
//          cardID.classList.remove('hidden');
//          cardID.classList.add('hidden');
       }
       else if (ideas[i].id === cardID && ideas[i].isFavorited) {
         ideas[i].isFavorited = false;
//          cardID.classList.add('hidden');
//          cardID.classList.remove('hidden');
       }
     }
  console.log(ideas);
};

// ------ end of added functions ------

function displayGallery() {
  ideaGallery.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGallery.innerHTML +=
    `  <div class="idea-card" id="${ideas[i].id}">
          <section class="idea-card-head">
            <img src="assets/icons/star.svg" alt="empty star" class="favorite-card">
            <img src="assets/icons/star-active.svg" alt="filled star" class="star-filled hidden">
            <img src="assets/icons/delete.svg" alt="delete" class="remove-card">
          </section>
          <article class="idea-card-body">
            <h4>${ideas[i].title}</h4>
            <p>${ideas[i].body}</p>
            <p>${ideas[i].id}</p>
          </article>
          <section class="idea-card-foot">
            <img src="assets/icons/comment.svg" alt="comment">
            <p>Comment</p>
          </section>
      </div>
    `
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
