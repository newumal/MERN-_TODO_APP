import { Express, Request, Response  } from "express";
import TaskController from "./controller/taskController";

const routes = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        res.sendStatus(200)
    });

    app.post('/api/tasks', async (req: Request, res: Response) => {
        await new TaskController().createTaskHandler(req, res)
    });

    app.get('/api/tasks', async (req: Request, res: Response) => {
      await new TaskController().getTasksHandler(req, res)
    });

    app.get('/api/tasks/:id', async (req: Request, res: Response) => {
        await new TaskController().getTaskHandler(req, res)
    })

    app.put('/api/tasks/:id', async (req: Request, res: Response) => {
        await new TaskController().updateTaskHandler(req, res)
    })

    app.delete('/api/tasks/:id', async (req: Request, res: Response) => {
        await new TaskController().deleteTaskHandler(req, res)
    })
}

export default routes