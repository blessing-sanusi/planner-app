# routes.py
from fastapi import APIRouter, HTTPException
from firebase_init import db
from models import SupervisionSession, SupervisionSessionResponse
from typing import List
from datetime import datetime

router = APIRouter()

@router.post("/supervision_sessions", response_model=dict)
async def add_supervision_session(session: SupervisionSession):
    doc_ref = db.collection("supervision_sessions").document()
    doc_ref.set(session.dict())
    return {"id": doc_ref.id}

@router.get("/supervision_sessions/{user_id}", response_model=List[SupervisionSessionResponse])
async def get_sessions(user_id: str):
    sessions_ref = db.collection("supervision_sessions").where("userId", "==", user_id)
    docs = sessions_ref.stream()

    sessions = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        sessions.append(SupervisionSessionResponse(**data))

    return sessions

@router.get("/supervision_sessions/{user_id}/month/{month}", response_model=List[SupervisionSessionResponse])
async def get_sessions_by_month(user_id: str, month: str):
    try:
        start = datetime.strptime(month + "-01", "%Y-%m-%d")
        end = datetime.strptime(month + "-31", "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Month format must be YYYY-MM")

    sessions_ref = (
        db.collection("supervision_sessions")
        .where("userId", "==", user_id)
        .where("date", ">=", start)
        .where("date", "<=", end)
    )
    docs = sessions_ref.stream()

    sessions = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        sessions.append(SupervisionSessionResponse(**data))

    return sessions
