from sqlalchemy import Column, Integer, String, Enum
from backend.app.database.session import Base
import enum

class UserRole(str, enum.Enum):
    medico = "medico"
    paciente = "paciente"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.paciente)
