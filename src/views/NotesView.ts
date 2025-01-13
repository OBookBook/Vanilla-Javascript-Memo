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
  }
}
