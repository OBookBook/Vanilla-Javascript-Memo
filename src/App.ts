import { Note } from "./types/Node";
import NotesAPI from "./api/NotesAPI";
import NotesView from "./views/NotesView";

export default class App {
  notes: Note[];
  activeNote: any;
  view: NotesView;

  constructor(root: HTMLElement | null) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);
  }

  _setNotes(notes: Note[]) {
    this.notes = notes;
    this.view.updateNoteList(notes);
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
