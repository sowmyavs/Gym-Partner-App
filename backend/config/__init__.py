# Import BaseSettings from pydantic
from pydantic import BaseSettings


# Define the CommonSettings class (inherits from BaseSettings)
class CommonSettings(BaseSettings):
    APP_NAME: str = "API"
    DEBUG_MODE: bool = True


# Define the ServerSettings class (inherits from BaseSettings)
class ServerSettings(BaseSettings):
    HOST: str = "localhost"
    PORT: int = 8000


# Main Settings class that includes all the settings classes
class Settings(CommonSettings, ServerSettings):
    pass


# We create a settings variable that will be used in the other files
settings = Settings()