import { Avatar, Chip } from "@heroui/react";

export default function WatchlistCountries({
  countriesList,
}: {
  countriesList: string;
}) {
  const countryCodes = countriesList
    ?.split(",")
    .map((code) => code.trim())
    .filter(Boolean);

  return (
    <>
      {countryCodes?.map((countryCode, codeIndex) => (
        <Chip key={`${countryCode}-${codeIndex}`} variant="tertiary">
          <Avatar className="w-4 h-4">
            <Avatar.Image
              alt={countryCode}
              src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
            />
            <Avatar.Fallback>{countryCode}</Avatar.Fallback>
          </Avatar>
          <Chip.Label>
            {new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode)}
          </Chip.Label>
        </Chip>
      ))}
    </>
  );
}
