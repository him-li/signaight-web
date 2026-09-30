export const setMaxStringLength = (string: string, maxEditlength: number) =>
  string?.length > maxEditlength
    ? string?.substring(0, maxEditlength - 3) + "..."
    : string;
