import { useState } from "react";
import { Card } from "@heroui/react";
import IndicatorsModal from "./IndicatorsModal";
import Display from "@/components/atoms/Display";
import WatchlistCountries from "./WatchlistCountries";
import { personRedFlagsConstants } from "@/constants";
import { Reorder } from "framer-motion";
import type { SubCategory } from "@/types/person/red_flag/index.interface";

export default function IndicatorsCards({
  redFlags,
}: {
  redFlags: SubCategory[];
}) {
  const [items, setItems] = useState(redFlags);
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="space-y-4"
    >
      {items.map((item, index) => {
        const imageUrls = Array.from(
          new Set(
            (item.factors ?? [])
              .flatMap((factor) => [factor?.source?.photo])
              .filter(Boolean) as string[],
          ),
        );
        return (
          <Reorder.Item
            key={`${item.category}-${item.sub_category}-${index}`}
            value={item}
          >
            <Card className="w-full h-72 relative">
              <Card.Header className="z-20 hover:bg-default-50/75 hover:backdrop-blur-sm hover:ease-in-out duration-300">
                <Card.Title>{item.sub_category}</Card.Title>
                <Card.Description>{item.description ?? ""}</Card.Description>
              </Card.Header>
              <Card.Content className="h-full min-h-fit z-20 hover:bg-default-50/75 hover:backdrop-blur-sm hover:ease-in-out duration-300">
                <Display
                  when={
                    item.category ===
                    personRedFlagsConstants.watchlist_countries
                  }
                  fallback={<></>}
                >
                  <WatchlistCountries countriesList={item.description!} />
                </Display>
              </Card.Content>
              <Card.Footer className="bg-default-50/75 border-t border-zinc-100/50 justify-between z-20">
                <IndicatorsModal redFlag={item} />
              </Card.Footer>
              <Display when={imageUrls.length > 0} fallback={<></>}>
                <div className="flex overflow-x-auto gap-2 h-full w-[200%] animate-scrollX absolute top-0">
                  {[...imageUrls, ...imageUrls].map((src, index) => (
                    <img
                      key={src + index}
                      alt={`${item.sub_category}-img-${index}`}
                      className="w-full h-72 object-cover rounded-xl"
                      src={src}
                    />
                  ))}
                </div>
              </Display>
            </Card>
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}
