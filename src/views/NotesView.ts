import { Note, NoteEventHandlers } from "../types/Node";

export default class NotesView {
  root: HTMLElement;
  onNoteSelect: (id: string) => void;
  onNoteAdd: () => void;
  onNoteEdit: (newTitle: string, newBody: string) => void;
  onNoteDelete: (id: string) => void;

  constructor(
    root: HTMLElement,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete }: NoteEventHandlers
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

    const btnAddNote = this.root.querySelector(
      ".notesAdd"
    ) as HTMLButtonElement;
    if (btnAddNote) {
      btnAddNote.addEventListener("click", () => {
        this.onNoteAdd();
      });
    }

    const inputTitle = this.root.querySelector(
      ".notesTitle"
    ) as HTMLInputElement;
    const inputBody = this.root.querySelector(
      ".notesBody"
    ) as HTMLTextAreaElement;
    if (inputTitle && inputBody) {
      [inputTitle, inputBody].forEach((inputFiled) => {
        inputFiled.addEventListener("blur", () => {
          const updateTitle = inputTitle.value.trim();
          const updateBody = inputBody.value.trim();

          this.onNoteEdit(updateTitle, updateBody);
        });
      });
    }
  }

  _createListItemHTML(id: number, title: string, body: string, updated: Date) {
    const MAX_BODY_LENGTH = 60;
    body = body || "";

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

  updateNoteList(notes: Note[]) {
    const notesListContainer = this.root.querySelector(
      ".notesList"
    ) as HTMLElement;
    if (notesListContainer) {
      notesListContainer.innerHTML = "";

      for (const note of notes) {
        const html = this._createListItemHTML(
          note.id!,
          note.title,
          note.body,
          new Date(note.updated!)
        );
        notesListContainer.insertAdjacentHTML("beforeend", html);
      }

      notesListContainer
        .querySelectorAll(".notesList-item")
        .forEach((noteListItem) => {
          const noteId = (noteListItem as HTMLElement).dataset.noteId;
          if (noteId) {
            noteListItem.addEventListener("click", () => {
              this.onNoteSelect(noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
              const doDelete = confirm("OK Delete??");
              if (doDelete) {
                this.onNoteDelete(noteId);
              }
            });
          }
        });
    }
  }

  updateActiveNote(note: Note) {
    const titleInput = this.root.querySelector(
      ".notesTitle"
    ) as HTMLInputElement;
    const bodyInput = this.root.querySelector(
      ".notesBody"
    ) as HTMLTextAreaElement;
    if (titleInput && bodyInput) {
      titleInput.value = note.title;
      bodyInput.value = note.body;
    }
    const selectedItem = this.root.querySelector(
      `.notesList-item[data-note-id="${note.id}"]`
    ) as HTMLElement;
    if (selectedItem) selectedItem.classList.add("notesList-item--selected");
  }
}
