from typing import Union
from typing_extensions import Optional
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    email: Union[str, None] = None
    password: Union[str, None] = None

class ClientCreate(UserBase):
    name: str
    phone: str

class Client(UserBase):
    id: int
    name: str
    phone: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class File(BaseModel):
    id: int
    case_id: str
    client_id: int
    description: str
    court_station: str
    type_of_case : str

class FileCreate(BaseModel):
    case_id: str
    client_id: int
    description: str
    court_station: str
    type_of_case : str

class Attachment(BaseModel):
    id: int
    url: str
