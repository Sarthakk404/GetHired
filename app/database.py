from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base

Base = declarative_base()

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL not found")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()