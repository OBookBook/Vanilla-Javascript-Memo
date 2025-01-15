import { Note } from "./types/Node";
import NotesAPI from "./api/NotesAPI";
import NotesView from "./views/NotesView";

export default class App {
  notes: Note[];
  activeNote: Note | null;
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

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setActiveNote(note: Note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
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
