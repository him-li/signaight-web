import { Post } from "@/types/person/posts/index.interface";
import { Person } from "@/types/person/index.interface";
import { uniqueBy } from "./uniqueBy";

export function mergePosts(persons: Person[]): Post[] | undefined {
  const posts = uniqueBy(
    persons.flatMap((p) => p.posts ?? []),
    (g) =>
      (g.fb_post_id ||
        g.instagram_post_id ||
        g.twitter_post_id ||
        g.linkedin_post_url ||
        g.fb_uploaded_photo?.fb_photo?.url) as string,
  );
  return posts.length ? posts : undefined;
}
