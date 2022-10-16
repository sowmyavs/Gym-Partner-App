# Fast API imports
from fastapi import APIRouter, Body, Request, status, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# Models import
from api.models import TaskModel, TaskUpdateModel

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
    @router.get("/tasks", response_description="List Tasks")
    async def list_tasks(request: Request):
        tasks = []
        for doc in await request.app.mongodb["tasks"].find().to_list(length=100):
            tasks.append(doc)
        return JSONResponse(status_code=status.HTTP_200_OK, content=tasks)

    # This path allows to create a new task
    @router.post("/task", response_description="Add Task")
    async def add_task(request: Request, task: TaskModel = Body(...)):
        task = jsonable_encoder(task)
        new_task = await request.app.mongodb["tasks"].insert_one(task)
        created_task = await request.app.mongodb["tasks"].find_one(
            {"_id": new_task.inserted_id}
        )
        # Return a success created response
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)

    # This path allows to get a task
    @router.get("/task/{id}", response_description="Get Task")
    async def get_task(id: str, request: Request):
        if (task := await request.app.mongodb["tasks"].find_one({"_id": id})) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED, content=task)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # This path allows to update a task
    @router.put("/task/{id}", response_description="Update Task")
    async def update_task(id: str, request: Request, task: TaskUpdateModel = Body(...)):
        task = {k: v for k, v in task.dict().items() if v is not None}

        if len(task) >= 1:
            update_result = await request.app.mongodb["tasks"].update_one(
                {"_id": id}, {"$set": task}
            )

            if update_result.modified_count == 1:
                if (
                        updated_task := await request.app.mongodb["tasks"].find_one({"_id": id})
                ) is not None:
                    return JSONResponse(status_code=status.HTTP_201_CREATED, content=updated_task)

        if (
                existing_task := await request.app.mongodb["tasks"].find_one({"_id": id})
        ) is not None:
            return JSONResponse(status_code=status.HTTP_201_CREATED, content=existing_task)

        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # This path allows to delete a task
    @router.delete("/task/{id}", response_description="Delete Task")
    async def delete_task(id: str, request: Request):
        delete_result = await request.app.mongodb["tasks"].delete_one({"_id": id})
        
        if delete_result.deleted_count == 1:
            return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # We return our router
    return router