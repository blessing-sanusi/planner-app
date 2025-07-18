from fastapi import APIRouter, HTTPException
from typing import List
from firebase_admin import firestore
from db import db
from .models import Task

router = APIRouter()

@router.get("/", response_model=List[Task])
def get_all_tasks():
    try:
        docs = db.collection("tasks").stream()
        return [Task(id=doc.id, **doc.to_dict()) for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=Task)
def create_task(task: Task):
    try:
        task_data = task.dict(exclude={"id"})
        doc_ref = db.collection("tasks").add(task_data)
        task.id = doc_ref[1].id
        return task
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{task_id}")
def delete_task(task_id: str):
    try:
        db.collection("tasks").document(task_id).delete()
        return {"message": "Task deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/by-client/{client_id}", response_model=List[Task])
def get_tasks_by_client(client_id: str):
    try:
        query = db.collection("tasks").where("clientId", "==", client_id)
        docs = query.stream()
        return [Task(id=doc.id, **doc.to_dict()) for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
