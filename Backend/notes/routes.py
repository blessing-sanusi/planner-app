from fastapi import APIRouter, HTTPException
from db import db
from .models import Note
from datetime import datetime
from typing import List

router = APIRouter()

@router.get("/by-client/{client_id}", response_model=List[Note])
def get_notes_by_client(client_id: str):
    try:
        query = db.collection("notes").where("clientId", "==", client_id).order_by("createdAt", direction=firestore.Query.DESCENDING)
        docs = query.stream()
        return [Note(id=doc.id, **doc.to_dict()) for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Note)
def create_note(note: Note):
    try:
        data = note.dict(exclude={"id"})
        data["createdAt"] = datetime.utcnow().isoformat()
        doc_ref = db.collection("notes").add(data)
        note.id = doc_ref[1].id
        return note
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
