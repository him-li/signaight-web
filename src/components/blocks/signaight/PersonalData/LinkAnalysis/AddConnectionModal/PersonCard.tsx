"use client";
import { Avatar } from "@heroui/react";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import type { Person } from "@/types/person/index.interface";
import { personDisplayName } from "./types";

type PersonCardProps = {
  person: Person;
  label: string;
};

export default function PersonCard({ person, label }: PersonCardProps) {
  const name = personDisplayName(person);
  const avatar = getPersonAvatar(
    person.personal_details?.visuals?.profile_photo,
  );

  return (
    <div className="flex flex-col items-center gap-1.5 min-w-0">
      <p className="text-xs text-default-400 font-medium uppercase tracking-wide">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <Avatar size="sm" className="shrink-0 rounded-full">
          {avatar && <Avatar.Image src={avatar} alt={name} />}
          <Avatar.Fallback className="text-xs">
            {name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
        </Avatar>
        <p className="text-sm font-medium truncate max-w-32">{name}</p>
      </div>
    </div>
  );
}
