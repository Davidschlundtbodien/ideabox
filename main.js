//Global Variable
var ideas = [];

//Query Selectors
var ideaGallery = document.querySelector("#idea-gallery");
var submitIdeaButton = document.querySelector("#submit-idea-button");
var titleInput = document.querySelector("#title-input");
var bodyInput = document.querySelector("#body-input");
// var ideaCard = document.querySelector(".idea-card");

//Event Listeners
submitIdeaButton.addEventListener("click", createIdea);
titleInput.addEventListener("keyup", checkForm);
bodyInput.addEventListener("keyup", checkForm);
ideaGallery.addEventListener("click", click);

//Event Handlers
function createIdea() {
  var userIdea = new Idea(titleInput.value, bodyInput.value);
  userIdea.saveToStorage(ideas);
  displayGallery();
  clearValues();
  checkForm();
};

function click(event) {
  var click = event.target;
  if (event.target.classList.contains("remove-card")) {
    var cardDate = Number(event.target.closest(".idea-card").id);
    for (var i = 0; i<ideas.length; i++) {
      if (ideas[i].id === cardDate) {
        ideas.splice(i, 1);
        displayGallery();
      }
    }
  console.log(ideas);
  }
}


function displayGallery() {
  ideaGallery.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGallery.innerHTML +=
    `  <div class="idea-card" id="${ideas[i].id}">
          <section class="idea-card-head">
            <img src="assets/icons/star.svg" alt="star" class="favorite-card">
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
