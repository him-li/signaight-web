export const brandColors = {
  50: "rgba(224,242,241,0.9)",
  100: "rgba(178,223,219,0.9)",
  200: "rgba(128,203,196,0.9)",
  300: "rgba(77,182,172,0.9)",
  400: "rgba(38,166,154,0.9)",
  500: "rgba(0,150,136,0.9)",
  600: "rgba(0,137,123,0.9)",
  700: "rgba(0,121,107,0.9)",
  800: "rgba(0,105,92,0.9)",
  900: "rgba(0,77,64,0.9)",
};

export const schema = {
  secondary: "#545454",
  primary: "#343332",
  accent_bright: "#4DBEB0",
  accent_dark: "rgba(38,166,154,0.9)",
  dark: "rgba(0,0,0,0.9)",
  dark_trans: "rgba(0,0,0,0.1)",
  dark_background: "rgba(25,25,25,0.9)",
  dark_text: "rgba(0,77,64,0.9)",
  neutral: "#F9F9F9",
  layout: "rgba(80,80,80,0.9)",
  light: "rgba(255,255,255,0.9)",
  light_trans: "rgba(255,255,255,0.1)",
  light_background: "rgba(245,245,245,0.9)",
  light_gray: "#A2A2A2",
  light_red: "#ef4444",
};

export const darkColors = {
  0: "#000000",
  1: "#191a1a",
  2: "#343332",
  3: "#545454",
  4: "#5c5c5b",
  5: "rgba(0,121,107,0.9)",
  6: "#7c7c7c",
  9: "#848484",
};

export const chartColors = {
  1: "#1776BD",
  2: "#007B81",
  3: "#2F4858",
  4: "#4DBEB0",
  5: "#2E8085",
  green: "#4CAF50",
  yellow: "#FFA834",
  light_yellow: "#FFDF13",
  red: "#E61610",
  gray: "#4A424F",
  blue_border: "#2D4B5A",
};

export function scoreColors(score: number): string {
  const clamped = Math.max(0, Math.min(100, score));
  type RGB = [number, number, number];

  const scoreGradientStops: { stop: number; color: RGB }[] = [
    { stop: 0, color: [192, 57, 43] },
    { stop: 40, color: [226, 167, 29] },
    { stop: 60, color: [180, 176, 72] },
    { stop: 100, color: [37, 115, 113] },
  ];

  function toHex(value: number): string {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  let i = 0;
  while (
    i < scoreGradientStops.length - 1 &&
    clamped > scoreGradientStops[i + 1].stop
  ) {
    i++;
  }

  const { stop: stop1, color: color1 } = scoreGradientStops[i];
  const { stop: stop2, color: color2 } = scoreGradientStops[i + 1];

  const t = (clamped - stop1) / (stop2 - stop1);

  const interpolated = color1.map((c1, idx) =>
    Math.round(c1 + (color2[idx] - c1) * t),
  ) as RGB;

  return `#${interpolated.map(toHex).join("")}`;
}
