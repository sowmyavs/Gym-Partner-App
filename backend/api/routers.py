# Fast API imports
from fastapi import APIRouter, Body, Request, status, HTTPException, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# Models import
from api.models import UserModel, UserUpdateModel

# GCP Manager import
from api.image_storage import ImageManager

# Config import
from config import settings


# Defining our API router
def get_api_router(app):
    # Create a FastAPI router
    router = APIRouter()

    # We define a root path for our API with metadata
    @router.get("/", response_description="API MetaData")
    async def api_metadata(request: Request):
        result = {
            "api": "API",
            "author": "Nuno Bispo",
            "website": "https://developer-service.io",
            "email": "developer@developer-service.io",
            "version": "1.0"
        }
        return JSONResponse(status_code=status.HTTP_200_OK, content=result)

    # This path will return a list of tasks
    @router.get("/users", response_description="List Users")
    async def list_users(request: Request):
        users = []
        db = await request.app.mongodb["users"]
        for doc in db.find().to_list(length=100):
            users.append(doc)
        return JSONResponse(status_code=status.HTTP_200_OK, content=users)

    # This path allows to create a new user
    @router.post("/user", response_description="Add User")
    async def add_user(request: Request, user: UserModel = Body(...)):
        db = await request.app.mongodb["users"]
        user = jsonable_encoder(user)
        new_user = db.insert_one(user)
        created_user = db.find_one({"_id": new_user.inserted_id})
        # Return a success created response
        return JSONResponse(status_code=status.HTTP_201_CREATED,
                            content=created_user)

    # This path allows to get a user
    @router.get("/user/{id}", response_description="Get User")
    async def get_user(id: str, request: Request):
        db = await request.app.mongodb["users"]
        if (user := db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=user)
        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to update a user
    @router.put("/user/{id}", response_description="Update User")
    async def update_user(id: str, request: Request, user: UserUpdateModel = Body(...)):
        db = await request.app.mongodb["users"]
    
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = db.update_one({"_id": id}, {"$set": user})

            if update_result.modified_count == 1:
                if (updated_user := db.find_one({"_id": id})) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED,
                                        content=updated_user)

        if (existing_user := db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to delete a user
    @router.delete("/user/{id}", response_description="Delete User")
    async def delete_user(id: str, request: Request):
        db = await request.app.mongodb["users"]

        delete_result = db.delete_one({"_id": id})

        if delete_result.deleted_count == 1:
            return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

     # GCP image 
    @router.post("/upload", response_description="upload image to gcp")
    async def upload_image(request: Request, image_input= Body(...)):      
        db = await request.app.mongodb["users"]
        
        # store image into GCP 
        ImageManager.store_image_gcp('profile1')

        # get image link from GCP

        # store image link in MongoDB



        return JSONResponse(status_code=status.HTTP_201_CREATED, content=[])

    # We return our router
    return router
