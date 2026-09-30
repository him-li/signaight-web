import type { CommonFields } from "@/types/base.interface";

interface SourcePost extends CommonFields {
  eb_post_url?: string;
  eb_post_photo?: string;
  eb_post_text?: string;
  eb_post_date?: string;
}

interface SourcePage extends CommonFields {
  eb_fb_page_url?: string;
  eb_fb_page_profile_photo?: string;
}

interface SourceConnection extends CommonFields {
  eb_fb_profile_url?: string;
  eb_profile_picture?: string;
}

interface FactorSource extends SourcePost, SourcePage, SourceConnection {
  eb_auto_insight?: string;
}

interface Factor extends CommonFields {
  field?: string;
  source?: FactorSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  check?: any;
  success?: boolean;
  ratio?: number;
}

export interface Flag extends CommonFields {
  category: string;
  sub_category?: string;
  description?: string;
  severity: number;
  factors?: Factor[];
  created_at: Date;
  updated_at?: Date;
}
