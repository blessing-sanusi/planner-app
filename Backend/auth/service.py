# auth/service.py
from firebase_admin import auth as firebase_auth
from fastapi import HTTPException
from .utils import create_jwt_token

async def create_user(email: str, password: str, full_name: str):
    try:
        user_record = firebase_auth.create_user(
            email=email,
            password=password,
            display_name=full_name,
        )
        return {
            "uid": user_record.uid,
            "email": user_record.email,
            "full_name": user_record.display_name,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

async def authenticate_user(email: str, password: str):
    # Firebase Auth does not provide password verification server-side
    # So usually, you verify on client, or use custom token creation here
    # For demo, let's pretend we verify by fetching user by email

    try:
        user_record = firebase_auth.get_user_by_email(email)
        # You can't verify password here via Firebase Admin SDK
        # So you must authenticate via client SDK or custom token flow

        # Let's just return a custom JWT token for now
        token = create_jwt_token(user_record.uid)
        return token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid email or password")

async def get_user(uid: str):
    try:
        user_record = firebase_auth.get_user(uid)
        return {
            "uid": user_record.uid,
            "email": user_record.email,
            "full_name": user_record.display_name,
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail="User not found")
