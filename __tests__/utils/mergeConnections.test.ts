import {
  firstMergedPerson,
  secondMergedPerson,
} from "../__mock__/mergedPersons.mock";
import { Person } from "@/types/person/index.interface";
import { mergeConnections } from "@/components/blocks/modals/MergePersonsModal/utils/mergeConnections";
import { defaultPerson } from "__tests__/__mock__/defaultPerson.mock";

describe("mergeConnections", () => {
  it("mergeConnections should work ", () => {
    const connections = mergeConnections([defaultPerson] as Person[]);
    expect(connections?.following?.facebook?.length).toEqual(20);
    expect(connections?.following?.instagram?.length).toEqual(0);
    expect(connections?.friends?.facebook.length).toEqual(0);
  });
  it("mergeConnections should merge data ", () => {
    const connections = mergeConnections([
      firstMergedPerson,
      secondMergedPerson,
    ] as Person[]);
    expect(connections?.following?.facebook?.length).toEqual(6);
    expect(connections?.following?.instagram?.length).toEqual(0);
    expect(connections?.friends?.facebook.length).toEqual(0);
  });
});
