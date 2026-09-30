export type Comment = {
  text: string;
  created_at: Date;
  created_by?: DocumentEditorUser;
};

type DocumentEditorUser = {
  id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
};
