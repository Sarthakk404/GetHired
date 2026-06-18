from pydantic import BaseModel
from typing import Optional
from enum import Enum

class Status(str,Enum):
    Applied = "Applied"
    Online_Assessment = "Online Assessment"
    Interview_Scheduled = "Interview Scheduled"
    Interviewing = "Interviewing"
    Rejected = "Rejected"
    Accepted = "Accepted"

class Job_Type(str,Enum):
    Full_Time = "Full Time"
    Part_Time = "Part Time"
    Internship = "Internship"
    Contract = "Contract"

class Work_Mode(str,Enum):
    Remote = "Remote"
    On_Site = "On-site"
    Hybrid = "Hybrid"

class JobCreate(BaseModel):
    Company: str
    Position: str
    Company_Location: str
    Application_Date: str
    Status: Status
    Job_Type: Job_Type
    Work_Mode: Work_Mode
    Job_URL: str
    Notes: Optional[str] = None