import Display from "@/components/atoms/Display";
import { scoreColors } from "@/constants/colors";
type SignAIghtScoreProps = {
  isSignAIght?: boolean;
  score?: number;
  showLabel: boolean;
  platform: "signaight" | "signaight";
};

export default function SignAIghtScore({
  isSignAIght = false,
  score = 0,
  showLabel,
  platform,
}: SignAIghtScoreProps) {
  return (
    <Display when={score || score === 0} fallback={<></>}>
      <span>
        <span className={showLabel ? "" : "hidden"}>
          Real<strong className="text-success-500">Eye</strong> Score:{" "}
        </span>
        <span
          style={{
            color: scoreColors(isSignAIght ? 100 - score : score),
          }}
        >
          {score === 40 && platform === "signaight" ? "No Data" : score}
        </span>
      </span>
    </Display>
  );
}
