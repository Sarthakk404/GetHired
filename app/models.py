from app.database import Base
from sqlalchemy import Column, Integer, String, Date

class Jobs(Base):
    __tablename__ = 'jobs'

    Id = Column(Integer, primary_key=True)
    Company = Column(String(100))
    Position = Column(String(100))
    Company_Location = Column(String(100))
    Application_Date = Column(Date)
    Status = Column(String(100))
    Job_Type = Column(String(100))  
    Work_Mode = Column(String(100)) 
    Job_URL = Column(String(200), nullable=True)
    Notes = Column(String(500), nullable=True)

