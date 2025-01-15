import NotesAPI from "./api/NotesAPI";
import "./style.scss";
import NotesView from "./views/NotesView";
const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteSelect() {
    console.log("No selected note");
  },
  onNoteAdd() {
    console.log("add note");
  },
  onNoteEdit(newTitle: string, newBody: string) {
    console.log(newTitle);
    console.log(newBody);
  },
  onNoteDelete() {
    console.log("delete note");
  },
});

const notes = NotesAPI.getAllNotes();
view.updateNoteList(notes);
