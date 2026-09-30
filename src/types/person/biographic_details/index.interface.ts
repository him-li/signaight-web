import type { CommonFields } from "@/types/base.interface";
import type { DescriptionBioIntro } from "@/types/person/biographic_details/description_bio_intro.interface";
import type { VolunteerExperience } from "@/types/person/biographic_details/volunteer_experience.interface";
import type { MaritalStatusRelatives } from "@/types/person/biographic_details/marital_status_relatives.interface";
import type { Education } from "@/types/person/biographic_details/education.interface";
import type { Work } from "@/types/person/biographic_details/work/index.interface";

export interface BiographicDetails extends CommonFields {
  description_bio_intro?: DescriptionBioIntro;
  volunteer_experience?: VolunteerExperience;
  marital_status_relatives?: MaritalStatusRelatives;
  education?: Education;
  work?: Work;
}
