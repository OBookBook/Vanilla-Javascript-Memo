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
    const existingNote = notes.find((note) => note.id == noteToSave.id);

    if (existingNote) {
      existingNote.title = noteToSave.title;
      existingNote.body = noteToSave.body;
      existingNote.updated = noteToSave.updated;
    } else {
      noteToSave.id = noteToSave.id;
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }
}
