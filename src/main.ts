import "./style.scss";
import NotesView from "./views/NotesView";

const app = document.getElementById("app");
const view = new NotesView(app, {
  onNoteSelect() {
    console.log("No selected note");
  },
});
