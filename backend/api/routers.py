# Fast API imports
from fastapi import APIRouter, Body, Request, status, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# Models import
from api.models import TaskModel, TaskUpdateModel

# Config import
from config import settings

# For now our task list is stored in memory. Later on we will integrate with MongoDB
tasks = []


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
        return JSONResponse(status_code=status.HTTP_200_OK, content=tasks)

    # This path allows to create a new task
    @router.post("/task", response_description="Add Task")
    async def add_task(request: Request, task: TaskModel = Body(...)):
        # We encode our task with JSON
        create_task = jsonable_encoder(task)
        # We insert the new task
        tasks.append(create_task)
        # Return a success created response
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=create_task)

    # This path allows to get a task
    @router.get("/task/{id}", response_description="Get Task")
    async def get_task(id: str, request: Request):
        # We find our task and return it
        for task in tasks:
            if task['_id'] == id:
                return JSONResponse(status_code=status.HTTP_201_CREATED, content=task)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # This path allows to update a task
    @router.put("/task/{id}", response_description="Update Task")
    async def update_task(id: str, request: Request, task: TaskUpdateModel = Body(...)):
        # We encode our task with JSON
        new_task = jsonable_encoder(task)
        new_task['_id'] = id
        # We find and update the task by removing the old one and inserting the new one
        for task in tasks:
            if task['_id'] == id:
                tasks.remove(task)
                tasks.append(new_task)
                return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_task)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # This path allows to delete a task
    @router.delete("/task/{id}", response_description="Delete Task")
    async def delete_task(id: str, request: Request):
        # We find and remove the task
        for task in tasks:
            if task['_id'] == id:
                tasks.remove(task)
                return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
        # Return an error if no task if found
        raise HTTPException(status_code=404, detail=f"Task {id} not found")

    # We return our router
    return router