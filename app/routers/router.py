from fastapi import APIRouter,HTTPException
from app.models import Jobs, Base
from app.database import get_db
from fastapi import Depends
from app.schemas import JobCreate
from sqlalchemy import func

router = APIRouter()

@router.post("/Create_Job")
async def create_job( job: JobCreate, db = Depends(get_db)):
    jobs_obj = Jobs(
        Company=job.Company,
        Position=job.Position,
        Company_Location=job.Company_Location,
        Application_Date=job.Application_Date,
        Status=job.Status,
        Job_Type=job.Job_Type,
        Work_Mode=job.Work_Mode,
        Job_URL=job.Job_URL,
        Notes=job.Notes
    )  # Create an instance of the Jobs model
    db.add(jobs_obj)
    db.commit() 
    db.refresh(jobs_obj)
    return jobs_obj
    

@router.get("/Read_Jobs")
async def read_jobs(db = Depends(get_db)):
    return db.query(Jobs).all()


@router.get("/Read_Job/{job_id}")
async def read_job(job_id: int, db = Depends(get_db)):
    job = db.query(Jobs).filter(Jobs.Id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/Update_Job/{job_id}")
async def update_job(job_id: int, job: JobCreate, db = Depends(get_db)):
    job_to_update = db.query(Jobs).filter(Jobs.Id == job_id).first()
    if job_to_update is None:
        raise HTTPException(status_code=404, detail="Job not found")

    job_to_update.Company = job.Company
    job_to_update.Position = job.Position
    job_to_update.Company_Location = job.Company_Location
    job_to_update.Application_Date = job.Application_Date
    job_to_update.Status = job.Status
    job_to_update.Job_Type = job.Job_Type
    job_to_update.Work_Mode = job.Work_Mode
    job_to_update.Job_URL = job.Job_URL
    job_to_update.Notes = job.Notes
    
    db.commit()
    db.refresh(job_to_update)
    return job_to_update

@router.delete("/Delete_Job/{job_id}")
async def delete_job(job_id: int, db = Depends(get_db)):
    job_to_delete = db.query(Jobs).filter(Jobs.Id == job_id).first()
    if job_to_delete is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job_to_delete)
    db.commit()
    return {"message": "Job deleted successfully"}

@router.get("/Analytics")
async def get_analytics(db = Depends(get_db)):
    total_jobs = db.query(Jobs).count()
    offer_counts =  db.query(Jobs).filter(Jobs.Status == "Accepted").count()
    interview_counts = db.query(Jobs).filter((Jobs.Status == "Interviewing") | (Jobs.Status == "Interview Scheduled")).count()

    return {
        "Total_Jobs": total_jobs,
        "Offers": offer_counts,
        "Interviews": interview_counts,
        "Offer_Rate": round(offer_counts / total_jobs * 100) if total_jobs > 0 else 0,
        "Interview_Rate": round(interview_counts / total_jobs * 100) if total_jobs > 0 else 0
    }