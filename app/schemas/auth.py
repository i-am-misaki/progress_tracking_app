from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class PasswordForgetRequest(BaseModel):
    email: EmailStr


class PasswordResetRequest(BaseModel):
    password: str
    token: str
