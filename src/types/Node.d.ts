export interface Note {
  id?: number;
  title: string;
  body: string;
  updated?: string;
}

export interface NoteEventHandlers {
  onNoteSelect: (id: string) => void;
  onNoteAdd: () => void;
  onNoteEdit: (newTitle: string, newBody: string) => void;
  onNoteDelete: (id: string) => void;
}
