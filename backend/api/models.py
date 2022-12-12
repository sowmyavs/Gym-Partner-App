# Perform imports
import uuid
from pydantic import BaseModel, Field


# Define User Model
class UserModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    bio: str = Field(...)
    images: list = Field(...) 
    experience_level: int = Field(...)
    desired_exercise: list = Field(...)
    favorite_gym: str = Field(...)
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
                "experience_level": int("0"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }
        }


# Define User Update Model
class UserUpdateModel(BaseModel):
    name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    bio: str = Field(...)
    images: list = Field(...) 
    experience_level: int = Field(...)
    desired_exercise: list = Field(...)
    favorite_gym: str = Field(...)
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
                "experience_level": int("0"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }
        }

class PreferencesUpdateModel(BaseModel):
    bio: str = Field(...)
    experience_level: int = Field(...)
    desired_exercise: list = Field(...)
    favorite_gym: str = Field()

    class Config:
        schema_extra = {
            "example": {
                "bio": " ",
                "experience_level": int("0"),
                "desired_exercise": [],
                "favorite_gym": "The Nick"
            }
        }

class LoginUpdateModel(BaseModel):
    name: str = Field(...)
    email: str = Field(...)
    password: str = Field(...)
    
    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "email@gmail.com",
                "password": "password"
            }
        }

class PasswordUpdateModel(BaseModel):
    password: str = Field(...)
    
    class Config:
        schema_extra = {
            "example": {
                "password": "password"
            }
        }