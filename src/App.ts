import NotesAPI from "./api/NotesAPI";
import NotesView from "./views/NotesView";
import { Note, NoteEventHandlers } from "./types/Node";

export default class App {
  notes: Note[];
  activeNote: Note | null;
  view: NotesView;

  constructor(root: HTMLElement) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  private _refreshNotes(): void {
    const notes = NotesAPI.getAllNotes();
    this._setNotes(notes);
    if (notes.length > 0) this._setActiveNote(notes[0]);
  }

  private _setActiveNote(note: Note): void {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  private _setNotes(notes: Note[]): void {
    this.notes = notes;
    this.view.updateNoteList(notes);
  }

  private _handlers(): NoteEventHandlers {
    return {
      onNoteSelect: (id: string) => {
        console.log(id + " No selected note");
        const selectedNote = this.notes.find((note) => String(note.id) === id);
        if (selectedNote) this._setActiveNote(selectedNote);
      },
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Add text here",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle: string, newBody: string) => {
        NotesAPI.saveNote({
          id: this.activeNote?.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteDelete: (id: string) => {
        NotesAPI.deleteNote(id);
        this._refreshNotes();
      },
    };
  }
}
