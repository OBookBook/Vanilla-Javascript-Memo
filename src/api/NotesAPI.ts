interface Note {
  id?: number;
  title: string;
  body: string;
  updated?: string;
}

export default class NotesAPI {
  static getAllNotes(): Note[] {
    const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    return notes;
  }

  static saveNote(noteToSave: Note): void {
    const notes = this.getAllNotes();

    noteToSave.id = Math.floor(Math.random() * 1000000);
    noteToSave.updated = new Date().toISOString();
    notes.push(noteToSave);

    localStorage.setItem("notes", JSON.stringify(notes));
  }
}
