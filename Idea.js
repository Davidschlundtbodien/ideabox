class Idea {
  constructor(title, body) {
    this.id = ;
    this.title = title;
    this.body = body;
    this.isFavorited = false;
  }

  saveToStorage(array) {
    array.push(this)
  }

  deleteFromStorage(array, idea) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === idea.id) {
        array.splice(i, 1);
      }
    }
  }

  updateIdea() {

  }

}
