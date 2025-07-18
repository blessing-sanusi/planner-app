from fastapi import APIRouter, HTTPException
from .models import Client
from db import db
from typing import List

router = APIRouter(prefix="/clients", tags=["clients"])

@router.get("/", response_model=List[Client])
def get_clients():
    try:
        docs = db.collection("clients").stream()
        return [Client(id=doc.id, **doc.to_dict()) for doc in docs]
    except Exception as e:
        raise HTTPException(500, str(e))

@router.post("/", response_model=Client)
def add_client(client: Client):
    try:
        data = client.dict(exclude={"id"})
        _, ref = db.collection("clients").add(data)
        client.id = ref.id
        return client
    except Exception as e:
        raise HTTPException(500, str(e))

@router.put("/{client_id}", response_model=Client)
def update_client(client_id: str, client: Client):
    try:
        data = client.dict(exclude={"id"})
        db.collection("clients").document(client_id).update(data)
        return client
    except Exception as e:
        raise HTTPException(500, str(e))
