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
console.log(ideas);
}
