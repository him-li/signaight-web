import { render } from "@testing-library/react";
import BlurredBackground from "@/components/atoms/BlurredBackground";

describe("BlurredBackground", () => {
  it("renders the Image when src is provided", () => {
    render(<BlurredBackground src="/example.jpg" alt="test image" />);
  });

  it("renders the NotFound fallback when src is not provided", () => {
    render(<BlurredBackground alt="test image" />);
  });
});
