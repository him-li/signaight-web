import BlockLayout from "@/components/atoms/BlockLayout";
import { Icons } from "@/components/atoms/Icons";
import { Honor } from "@/types/person/biographic_details/work/honors.interface";

export default function HonorsAwards({ honors }: { honors?: Honor[] }) {
  return (
    <BlockLayout
      isVisible={honors}
      title="Honors & Awards"
      icon={<Icons.Award />}
    >
      {honors?.map((honor, index) => {
        return (
          <div key={index}>
            <p className="font-semibold">{honor.title}</p>
            <p>{honor.issuer}</p>
            <p>{honor.issue_date}</p>
          </div>
        );
      })}
    </BlockLayout>
  );
}
