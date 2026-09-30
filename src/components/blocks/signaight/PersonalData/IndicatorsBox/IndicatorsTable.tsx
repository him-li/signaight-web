import { Table } from "@heroui/react";
import Display from "@/components/atoms/Display";
import IndicatorsModal from "./IndicatorsModal";
import WatchlistCountries from "./WatchlistCountries";
import { personRedFlagsConstants } from "@/constants";
import type { SubCategory } from "@/types/person/red_flag/index.interface";

const columns = [
  {
    key: "red_flag",
    label: "DETAILS",
    isRowHeader: true,
  },
  {
    key: "details",
    label: "",
  },
];

export default function IndicatorsTable({
  redFlags,
}: {
  redFlags: SubCategory[];
}) {
  return (
    <Table aria-label="Indicators Table" className="p-0">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header columns={columns} className="hidden">
            {(column) => (
              <Table.Column key={column.key} isRowHeader={column.isRowHeader}>
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={redFlags?.map((redFlag) => redFlag) || []}>
            {(item) => {
              const imageUrls = Array.from(
                new Set(
                  (item.factors ?? [])
                    .flatMap((factor) => [factor?.source?.photo])
                    .filter(Boolean) as string[],
                ),
              );
              return (
                <Table.Row
                  id={item.category + item.sub_category + item.severity}
                  key={item.category + item.sub_category + item.severity}
                >
                  <Table.Cell>
                    <div className="flex flex-col gap-1 justify-start text-sm">
                      <p className="font-semibold">{item.sub_category}</p>
                      <Display
                        when={
                          item.category ===
                          personRedFlagsConstants.watchlist_countries
                        }
                        fallback={
                          <p className="text-xs">{item?.description ?? ""}</p>
                        }
                      >
                        <WatchlistCountries countriesList={item.description!} />
                      </Display>
                      <Display when={imageUrls?.length > 0} fallback={<></>}>
                        <div className="flex overflow-x-auto overflow-y-hidden gap-2 h-40">
                          {imageUrls.map((src, index) => (
                            <img
                              key={src + index}
                              alt={`${item.sub_category}-img-${index}`}
                              className="w-full h-full object-cover rounded-xl"
                              src={src}
                            />
                          ))}
                        </div>
                      </Display>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <IndicatorsModal redFlag={item} />
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
