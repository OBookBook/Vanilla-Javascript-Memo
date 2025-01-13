export default class NotesAPI {
  static saveNote(noteToSave: { title: string; body: string }): void {
    const note = {
      ...noteToSave,
      id: Math.floor(Math.random() * 1000000),
      updated: new Date().toISOString(),
    };
    localStorage.setItem("notes", JSON.stringify(note));
  }
}
