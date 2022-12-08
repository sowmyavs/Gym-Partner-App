# Fast API imports
from fastapi import APIRouter, Body, Request, status, HTTPException, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# Models import
from api.models import UserModel, UserUpdateModel, PreferencesUpdateModel, LoginUpdateModel, PasswordUpdateModel

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
        db = request.app.mongodb["users"]
        for doc in await db.find().to_list(length=100):
            users.append(doc)
        return JSONResponse(status_code=status.HTTP_200_OK, content=users)

    # This path allows to create a new user
    @router.post("/user", response_description="Add User")
    async def add_user(request: Request, user: UserModel = Body(...)):
        db = request.app.mongodb["users"]
        user = jsonable_encoder(user)
        new_user = await db.insert_one(user)
        created_user = await db.find_one({"_id": new_user.inserted_id})
        # Return a success created response
        return JSONResponse(status_code=status.HTTP_201_CREATED,
                            content=created_user)

    # This path allows to get a user
    @router.get("/user/{id}", response_description="Get User")
    async def get_user(id: str, request: Request):
        db = request.app.mongodb["users"]
        if (user := await db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=user)
        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to update a user
    @router.put("/user/{id}", response_description="Update User")
    async def update_user(id: str, request: Request, user: UserUpdateModel = Body(...)):
        db = request.app.mongodb["users"]
    
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = await db.update_one({"_id": id}, {"$set": user})

            if update_result.modified_count == 1:
                if (updated_user := await db.find_one({"_id": id})) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED,
                                        content=updated_user)

        if (existing_user := await db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # update user preferences
    @router.put("/user/preferences/{id}", response_description="Update User")
    async def update_preferences(id: str, request: Request, user: PreferencesUpdateModel = Body(...)):
        db = request.app.mongodb["users"]
    
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = await db.update_one({"_id": id}, {"$set": user})

            if update_result.modified_count == 1:
                if (updated_user := await db.find_one({"_id": id})) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED,
                                        content=updated_user)

        if (existing_user := await db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # update user preferences
    @router.put("/user/Login/{id}", response_description="Update User")
    async def update_preferences(id: str, request: Request, user: LoginUpdateModel = Body(...)):
        db = request.app.mongodb["users"]
    
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = await db.update_one({"_id": id}, {"$set": user})

            if update_result.modified_count == 1:
                if (updated_user := await db.find_one({"_id": id})) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED,
                                        content=updated_user)

        if (existing_user := await db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # update user preferences
    @router.put("/user/Password/{id}", response_description="Update User")
    async def update_preferences(id: str, request: Request, user: PasswordUpdateModel = Body(...)):
        db = request.app.mongodb["users"]
    
        user = {k: v for k, v in user.dict().items() if v is not None}

        if len(user) >= 1:
            update_result = await db.update_one({"_id": id}, {"$set": user})

            if update_result.modified_count == 1:
                if (updated_user := await db.find_one({"_id": id})) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED,
                                        content=updated_user)

        if (existing_user := await db.find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED,
                                content=existing_user)

        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

    # This path allows to delete a user
    @router.delete("/user/{id}", response_description="Delete User")
    async def delete_user(id: str, request: Request):
        db = request.app.mongodb["users"]

        delete_result = await db.delete_one({"_id": id})

        if delete_result.deleted_count == 1:
            return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
        # Return an error if no user if found
        raise HTTPException(status_code=404, detail=f"User {id} not found")

     # add image to profile 
    @router.post("/image/{id}", response_description="Upload image to user profile")
    async def upload_image(id: str, request: Request, image_input = Body(...)):        
        # write file to local dir
        with open('profile_image.jpg','wb') as image:
            image.write(image_input)
            image.close()
        
        # Connect to DB, make sure the user exists, raise error if not
        db = request.app.mongodb["users"]
        if (user := await db.find_one({"_id": id})) is None:
            raise HTTPException(status_code=404, detail=f"User {id} not found")
            
        # store image into GCP
        file_name = id + '-' + str(len(user['images']))
        ImageManager.store_image_gcp(file_name)
        
        # get the link of the photo in GCP
        image_url = ImageManager.get_link(file_name)

        # TODO: store image link into MongoDB (not storing correctly)
        update_result = await db.update_one({"_id": id}, {"$push": {"images": image_url}})
 
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=[])

    # delete image from profile
    @router.delete("/image/{id}/{index}", response_description="Delete image from user profile")
    async def delete_image(id: str, request, Request, index: str):
        db = request.app.mongodb["users"]
        # Find user, then the image that is to be deleted and delete it from MongoDB
        if (user := await db.find_one({"_id": id})) is None:
            raise HTTPException(status_code=404, detail=f"User {id} not found")
        
        file_name = id + '-' + index
        image_to_delete_url = ImageManager.get_link(file_name)
        delete_result = await db.update_one({"_id": id}, {"$pull": {"images": image_to_delete_url}})

        
        # Find photo in GCP, delete it

        # re-organize photos in GCP

        return " "

    # We return our router
    return router
