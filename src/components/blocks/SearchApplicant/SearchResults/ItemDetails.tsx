import { Avatar, Button, Modal, Card, Chip, Tooltip } from "@heroui/react";
import Link from "next/link";
import type { Candidate } from "@/types/candidate.interface";
import { Icons } from "@/components/atoms/Icons";
import { getSocialMediaIcon } from "@/constants/socialMediaIcon";
import { getPersonName } from "@/utils/getPersonName";
import { getPersonAvatar } from "@/utils/getPersonAvatar";
import getLinkedinURL from "@/utils/getLinkedinURL";
const Linkedin = getSocialMediaIcon("linkedin");

interface ItemDetailsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: (isOpen: boolean) => void;
  person: Candidate;
  handleAddApplicant: () => void;
  buttonDisabled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setButtonDisabled: Function;
}

export default function ItemDetails({
  isOpen,
  onOpenChange,
  person,
  handleAddApplicant,
  buttonDisabled,
  setButtonDisabled,
}: ItemDetailsProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container size="xs">
          <Modal.Dialog>
            <Modal.CloseTrigger className="z-20" />
            <Modal.Body className="p-0">
              <Card>
                <Card.Header className="p-0">
                  <Avatar className="w-full h-full">
                    <Avatar.Image
                      alt="Avatar"
                      src={getPersonAvatar(
                        person?.personal_details?.visuals?.profile_photo,
                      )}
                    />
                    <Avatar.Fallback>
                      <Icons.Person />
                    </Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content>
                  <h1 className="text-lg font-semibold">
                    {getPersonName(person?.personal_details?.name, "full_name")}
                  </h1>
                  <Link
                    href={`mailto:${person?.personal_details?.email?.email_address?.[0]}`}
                  >
                    <Chip
                      variant="tertiary"
                      className={
                        person?.personal_details?.email?.email_address?.[0]
                          ? "visible"
                          : "hidden"
                      }
                    >
                      <Icons.Email />
                      <Chip.Label>
                        {person?.personal_details?.email?.email_address?.[0]}
                      </Chip.Label>
                    </Chip>
                  </Link>

                  <Chip
                    variant="tertiary"
                    className={
                      person?.personal_details?.location
                        ?.current_city_region_country?.linkedin_location
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <Icons.Location />
                    {
                      person?.personal_details?.location
                        ?.current_city_region_country?.linkedin_location
                    }
                  </Chip>
                  <Chip
                    variant="tertiary"
                    className={
                      person?.biographic_details?.education
                        ?.linkedin_schools?.[0].degree_name
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <Icons.Education />
                    <Chip.Label>
                      {
                        person?.biographic_details?.education
                          ?.linkedin_schools?.[0].degree_name
                      }
                    </Chip.Label>
                  </Chip>
                  <Chip
                    variant="tertiary"
                    className={
                      person?.biographic_details?.work?.linkedin_work
                        ?.positions?.[0].title
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <Icons.File />
                    <Chip.Label>
                      {
                        person?.biographic_details?.work?.linkedin_work
                          ?.positions?.[0].title
                      }
                    </Chip.Label>
                  </Chip>
                  <code
                    className={
                      (person?.biographic_details?.description_bio_intro
                        ?.linkedin_headline ??
                      person?.biographic_details?.description_bio_intro
                        ?.linkedin_profile_description)
                        ? "visible"
                        : "hidden"
                    }
                  >
                    {person?.biographic_details?.description_bio_intro
                      ?.linkedin_headline ??
                      person?.biographic_details?.description_bio_intro
                        ?.linkedin_profile_description}
                  </code>
                </Card.Content>
                <Card.Footer className="p-0">
                  <Tooltip>
                    <Tooltip.Trigger>
                      <Link href={getLinkedinURL(person)} target="_blank">
                        <Button
                          variant="tertiary"
                          isIconOnly
                          className="w-full rounded-none"
                        >
                          <Linkedin />
                        </Button>
                      </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Content>View LinkedIn Profile</Tooltip.Content>
                  </Tooltip>
                  <Tooltip>
                    <Tooltip.Trigger>
                      <Button
                        variant="tertiary"
                        isIconOnly
                        className="w-full rounded-none"
                        isDisabled={buttonDisabled}
                        onPress={() => {
                          handleAddApplicant();
                          setButtonDisabled(!buttonDisabled);
                        }}
                      >
                        <Icons.Plus />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Add to Project</Tooltip.Content>
                  </Tooltip>
                </Card.Footer>
              </Card>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
