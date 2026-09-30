import type { CommonFields } from "@/types/base.interface";
import type { Period } from "@/types/person/biographic_details/period.interface";
import type { Position } from "@/types/person/biographic_details/work/position.interface";
import type { Honor } from "@/types/person/biographic_details/work/honors.interface";
import type { ProjectPartOf } from "@/types/person/biographic_details/work/projects.interface";
import type { Publication } from "@/types/person/biographic_details/work/publication.interface";
import type { Organization } from "@/types/person/biographic_details/work/organization.interface";
import type { Course } from "@/types/person/biographic_details/work/course.interface";
import type { Skill } from "@/types/person/biographic_details/work/skill.interface";
import type { Recommendation } from "@/types/person/biographic_details/work/recommendation.interface";
import type { LicencesCertification } from "@/types/person/biographic_details/work/licence_certification.interface";
import type { VolunteeringExperience } from "@/types/person/biographic_details/volunteer_experience.interface";

export type Work = CommonFields &
  Partial<{
    linkedin_work: LinkedinWork;
    facebook_work: FacebookWork[];
    xing_work: XingWork;
  }>;
type LinkedinWork = CommonFields &
  Partial<{
    positions: Position[];
    linkedin_endorsement?: string[];
    projects: ProjectPartOf[];
    honors: Honor[];
    publications: Publication[];
    organizations?: Organization[];
    courses: Course[];
    skills?: Skill[];
    recommendations?: Recommendation[];
    licences_certifications?: LicencesCertification[];
    volunteering_experiences?: VolunteeringExperience[];
  }>;

type XingSkills = {
  top_skills?: Skill[];
  hard_skills?: Skill[];
  soft_skills?: Skill[];
};

interface XingWork extends CommonFields {
  positions?: Position[];
  skills?: XingSkills;
}
interface FacebookWork extends CommonFields {
  fb_workplace_name: string;
  fb_workplace_url?: string;
  fb_work_title?: string;
  fb_work_description?: string;
  fb_workplace_photo_url?: string;
  fb_work_period?: Period;
  fb_field?: string;
  fb_workplace_location?: string;
}
