import { Card } from "@heroui/react";
import Link from "next/link";
import type { WebSearches } from "@/types/search.interface";

export default function Web({ searches }: { searches?: WebSearches[] }) {
  return (
    <div className="h-72 list-none whitespace-nowrap overflow-x-auto overflow-y-hidden snap-mandatory snap-x">
      <Card
        key="1"
        className="web-card w-52 h-full relative inline-block snap-center animate-rotate-cover shadow-none bg-transparent"
      >
        {null}
      </Card>
      {searches?.map((search, index) => (
        <Card
          key={index + 1}
          className="web-card w-52 h-full relative inline-block snap-center animate-rotate-cover"
        >
          <img
            alt={search?.title ?? ""}
            src={search?.images ? search?.images[0] : ""}
            className="absolute top-0 -z-10 w-full min-h-72 h-full object-cover"
          />
          <Card.Header className="z-10 text-large text-pretty ease-in-out duration-300 hover:bg-default-50/50 hover:backdrop-blur-lg">
            {search?.title || ""}
          </Card.Header>
          <Card.Content className="z-10 text-pretty ease-in-out duration-300 hover:bg-default-50/50 hover:backdrop-blur-lg">
            {search?.preview || ""}
          </Card.Content>
          <Card.Footer className="z-10 absolute bottom-0 bg-default-50/50 backdrop-blur-lg">
            <Link href={search?.source!} target="_blank">
              View Source Link
            </Link>
          </Card.Footer>
        </Card>
      ))}
      <Card
        key={searches ? searches?.length + 1 : 0}
        className="web-card w-52 h-full relative inline-block snap-center animate-rotate-cover shadow-none bg-transparent"
      >
        {null}
      </Card>
    </div>
  );
}
