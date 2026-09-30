import type { CommonFields } from "@/types/base.interface";
import type { Username } from "@/types/person/network_signature/username.interface";
import type { Url } from "@/types/person/network_signature/url.interface";
import type { MatchedProfiles } from "@/types/person/network_signature/matched_profiles.interface";
import type { UserId } from "@/types/person/network_signature/user_id.interface";
import type { OnlineSignature } from "@/types/person/network_signature/online_signature.interface";
import type { NetworkMisc } from "@/types/person/network_signature/misc.interface";
import type { Passwords } from "@/types/person/network_signature/passwords.interface";

export interface NetworkSignature extends CommonFields {
  username?: Username;
  url?: Url;
  matched_profiles?: MatchedProfiles;
  user_id?: UserId;
  online_signature?: OnlineSignature;
  misc?: NetworkMisc;
  passwords?: Passwords;
}
