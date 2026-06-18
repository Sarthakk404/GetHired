from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router
from app.database import engine
import app.models as models

app = FastAPI(
    title="Job Application Tracker API",
    version="1.0.0"
)

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React
        "http://localhost:5173",  # Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router.router, prefix="/JOBS")


@app.get("/")
async def root():
    return {"message": "Job Application Tracker API is running!"}