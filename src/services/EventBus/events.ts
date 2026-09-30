import { v4 } from "uuid";
import {
  EventType,
  IBaseEvent,
  IPersonDataChangeEventView,
  IPersonsDeletedEventView,
} from "./types";
import { Person } from "@/types/person/index.interface";
import { IManyPersonsDeleteRequest } from "@/types/requests/manyPersonsDelete";

class BaseEvent implements IBaseEvent {
  public id: string;
  public timestamp: Date;

  constructor(public type: EventType) {
    this.id = v4();
    this.timestamp = new Date();
  }
}

export class PersonDataChangeEvent
  extends BaseEvent
  implements IPersonDataChangeEventView
{
  constructor(public person: Partial<Person>) {
    super("person-data-change");
  }
}
export class PersonsDeletedEvent
  extends BaseEvent
  implements IPersonsDeletedEventView
{
  constructor(
    public personIds: string[],
    public method: IManyPersonsDeleteRequest["method"],
  ) {
    super("persons-deleted");
  }
}
