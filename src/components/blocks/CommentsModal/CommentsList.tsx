import { Label, ListBox, Description } from "@heroui/react";
import type { Person } from "@/types/person/index.interface";

type CommentsListProps = {
  person: Person;
};

export default function CommentsList({ person }: CommentsListProps) {
  return (
    <ListBox aria-label="Comments" items={person?.comments}>
      {(item) => (
        <ListBox.Item
          id={item?.created_at.toString()}
          key={item?.created_at.toString()}
          aria-label={item?.created_at.toString()}
        >
          <Label>{item?.text}</Label>
          <Description className="flex flex-col">
            <p>{item?.created_by?.email}</p>
            <p>
              {new Date(item?.created_at).toLocaleDateString("en-GB")} -{" "}
              {new Date(item?.created_at).toLocaleTimeString("en-GB")}
            </p>
          </Description>
        </ListBox.Item>
      )}
    </ListBox>
  );
}
