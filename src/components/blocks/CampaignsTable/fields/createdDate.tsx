export default function CreatedDate({ date }: { date?: Date }) {
  return date ? new Date(date).toLocaleDateString("en-GB") : "";
}
