from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth
from app.routers import project


app = FastAPI()

origins = [
    "http://localhost:5173",  # Viteの開発サーバー
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(project.router)
