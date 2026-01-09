export interface UserData {
  id: number;
  name?: string;
  phone?: string;
  email?: string;
  email_is_verified?: boolean;
  createdAt: string;
  updatedAt: string;
  birthdate?: string;
  city?: string;
  education?: string;
  education_place?: string;
  gender?: string;
  annual_income?: number | null;
  employer?: string;
  income_source?: string[] | string;
  job_about?: string | null;
  profession?: string;
  about?: string | null;
  status: string;
  photos?: string[];
  // Missing fields from Prisma schema
  first_date?: string;
  day_look?: string;
  has_children?: boolean | null;
  partner_children?: string;
  wants_children?: string;
  looks_more_personality?: number | null;
  independence_partner?: number | null;
  religion_alignment?: number | null;
  interests?: string[] | string;
  fact_about_me?: string;
  skip_linkedIn?: boolean;
}
