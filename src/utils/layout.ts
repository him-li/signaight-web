const LAYOUT_KEY_NAME = "layout";

export const getLayoutName = () => localStorage.getItem(LAYOUT_KEY_NAME);

export const setLayoutName = (value: string) => {
  localStorage.setItem(LAYOUT_KEY_NAME, value);
};
