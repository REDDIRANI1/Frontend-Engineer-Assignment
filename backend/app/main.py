from datetime import datetime, timezone
from enum import Enum
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Category(str, Enum):
    WORK = "Work"
    PERSONAL = "Personal"
    HEALTH = "Health"


class MilestoneCreate(BaseModel):
    title: str
    category: Category


class Milestone(BaseModel):
    id: int
    title: str
    category: Category
    created_at: str


app = FastAPI(title="Personal Milestone Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

milestones: List[Milestone] = []


@app.get("/milestones", response_model=List[Milestone])
def get_milestones() -> List[Milestone]:
    return milestones


@app.post("/milestones", response_model=Milestone, status_code=201)
def create_milestone(payload: MilestoneCreate) -> Milestone:
    title = payload.title.strip()

    if len(title) < 3:
        raise HTTPException(
            status_code=400, detail="Title is required and must be at least 3 characters."
        )

    milestone = Milestone(
        id=len(milestones) + 1,
        title=title,
        category=payload.category,
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    milestones.append(milestone)
    return milestone
