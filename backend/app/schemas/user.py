from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRole(str, Enum):
    medico = "medico"
    paciente = "paciente"

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str
    role: UserRole

class UserOut(UserBase):
    id: int
    role: UserRole

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str