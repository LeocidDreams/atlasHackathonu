import os
from dotenv import load_dotenv
from pathlib import Path

# Resolve .env next to this file so the script works from any working directory.
load_dotenv(Path(__file__).resolve().parent / ".env")


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing environment variable: {name} (see .env.example)")
    return value
