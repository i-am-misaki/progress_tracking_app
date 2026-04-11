from os import getenv
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = getenv("DATABASE_URL", "")
SECRET_KEY = getenv("SECRET_KEY", "")
ALGORITHM = getenv("ALGORITHM", "")
ACCESS_TOKEN_EXPIRE_MINUTES = int(getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

