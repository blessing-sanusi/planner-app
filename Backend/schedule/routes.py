from fastapi import APIRouter, HTTPException
from db import db
from .models import ScheduleEvent
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ScheduleEvent])
def get_all_events():
    try:
        events = db.collection("schedule").stream()
        return [ScheduleEvent(id=doc.id, **doc.to_dict()) for doc in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=ScheduleEvent)
def create_event(event: ScheduleEvent):
    try:
        data = event.dict(exclude={"id"})
        doc_ref = db.collection("schedule").add(data)
        event.id = doc_ref[1].id
        return event
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
