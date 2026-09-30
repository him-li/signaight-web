import Image from "next/image";
import type { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";
export default function CoverPictures({
  factors,
}: {
  factors?: IRedFlagFactor[];
}) {
  const coverFactors =
    factors?.filter((factor) => factor.field === "cover") ?? [];

  if (coverFactors.length === 0) {
    return <p className="text-tiny">No Cover Pictures Detected</p>;
  }

  return (
    <div className="flex flex-wrap w-full gap-2 justify-around items-center">
      {coverFactors?.map((factor, index) =>
        factor?.source?.photo ? (
          <Image
            key={index}
            src={factor.source.photo}
            alt="bg-image"
            width={175}
            height={175}
            className="rounded-lg"
          />
        ) : null,
      )}
    </div>
  );
}
