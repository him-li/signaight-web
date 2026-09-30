import { PersonCreate } from "./person/index.interface";

export type SubjectCreate = (
  person: PersonCreate,
  searchExisting: boolean,
) => void;

export type SubjectFileCreate = (
  projectId: string,
  fileToUpload: File,
  searchExisting: boolean,
) => Promise<void>;
