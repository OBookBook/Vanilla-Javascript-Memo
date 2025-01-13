import { Note } from "../types/Node";

export default class NotesAPI {
  static getAllNotes(): Note[] {
    const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    return notes;
  }

  static saveNote(noteToSave: Note): void {
    const notes = this.getAllNotes();
    const existingNote = notes.find((note) => note.id == noteToSave.id);

    if (existingNote) {
      existingNote.title = noteToSave.title;
      existingNote.body = noteToSave.body;
      existingNote.updated = noteToSave.updated;
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000);
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static deleteNote(id: number): void {
    const notes = this.getAllNotes();
    const nowNotes = notes.filter((note) => note.id !== id);

    localStorage.setItem("notes", JSON.stringify(nowNotes));
  }
}
