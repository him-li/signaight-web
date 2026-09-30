import * as fa6 from "react-icons/fa6";
import * as fa from "react-icons/fa";
import * as si from "react-icons/si";
import * as gi from "react-icons/gi";
import { TbWorldWww, TbDeviceGamepad2 } from "react-icons/tb";
import type { IconType } from "react-icons";
import { SocialPlatforms as icons } from "@/components/atoms/Icons";
import Capitalize from "@/utils/capitalize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const socialMediaIcon: Record<string, any> = {
  tgm: fa.FaTelegramPlane,
  leaks: icons.Leaks,
  map_box: si.SiMapbox,
  facebook: fa6.FaFacebookF,
  linkedin: fa6.FaLinkedinIn,
  twitter: fa6.FaXTwitter,
  teamtreehouse: si.SiTreehouse,
  web: TbWorldWww,
  darkweb: si.SiTorbrowser,
  deepweb: si.SiTorbrowser,
  truecaller: fa6.FaPhone,
  icq: icons.Icq,
  sporttracks: icons.Sporttracks,
  runkeeper: icons.Runkeeper,
  goodreads: icons.Goodreads,
  garminconnect: icons.Garminconnect,
  scholar: si.SiGooglescholar,
  flickr: icons.IoLogoFlickr,
  pulsstory: icons.Pulsstory,
  aboutme: si.SiAboutdotme,
  myfitnesspal: icons.MyFitnessPal,
  interpol: icons.Interpol,
  eumw: icons.Europol,
  default: fa6.FaGlobe,
  inkitt: icons.Inkitt,
  smule: icons.Smule,
  fetch: icons.Fetch,
  loseit: icons.LoseIt,
  fiton: icons.FitOn,
  hole19: icons.Hole19,
  eyecon: icons.Eyecon,
  polarsteps: icons.Polarsteps,
  mapmyrun: icons.Mapmyrun,
  touchtunes: icons.Touchtunes,
  familylocator: icons.FamilyLocator,
  zepeto: icons.Zepeto,
  costarastrology: icons.Costarastrology,
  callapp: icons.CallApp,
  anghami: icons.Anghami,
  playgames: TbDeviceGamepad2,
  adidasrunning: si.SiAdidas,
  work: gi.GiFactory,
  people: fa.FaPeopleArrows,
};

export const getSocialMediaIcon = (key: string) => {
  const capitilizedKey = Capitalize(key);
  const fa6IconKey = `Fa${capitilizedKey}` as keyof typeof fa6;
  const faIconKey = `Fa${capitilizedKey}` as keyof typeof fa;
  const siIconKey = `Si${capitilizedKey}` as keyof typeof si;
  return (socialMediaIcon[key] ||
    fa6[fa6IconKey] ||
    fa[faIconKey] ||
    si[siIconKey] ||
    fa6.FaGlobe) as IconType;
};
