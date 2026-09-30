import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { card } from "styles/styles";
import type { IRedFlagFactor } from "@/types/person/red_flag/factor.interface";
type FactorField = "post" | "page" | "friend";
export default function Factors({
  field,
  factors,
}: {
  field: FactorField | FactorField[];
  factors?: IRedFlagFactor[];
}) {
  const fieldArray = Array.isArray(field) ? field : [field];

  const filteredFactors =
    factors?.filter((factor) =>
      fieldArray.includes(factor.field as FactorField),
    ) ?? [];

  if (filteredFactors.length === 0) {
    return (
      <p className="text-tiny">
        No {Array.isArray(field) ? field.join(" or ") : field} detected
      </p>
    );
  }

  const getButtonContent = (factor: IRedFlagFactor) => {
    if (fieldArray.includes("page")) {
      return `${factor.platform?.toUpperCase() ?? "FACEBOOK"} PAGE`;
    }
    if (fieldArray.includes("post") || fieldArray.includes("friend")) {
      return factor.source?.url ? "LINK TO POST" : "";
    }
    return "";
  };

  return (
    <div className="flex flex-wrap justify-around gap-2">
      {filteredFactors?.map((factor, index) => {
        const Icon = factor.platform
          ? getSocialMediaIcon(factor.platform)
          : Icons.Link;
        return (
          <Card key={index} className={card.base}>
            <Card.Header className="flex flex-col justify-start z-20 p-4 hover:bg-default-50/75 hover:backdrop-blur-sm hover:ease-in-out duration-300">
              <Card.Title className="text-sm font-semibold">
                {factor.source?.insight}
              </Card.Title>
              <Card.Description className="text-tiny font-medium">
                {factor.source?.date}
              </Card.Description>
            </Card.Header>
            <Card.Content className={card.content}>
              {factor.source?.text}
            </Card.Content>
            <Card.Footer className={card.footer + " px-0"}>
              <Link
                target="_blank"
                href={factor.source?.url ?? ""}
                className="w-full"
              >
                <Button
                  fullWidth
                  variant="ghost"
                  isIconOnly={factor.source?.url ? false : true}
                  isDisabled={factor.source?.url ? false : true}
                  className="text-tiny rounded-none"
                >
                  <Icon />
                  {getButtonContent(factor)}
                </Button>
              </Link>
            </Card.Footer>
            <img
              alt={factor.source?.photo!}
              className="absolute top-0 object-cover"
              src={factor.source?.photo!}
            />
          </Card>
        );
      })}
    </div>
  );
}
