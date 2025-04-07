from pydantic import BaseModel

class DoctorBase(BaseModel):
    name: str
    specialty: str
    location: str

class DoctorCreate(DoctorBase):
    pass

class DoctorOut(DoctorBase):
    id: int

    class Config:
        orm_mode = True
