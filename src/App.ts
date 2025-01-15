import { Note } from "./types/Node";
import NotesView from "./views/NotesView";

export default class App {
  notes: Note[];
  activeNote: any;
  view: NotesView;

  constructor(root: HTMLElement | null) {
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
