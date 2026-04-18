from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class PasswordForgetRequest(BaseModel):
    email: EmailStr

class PasswordResetRequest(BaseModel):
    password: str
    token: str
