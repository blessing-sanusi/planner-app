from fastapi import APIRouter, HTTPException
from firebase_admin import firestore
from db import db
from .models import Client
from typing import List
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[Client])
def get_clients():
    try:
        clients = db.collection("clients").stream()
        return [Client(id=doc.id, **doc.to_dict()) for doc in clients]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Client)
def create_client(client: Client):
    try:
        data = client.dict(exclude={"id"})
        data["createdAt"] = datetime.utcnow().isoformat()
        doc_ref = db.collection("clients").add(data)
        client.id = doc_ref[1].id
        return client
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{client_id}")
def delete_client(client_id: str):
    try:
        db.collection("clients").document(client_id).delete()
        return {"message": "Client deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
