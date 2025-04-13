### backend/app/api/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.schemas.user import UserCreate, UserOut, UserLogin
from backend.app.models.user import User, UserRole
from backend.app.services.user_service import register_user, authenticate_user, create_access_token
from backend.app.database.session import get_db
from fastapi.security import OAuth2PasswordRequestForm
from typing import List
from backend.app.core.security import get_password_hash
from backend.app.core.security import verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if user.role != UserRole.paciente:
        raise HTTPException(status_code=400, detail="Solo se permiten pacientes en este endpoint.")
    return register_user(user, db)


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}


@router.put("/users/{user_id}", response_model=UserOut)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    # Buscar al usuario en la base de datos
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Actualizar los campos del usuario
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db_user.role = user.role

    if user.password:
        db_user.hashed_password = get_password_hash(user.password)

    # Nuevos campos (solo para paciente)
    if user.role == UserRole.paciente:
        db_user.date_of_birth = user.date_of_birth
        db_user.city = user.city
        db_user.country = user.country
        db_user.sexual_gender = user.sexual_gender
        db_user.insurance = user.insurance
        db_user.address = user.address
    # Commit de los cambios en la base de datos
    db.commit()
    db.refresh(db_user)

    return db_user

@router.post("/verify-password")
def verify_user_password(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")
    return {"message": "Contraseña válida", "user_id": user.id}
