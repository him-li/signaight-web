import type { CommonFields } from "@/types/base.interface";

export interface Websites extends CommonFields {
  websites?: Website[];
  linkedin_websites?: string[];
}

enum WebsiteCategory {
  Personal = "Personal",
  Company = "Company",
  Blog = "Blog",
  RSS = "RSS",
  Portfolio = "Portfolio",
  Other = "Other",
}

export interface Website extends CommonFields {
  category?: WebsiteCategory;
  label?: string;
  url: string;
}
