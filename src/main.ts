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
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle);
    console.log(newBody);
  },
});

const notes = NotesAPI.getAllNotes();
view.updateNoteList(notes);
