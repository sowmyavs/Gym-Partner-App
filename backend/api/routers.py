# Fast API imports
from fastapi import APIRouter, Body, Request, status, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from io import BytesIO
# Models import
from api.models import UserModel, UserUpdateModel
from api.image_storage import store_image_gcp
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
        for doc in await request.app.mongodb["users"].find().to_list(length=100):
            users.append(doc)
        return JSONResponse(status_code=status.HTTP_200_OK, content=users)
    

    # This path allows to create a new task
    @router.post("/user", response_description="Add User")
    async def add_user(request: Request, user: UserModel = Body(...)):
        user = jsonable_encoder(user)
        new_user = await request.app.mongodb["users"].insert_one(user)
        created_user = await request.app.mongodb["users"].find_one(
            {"_id": new_user.inserted_id}
        )
        # Return a success created response
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

    # This path allows to get a task
    @router.get("/user/{id}", response_description="Get User")
    async def get_user(id: str, request: Request):
        if (user := await request.app.mongodb["users"].find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED, content=user)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to update a task
    @router.put("/user/{id}", response_description="Update User")
    async def update_user(id: str, request: Request, user: UserUpdateModel = Body(...)):
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = await request.app.mongodb["users"].update_one(
                {"_id": id}, {"$set": user}
            )

            if update_result.modified_count == 1:
                if (
                        updated_user := await request.app.mongodb["users"].find_one({"_id": id})
                ) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED, content=updated_user)

        if (
                existing_user := await request.app.mongodb["users"].find_one({"_id": id})
        ) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED, content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to delete a task
    @router.delete("/user/{id}", response_description="Delete User")
    async def delete_user(id: str, request: Request):
        delete_result = await request.app.mongodb["users"].delete_one({"_id": id})
        
        if delete_result.deleted_count == 1:
            return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")
    
    # GCP image 
    @router.post("/upload", response_description="upload image to gcp")
    async def upload_image(request: Request, image_input= Body(...)):
        print("request",type(image_input))
        with open('profile_image.jpg','wb') as image:
            image.write(image_input)
            image.close()
        
        store_image_gcp('profile1')
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=[])

    # We return our router
    return router