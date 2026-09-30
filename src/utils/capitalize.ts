import deburr from "lodash/deburr";
import lowerCase from "lodash/lowerCase";
import startCase from "lodash/startCase";
import upperCase from "lodash/upperCase";

export default function Capitalize(str: string) {
  const exceptions = ["USA"];
  if (exceptions.includes(str) === true) {
    return upperCase(str);
  } else {
    return startCase(lowerCase(deburr(str)));
  }
}
