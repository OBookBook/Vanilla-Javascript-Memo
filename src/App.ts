import NotesView from "./views/NotesView";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
  }

  _handlers() {
    return {
      onNoteSelect(id: string) {
        console.log(id + "No selected note");
      },
      onNoteAdd() {
        console.log("add note");
      },
      onNoteEdit(newTitle: string, newBody: string) {
        console.log(newTitle);
        console.log(newBody);
      },
      onNoteDelete(id: string) {
        console.log(id + "delete note");
      },
    };
  }
}
