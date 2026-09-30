export const modal = {
  base: "bg-default/50 backdrop-blur-xl box-border backdrop-saturate-500 inset-shadow-sm transition-discrete duration-300 ease-in-out-cubic",
};

export const button = {
  ghost_accent:
    "rounded-full border-accent border-2 text-accent hover:text-foreground hover:bg-accent hover:text-background-tertiary",
  ghost_danger:
    "rounded-full border-danger border-2 text-danger hover:text-foreground hover:bg-danger",
};

export const table = {
  table: "bg-default-100 rounded-2xl shadow-md overflow-hidden",
  tr: "rounded-2xl ease-in-out hover:bg-default-50 duration-300",
};

export const card = {
  base: "relative min-w-52 w-fit max-w-56 p-0 max-h-100 bg-default hover:bg-default-hover ease-in-out duration-300",
  header: "relative h-52 gap-5",
  content: "text-sm font-normal w-full overflow-x-hidden px-4 z-10",
  footer:
    "px-4 bg-default/50 hover:bg-default-hover/50 ease-in-out duration-300",
};

export const mapDataLayer: any = {
  id: "data",
  type: "line",
  paint: {
    "line-color": "#707F80",
    "line-width": 0.3,
  },
};
