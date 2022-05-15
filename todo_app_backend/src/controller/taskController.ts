import { Request, Response} from "express";
import TaskService from "../service/taskService";


export class TaskController {
    public async createTaskHandler(req: Request, res: Response) {
        try{
            console.log('call create task service');
            // call create task service
            const task = await new TaskService().createTask(req.body);
            return res.status(200).json(task);
        }catch (e: any) {
            console.log(e);
            return res.status(409).send(e.message);
        }
    }

    public async getTasksHandler(req: Request, res: Response) {
        try {
            console.log('call get tasks service');
            // call task service to get all tasks
            const tasks = await new TaskService().getTasks();
            return res.status(200).json(tasks);
        }catch (e: any) {
            console.log(e);
            return res.status(409).send(e.message);
        }
    }

    public async getTaskHandler(req: Request, res: Response) {
        const taskId: string = req.params.id;
        try {
            // call task service to get task by id
            const task = await new TaskService().getTask(taskId);
            res.status(200).json(task)
        }catch (e: any) {
            return res.status(409).send(e.message);
        }
    }

    public async updateTaskHandler(req: Request, res: Response) {
        const taskId: string = req.params.id;
        try {
            const updatedTask = await new TaskService().updateTask(taskId, req.body);
            res.status(200).json(updatedTask);
        }
        catch (e: any) {
            return res.status(409).send(e.message);
        }
    }

    public async deleteTaskHandler(req: Request, res: Response) {
        const taskId: string = req.params.id;
        try {
            const deletedTask = await new TaskService().deleteTask(taskId);
            res.status(200).json(deletedTask);
        }
        catch (e: any) {
            return res.status(409).send(e.message);
        }
    }
}

export default TaskController