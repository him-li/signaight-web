import { Person } from "@/types/person/index.interface";
import { IManyPersonsDeleteRequest } from "@/types/requests/manyPersonsDelete";

/* Base Event */
export interface IBaseEvent {
  id: string;
  type: EventType;
  timestamp: Date;
}

export interface IPersonDataChangeEventView extends IBaseEvent {
  person: Partial<Person>;
}
export interface IPersonsDeletedEventView extends IBaseEvent {
  personIds: string[];
  method: IManyPersonsDeleteRequest["method"];
}

/* Global Events Interface */
export interface Events {
  "person-data-change": IPersonDataChangeEventView;
  "persons-deleted": IPersonsDeletedEventView;
}

export type EventType = keyof Events;
