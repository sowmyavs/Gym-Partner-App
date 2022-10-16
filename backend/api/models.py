# Perform imports
import uuid
from pydantic import BaseModel, Field


# Define Task Model
class TaskModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    description: str = Field(...)
    is_finished: bool = Field(...)

    # The config class allows to document our model's schema
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name": "My task name",
                "description": "My description",
                "is_finished": False
            }
        }


# Define Task Update Model
class TaskUpdateModel(BaseModel):
    name: str = Field(...)
    description: str = Field(...)
    is_finished: bool = Field(...)

    # The config class allows to document our model's schema
    class Config:
        schema_extra = {
            "example": {
                "name": "My task name",
                "description": "My description",
                "is_finished": False
            }
        }