import { DocumentDefinition } from 'mongoose';
import TaskModel, { TaskDocument } from "../models/taskModel";


export class TaskService {
    public async createTask(input: DocumentDefinition<Omit<TaskDocument, "createdAt" | "updatedAt">>)   {
        try {
            const newTask = new TaskModel(input);
            return await newTask.save();
        }catch (e: any) {
            throw new Error(e)
        }
    }

    public async getTasks(){
        try {
            return await TaskModel.find()
        }catch (e: any) {
            throw new Error(e)
        }
    }

    public async getTask(taskId: string){
        try {
            return await TaskModel.findById(taskId)
        }catch (e: any) {
            throw new Error(e)
        }
    }

    public async updateTask(taskId: string, input: DocumentDefinition<TaskDocument>){
        try{
            const currentTask = await TaskModel.findById(taskId)
            if(!currentTask){
                throw new Error('Task not found')
            }
            return await TaskModel.findByIdAndUpdate(taskId, input, { new: true})
        }catch (e: any) {
            throw new Error(e)
        }
    }

    public async deleteTask(taskId: string){
        try{
            const currentTask = await TaskModel.findById(taskId)
            if(!currentTask){
                throw new Error('Task not found')
            }
            return await TaskModel.findByIdAndDelete(taskId)
        }catch (e: any) {
            throw new Error(e)
        }
    }
}

export default TaskService