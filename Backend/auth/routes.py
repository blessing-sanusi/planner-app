from fastapi import APIRouter, Depends, HTTPException
from .models import UserRegister, UserLogin
from .service import create_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register(data: UserRegister):
    user = await create_user(data)
    return user

@router.post("/login")
async def login(data: UserLogin):
    token = await authenticate_user(data.email, data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}
