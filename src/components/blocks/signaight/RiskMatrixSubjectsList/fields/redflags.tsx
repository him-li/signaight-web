import type { IRedFlag } from "@/types/person/red_flag/index.interface";

export default function RedFlags({ redFlags }: { redFlags?: IRedFlag[] }) {
  return (
    <div className="flex justify-center">
      {redFlags &&
        redFlags.length > 0 &&
        redFlags.map((redFlag) => {
          return <p key={redFlag.category}>{redFlag.category}</p>;
        })}
    </div>
  );
}
