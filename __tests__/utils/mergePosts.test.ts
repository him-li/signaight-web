import { mergePosts } from "@/components/blocks/modals/MergePersonsModal/utils/mergePosts";
import {
  firstMergedPerson,
  personWithFBPhotoPosts,
  personWithLinkedinPosts,
  secondMergedPerson,
} from "../__mock__/mergedPersons.mock";
import { Person } from "@/types/person/index.interface";

describe("mergePosts", () => {
  it("mergePosts should work and skip empty posts", () => {
    const posts = mergePosts([
      firstMergedPerson,
      secondMergedPerson,
    ] as Person[]);
    expect(posts?.length).toEqual(2);
  });

  it("mergePosts should get linkedin posts", () => {
    const posts = mergePosts([personWithLinkedinPosts] as Person[]);
    expect(posts?.length).toEqual(1);
  });
  it("mergePosts should get posts with facebook photo", () => {
    const posts = mergePosts([personWithFBPhotoPosts] as Person[]);
    expect(posts?.length).toEqual(1);
  });
});
