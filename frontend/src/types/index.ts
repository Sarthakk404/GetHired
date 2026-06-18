export type Status =
  | "Applied"
  | "Online Assessment"
  | "Interview Scheduled"
  | "Interviewing"
  | "Rejected"
  | "Accepted";

export type JobType = "Full Time" | "Part Time" | "Internship" | "Contract";

export type WorkMode = "Remote" | "On-site" | "Hybrid";

export interface Job {
  Id: number;
  Company: string;
  Position: string;
  Company_Location: string;
  Application_Date: string;
  Status: Status;
  Job_Type: JobType;
  Work_Mode: WorkMode;
  Job_URL: string;
  Notes?: string;
}

export interface JobCreate {
  Company: string;
  Position: string;
  Company_Location: string;
  Application_Date: string;
  Status: Status;
  Job_Type: JobType;
  Work_Mode: WorkMode;
  Job_URL: string;
  Notes?: string;
}

export interface Analytics {
  Total_Jobs: number;
  Offers: number;
  Interviews: number;
  Offer_Rate: number;
  Interview_Rate: number;
}

export const STATUS_OPTIONS: Status[] = [
  "Applied",
  "Online Assessment",
  "Interview Scheduled",
  "Interviewing",
  "Rejected",
  "Accepted",
];

export const JOB_TYPE_OPTIONS: JobType[] = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
];

export const WORK_MODE_OPTIONS: WorkMode[] = ["Remote", "On-site", "Hybrid"];

export const STATUS_COLORS: Record<Status, string> = {
  Applied: "#F59E0B",
  "Online Assessment": "#06B6D4",
  "Interview Scheduled": "#2563EB",
  Interviewing: "#7C3AED",
  Rejected: "#EF4444",
  Accepted: "#22C55E",
};
