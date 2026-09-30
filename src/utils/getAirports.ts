import airports from "@nwpr/airport-codes";

export const airportOptions = airports
  .filter((a): a is typeof a & { iata: string } => Boolean(a.iata))
  .map((a) => ({
    key: a.iata,
    label: `${a.iata} - ${a.name}, ${a.city}, ${a.country}`,
    value: a.iata,
  }));

export function getAirport(code?: string) {
  if (!code) return null;
  return airports.find((a) => a.iata?.toUpperCase() === code.toUpperCase());
}
