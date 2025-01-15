export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <div class="notes" id="app">
      <div class="notesSidebar">
        <button class="notesAdd" type="button">ノートを追加する</button>
        <div class="notesList">
          <div class="notesList-item notesList-item--selected">
            <div class="notesSmall-title">Javascriptの勉強</div>
            <div class="notesSmall-body">今日はif文を学んだ</div>
            <div class="notesSmall-updated">2022/06/02</div>
          </div>
        </div>
      </div>
      <div class="notesPreview">
        <input type="text" class="notesTitle" placeholder="タイトルを記入" />
        <textarea class="notesBody">ここに本文を追加</textarea>
      </div>
    </div>
    `;

    const btnAddNote = this.root.querySelector(".notesAdd");
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    const inputTitle = this.root.querySelector(".notesTitle");
    const inputBody = this.root.querySelector(".notesBody");
    [inputTitle, inputBody].forEach((inputFiled) => {
      inputFiled.addEventListener("blur", () => {
        const updateTitle = inputTitle.value.trim();
        const updateBody = inputBody.value.trim();

        this.onNoteEdit(updateTitle, updateBody);
      });
    });
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
      <div class="notesList-item" data-note-id=${id}>
        <div clas="notesSmall-title">
            ${title}
        </div>
        <div class="notesSmall-body">
            ${body.substring(0, MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notesSmall-updated">
            ${updated.toLocaleString()}
        </div>
      </div>
    `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notesList");

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    notesListContainer
      .querySelectorAll(".notesList-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });

        noteListItem.addEventListener("dblclick", () => {
          const doDelete = confirm("OK Delete??");
          if (doDelete) this.onNoteDelete(noteListItem.dataset.nodeId);
        });
      });
  }
}
