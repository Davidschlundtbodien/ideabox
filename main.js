//Global Variable
var ideas = [];

//Query Selectors
var ideaGallery = document.querySelector("#idea-gallery");
var submitIdeaButton = document.querySelector("#submit-idea-button");

//Event Listeners
submitIdeaButton.addEventListener("click", createIdea);

//Event Handlers
function createIdea() {
var titleInput = document.querySelector("#title-input").value;
var bodyInput = document.querySelector("#body-input").value;
var userIdea = new Idea(titleInput, bodyInput);
userIdea.saveToStorage(ideas);
displayGallery();
};

function displayGallery() {
  ideaGallery.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    ideaGallery.innerHTML +=
    `  <div class="idea-card">
          <section class="idea-card-head">
            <img src="assets/icons/star.svg" alt="star">
            <img src="assets/icons/delete.svg" alt="delete">
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
