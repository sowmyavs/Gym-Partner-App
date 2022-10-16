# Imports
from fastapi import FastAPI
import uvicorn
from config import settings
from api.routers import get_api_router

# Create the FastAPP app
app = FastAPI()

# Include our API router
app.include_router(get_api_router(app), tags=["tasks"])

# Define our main function so we can easily run the server
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )