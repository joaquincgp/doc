from sqlalchemy import Column, Integer, String
from backend.app.database.session import Base

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialty = Column(String, nullable=False)
    location = Column(String, nullable=False)
