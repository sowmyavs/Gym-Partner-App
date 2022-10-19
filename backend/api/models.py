# Perform imports
import uuid
from pydantic import BaseModel, Field


# Define Task Model
class TaskModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    bio: str = Field(...)
    images: list = Field(...) # ****THIS WILL HAVE TO BE CHANGED ****
    preset_attributes: str = Field(...)
    favorite_gym: list = Field(...)
    liked_users: list = Field(...)
    matched_users: list = Field(...)
    blocked_users: list = Field(...)

    # The config class allows to document our model's schema
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name": "John Doe",
                "email": "email@gmail.com",
                "password": "password",
                "bio": "140 char max",
                "images": [],
                "preset_attributes": "ex: Types of exercise, experience level, etc",
                "favorite_gym": ["gym_name", "gym_address"],
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }
        }


# Define Task Update Model
class TaskUpdateModel(BaseModel):
    name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    bio: str = Field(...)
    images: list = Field(...) # ****THIS WILL HAVE TO BE CHANGED ****
    preset_attributes: str = Field(...)
    favorite_gym: list = Field(...)
    liked_users: list = Field(...)
    matched_users: list = Field(...)
    blocked_users: list = Field(...)

    # The config class allows to document our model's schema
    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "email@gmail.com",
                "password": "password",
                "bio": "140 char max",
                "images": [],
                "preset_attributes": "ex: Types of exercise, experience level, etc",
                "favorite_gym": ["gym_name", "gym_address"],
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }
        }