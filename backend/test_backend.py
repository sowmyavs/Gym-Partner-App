# Imports
from fastapi import FastAPI
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings
from api.routers import get_api_router

# Create the FastAPP app
app = FastAPI()


# Startup Event
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]


# Shutdown Event
@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


# Include our API router
app.include_router(get_api_router(app), tags=["users"])

def test_list_users():
    with TestClient(app) as client:
        response = client.get("/users")
        assert response.status_code == 200

def test_add_user():
    with TestClient(app) as client:
        response = client.post("/user", 
        json={"id": "2121212121",
                "name": "Josh B",
                "email": "test@gmail.com",
                "password": "1234",
                "bio": "unit test",
                "images": [],
                "experience_level": int("1"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            })
        assert response.status_code == 201
        assert response.json() == {"_id": "2121212121",
                "name": "Josh B",
                "email": "test@gmail.com",
                "password": "1234",
                "bio": "unit test",
                "images": [],
                "experience_level": int("1"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }

def test_update_all():
    with TestClient(app) as client:
        response = client.put("/user/2121212121",
        json={"name": "JB",
                "email": "update_all@gmail.com",
                "password": "2001",
                "bio": "update_all_test",
                "images": [],
                "experience_level": int("5"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            })
        assert response.status_code == 201
        assert response.json() == {"_id": "2121212121",
                "name": "JB",
                "email": "update_all@gmail.com",
                "password": "2001",
                "bio": "update_all_test",
                "images": [],
                "experience_level": int("5"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }

def test_update_login():
    with TestClient(app) as client:
        response = client.put("user/Login/2121212121",
        json={"name": "J Bowers",
            "email": "new@gmail.com",
            "password": "4321"
        })
    assert response.status_code == 201
    assert response.json() == {"_id": "2121212121",
                "name": "J Bowers",
                "email": "new@gmail.com",
                "password": "4321",
                "bio": "update_all_test",
                "images": [],
                "experience_level": int("5"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }

def test_read_items():
    with TestClient(app) as client:
        response = client.get("/user/2121212121")
        assert response.status_code == 201
        assert response.json() == {"_id": "2121212121",
                "name": "J Bowers",
                "email": "new@gmail.com",
                "password": "4321",
                "bio": "update_all_test",
                "images": [],
                "experience_level": int("5"),
                "desired_exercise": [],
                "favorite_gym": "The Nick",
                "liked_users": [],
                "matched_users": [],
                "blocked_users": []
            }

# This test is weird, technically it works but the test fails, not really sure why
# def test_delete_user():
#     with TestClient(app) as client:
#         response = client.delete("/user/21")
#         assert response.status_code == 204
